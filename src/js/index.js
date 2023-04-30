import { setChildren } from "redom";
import { createHeader } from "./header.js";
import { createOpen } from "./createOpen.js";
import { apiClient } from "./clientsApi.js";
import { validationLogin } from "./validationsForm.js";
import "../sass/style.scss";

const createBody = async () => {
  const open = createOpen();
  const headerBody = createHeader();
  setChildren(document.querySelector("header"), headerBody.header);
  try {
    setChildren(document.querySelector("main"), open.openContainer);
    headerBody.headerContainerBtn.classList.add("hide");
    open.openForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      // let login = 'developer';
      // let password = 'skillbox';
      let login = open.openFormLogin.value;
      let password = open.openFormPassword.value;
      const authorization = await apiClient(login, password);
      document.querySelector(".error").classList.remove("error__open");
      document.querySelector("#login").classList.remove("error__input-open");
      document.querySelector("#password").classList.remove("error__input-open");
      if (authorization.error === "") {
        localStorage.setItem(
          "myKey",
          JSON.stringify(authorization.payload.token)
        );
        document.querySelector("#accounts").classList.add("btn-active");
        location.assign("accounts.html").hash;
      } else validationLogin(authorization);
    });
  } catch (error) {
    console.log(error);
  }
};

createBody();
