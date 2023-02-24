import { el, setChildren } from "redom";

export const createHeader = () => {
const header = el('div.header');
const headerContainer = el('div.container.header__container');
const headerIcon = el('img.header__img',{src: "../img/Logo.png", alt: 'Logo'});
const headerContainerBtn = el('div.header__button');
const BtnOpen = el('button.header__btn.btn#open','Выйти');
const BtnCurrency = el('button.header__btn.btn#currency','Валюта');
const BtnAccounts = el('button.header__btn.btn#accounts','Счета');
const BtnMap = el('button.header__btn.btn#map1','Банкоматы');

setChildren(headerContainerBtn,[BtnMap,BtnAccounts,BtnCurrency,BtnOpen]);
setChildren(headerContainer,[headerIcon,headerContainerBtn]);
setChildren(header,headerContainer);

const headerNavi = document.querySelectorAll('.header__btn')
BtnMap.addEventListener('click',  (e) => {
  e.preventDefault();
  headerNavi.forEach(element => {
    element.classList.remove('btn-active')
  });
  location.assign('map.html')
});
BtnAccounts.addEventListener('click',  (e) => {
  e.preventDefault();
  headerNavi.forEach(element => {
    element.classList.remove('btn-active')
  });
  location.assign('accounts.html')
});
BtnCurrency.addEventListener('click',  (e) => {
  e.preventDefault();
  headerNavi.forEach(element => {
    element.classList.remove('btn-active')
  });
  location.assign('currency.html')
});
BtnOpen.addEventListener('click',  (e) => {
  e.preventDefault();
  headerNavi.forEach(element => {
    element.classList.remove('btn-active')
  });
  BtnOpen.classList.add('hide')
  localStorage.clear();
  location.assign('index.html')
});
return{
  header,
  BtnMap,
  BtnOpen,
  BtnAccounts,
  BtnCurrency,
  headerContainerBtn
}
};
