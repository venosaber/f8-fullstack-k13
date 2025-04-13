const baseUrl = 'https://api-todolist-multiuser.onrender.com/Trung';

const getData = async (endpoint) => {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    return await response.json();
}

const postData = async (endpoint, payload) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

const putData = async (endpoint, id, payload) => {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return await response.json();
}

const deleteData = async (endpoint, id) => {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
        method: "DELETE"
    })
    return await response.json();
}

export {getData, postData, putData, deleteData};