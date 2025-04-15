import {onSignIn} from "./apis.js";

const formElement = document.querySelector("#sign-in-form");
formElement.onsubmit = async event => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    await onSignIn(email,password);
}

