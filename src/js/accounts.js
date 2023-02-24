import { setChildren } from "redom";
import { createHeader } from "./header.js";
import { createClient } from "./createClient.js";
import { accountsClient } from "./clientsApi.js"
const headerBody = createHeader();
const account = async () => {
  setChildren(document.querySelector('header'), headerBody.header);
  try {
    headerBody.headerContainerBtn.classList.remove('hide');
    document.querySelector('#accounts').classList.add('btn-active');
    const accounts = await accountsClient();
    setChildren(document.querySelector('main'), createClient(accounts));
  } catch (error) {
    console.log(error);
  };
}
account()
