import { login } from "./requests.js";

function wrongPasswordText() {
  const inputPassword = document.querySelector("#password");
  const inputEmail = document.querySelector("#email");
  const spanWrongPassword = document.querySelector(".span-wrong-password");
  const buttonPassword = document.querySelector("#button-password");

  inputPassword.addEventListener("input", (e) => {
    e.preventDefault();

    inputPassword.classList.remove("input-wrong-password");
    spanWrongPassword.classList.add("hidden");

    if (inputPassword.value != "") {
      buttonPassword.disabled = false;
    } else {
      buttonPassword.disabled = true;
    }
  });
  inputEmail.addEventListener("input", (e) => {
    e.preventDefault();

    inputPassword.classList.remove("input-wrong-password");
    spanWrongPassword.classList.add("hidden");

    if (inputPassword.value != "") {
      buttonPassword.disabled = false;
    } else {
      buttonPassword.disabled = true;
    }
  });
}
wrongPasswordText();

function eventLogin() {
  const formLogin = document.querySelector("#form-login");
  const inputEmail = document.querySelector(".input-email");
  const inputPassword = document.querySelector(".input-password");
  const buttonPassword = document.querySelector("#button-password");

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMailPass = {};

    userMailPass[inputEmail.id] = inputEmail.value;
    userMailPass[inputPassword.id] = inputPassword.value;

    console.log(userMailPass);

    await login(userMailPass);
  });
}
eventLogin();
