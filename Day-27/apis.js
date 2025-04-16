const baseUrl = 'https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com';

/*

   ┌──────────────────────────────┐
   │                              │
   │  ┌────────────────────────┐  │
   │  │                      ──┼──┼───► email
   │  │                        │  │
   │  └────────────────────────┘  │
   │                              │
   │  ┌────────────────────────┐  │
   │  │                      ──┼──┼───► password
   │  └────────────────────────┘  │
   │     ┌─────────────────────┐  │
   │     │                   ──┼──┼────────────► onLogin(email,password)
   │     └─────────────────────┘  │
   └──────────────────────────────┘

                     ┌──────────────────────────────────────┐
                     │                                      │
                     │   response = await fetch(API login)  │
                     │                │                     │
                     │                │                     │
                     │                ▼                     │
                     │        await response.json()         │
                     │                │                     │
                     │                │                     │
                     │                ▼                     │
                     │     {accessToken, refreshToken}      │
                     │                │                     │
                     │                │                     │
                     │                ▼                     │
                     │      save tokens to localStorage     │
                     │                │                     │
                     │                │                     │
                     │                ▼                     │
                     │      redirect to post page           │
                     │                                      │
                     └──────────────────────────────────────┘


 */
async function onSignIn(email, password) {
    const payload = {email, password};
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Sign-in failed!")
        }
        const {access, refresh} = await response.json();
        saveTokens(access, refresh);
        console.log("Sign-in successfully! Tokens have been saved!")
        // Redirect to post page
        window.location.href = "post.html";
    } catch (error) {
        console.error("Error: ", error);
        alert("Sign-in failed. Please check your details or try again.")
    }
}

/*

     load  refresh from localStorage
                  │
                  │
                  │
                  │
                  ▼
                                                not ok
    response = await fetch API get new token  ──────────────►  remove access & refresh from localStorage

                  │                                                              │
                  │ok                                                            │
                  │                                                              │
                  │                                                              ▼
                  ▼
                                                                     redirect to sign in form
  {access, refresh} = await response.json()

                  │
                  │
                  │
                  ▼
         saveTokens(access, refresh)


 */
async function getNewAccessToken() {
    let {refresh} = loadTokens();
    if (!refresh) {
        console.error("No refresh token found.");
        clearTokensAndRedirect();
        throw new Error("Missing refresh token.");
    }

    let response;
    try {
        response = await fetch(`${baseUrl}/login/get_new_token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({refresh})
        });

        if (!response.ok) {
            // error 401 or 403 => redirect
            if (response.status === 401 || response.status === 403) {
                console.error(`Refresh token rejected by server with status ${response.status}`);
                clearTokensAndRedirect();
                throw new Error(`Refresh token rejected (Status: ${response.status})`);
            } else {
                // Other errors might just be temporary, so just need to throw to other functions
                let errorDetail = `Status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorDetail += ` - ${JSON.stringify(errorData)}`;
                } catch {/*ignore*/}
                throw new Error(`Failed to refresh token. ${errorDetail}`);
            }


        } else {
            const {access, refresh} = await response.json();
            saveTokens(access, refresh);
            console.log("Refresh tokens successfully!")
        }
    } catch (error) {
        console.error("Error during token refresh process: ", error);
        // for other errors apart from 401 and 403
        if (!error.message.includes("Refresh token rejected")) {
            throw error;
        }
        throw error;
    }
}

/*

      load access, refresh from localStorage  ◄────────────────┐
                    │                                          │
                    │                                          │
                    ▼                                          │
             if(!access)  ───────► redirect to sign in         │
                                                               │
                    │                                          │
                    │                                          │
                    │                                          │
                    ▼                      401                 │
    response = await fetch(API get post)  ───────►   getNewAccessToken()

                    │
                    │
                    ▼             true
             !response.ok      ────────────►   handle exceptions

                    │ false
                    │
                    ▼
     data = await response.json()

                    │
                    │
                    ▼
┌──────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐ │
│  │                                     │ │
│  │   textContent = JSON.stringify(data)│ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘

 */
async function getPostContent(rootE) {
    let {access} = loadTokens();
    if (!access) {
        window.location.href = "index.html";
        return; // force to stop execution
    }

    try {
        const response = await fetch(`${baseUrl}/post`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`
            }
        });

        // handle 401 error (Unauthorized)
        if (response.status === 401) {
            console.log("Access token is expired or invalid. Refreshing ...");
            try {
                await getNewAccessToken();
                window.location.reload(); // try to get the post with new access token
                return;
            } catch (refreshError) {
                console.error("Failed to refresh token: ", refreshError);
                rootE.textContent = "Could not refresh session. Please try reloading the page.";
                return;
            }
        }

        // handle other exceptions
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                // do nothing if we cannot read json
            }
            console.error("API Error Status:", response.status, "Data:", errorData);
            throw new Error(`Failed to fetch post. Status: ${response.status}`);
        }

        // if response.ok
        const data = await response.json();
        rootE.textContent = JSON.stringify(data);

    } catch (error) {
        console.error("Error fetching post content: ", error);
        if(!rootE.textContent.includes("Could not refresh session")){
            rootE.textContent = "Failed to fetch post."
        }
    }
}

function clearTokensAndRedirect(){
    console.log("Clearing tokens and redirecting to login.");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "index.html"; // redirect to sign in form
}

function saveTokens(access, refresh) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
}

function loadTokens() {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    return {access, refresh};
}

export {onSignIn, getPostContent};