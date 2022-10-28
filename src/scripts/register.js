import { register } from "./requests.js";

function eventRegister() {
  const formRegister = document.querySelector("#form-register");
  const inputUser = document.querySelector(".input-user");
  const inputEmail = document.querySelector(".input-email");
  const inputAvatar = document.querySelector(".input-avatar");
  const inputPassword = document.querySelector(".input-password");
  const buttonRegister = document.querySelector("#button-register");
  const array = [inputUser, inputEmail, inputAvatar, inputPassword];

  array.forEach((element) => {
    element.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (element.value === "") {
        buttonRegister.disabled = true;
        buttonRegister.classList.add(".button-register-disabled");
        buttonRegister.classList.remove(".button-register-enabled");
      } else if (element.value != "") {
        buttonRegister.disabled = false;
        buttonRegister.classList.remove(".button-register-disabled");
        buttonRegister.classList.add(".button-register-enabled");
      }
    });
  });

  formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userInfo = {};

    userInfo[inputUser.id] = inputUser.value;
    userInfo[inputEmail.id] = inputEmail.value;
    userInfo[inputAvatar.id] = inputAvatar.value;
    userInfo[inputPassword.id] = inputPassword.value;

    console.log(userInfo)

    await register(userInfo);
  });
}
eventRegister();
