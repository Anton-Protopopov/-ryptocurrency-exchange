import { el, setChildren } from "redom";

export const createOpen = () => {
  const openContainer = el('div.open__container.container');
  const openFormBody = el('div.open__body');
  const openFormTitle = el('h2.open__title.title','Вход в аккаунт');
  const openForm = el('form.open__form');
  const openFormLabelLogin = el('label.open__label');
  const openFormSpanLogin = el('span.open__span','Логин');
  const openFormLogin = el('input.open__input.form-control#login',{type:'text', placeholder: 'Login'});
  const openFormLabelPassword = el('label.open__label');
  const openFormSpanPassword = el('span.open__span','Пароль');
  const openFormPassword = el('input.open__input.form-control#password',{type:'password', placeholder: 'password'});
  const openFormBtn = el('button.btn.btn-primary.open__btn',{type: 'submit'},'Войти');
  const openFormButton = el('div.open__buttom');
  const openFormError = el('span.error');
  setChildren(openFormLabelLogin,[openFormSpanLogin,openFormLogin]);
  setChildren(openFormLabelPassword,[openFormSpanPassword,openFormPassword]);
  setChildren(openFormButton,openFormBtn)
  setChildren(openForm,[openFormLabelLogin,openFormLabelPassword,openFormError,openFormButton]);
  setChildren(openFormBody,[openFormTitle,openForm]);
  setChildren(openContainer,openFormBody);

  return{
    openContainer,
    openForm,
    openFormLogin,
    openFormPassword,
    openFormBtn
  }
};
