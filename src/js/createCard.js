import { mount, el, setChildren } from "redom";
import { formatMoney } from './format.js';
import { createClient } from './createClient.js';
import { translationFilter } from './translationFilter.js';
import { createGraphCard, createGraphBalance, createGraphTranslation } from './createGraphs.js';
import { translationApi, accountsClient } from "./clientsApi.js"
import { validationTransferFunds } from './validationsForm.js'

export const createCardInfo = (data) => {
  const translationCard = translationFilter(data)
  const cardInfo = el('div.cardInfo');
  const container = el('div.cardInfo__container.container');
  const cardInfoHeader = el('div.cardInfo__header');
  const cardinfo = el('div.cardInfo__info');
  const cardInfoTitle = el('h2.title.cardInfo__title', 'Просмотр счёта ');
  const cardInfoNumder = el('p.cardInfo__numder', `№${data.payload.account.substr(0, 15)}`);
  const cardbtn = el('div.cardInfo__button')
  const btnCardBack = el('button.btn.btn-primary.back-btn', { type: "button" }, 'Вернуться назад');
  const cardText = el('p.cardInfo__text', 'Баланс:');
  const cardSpan = el('span.cardInfo__span', `${formatMoney(data.payload.balance)} ₽`);
  mount(cardText, cardSpan);
  setChildren(cardbtn, [btnCardBack, cardText]);
  setChildren(cardinfo, [cardInfoTitle, cardInfoNumder]);
  setChildren(cardInfoHeader, [cardinfo, cardbtn]);

  const translation = el('div.translation');
  const translationContainer = el('div.translation__container');
  const translationFormBody = el('div.translation__body');
  const translationFormTitle = el('h3.translation__title', 'Новый перевод');
  const translationForm = el('form.translation__form');
  const translationFormInputCheck = el('input.translation__input.form-control#check', { type: 'number' });
  const translationFormLabelCheck = el('label.translation__label');
  const translationFormSpanCheck = el('span.translation__span', 'Номер счёта получателя');
  const translationFormInputSum = el('input.translation__input.form-control#sum', { type: 'number' });
  const translationFormLabelSum = el('label.translation__label');
  const translationFormSpanSum = el('span.translation__span', 'Сумма перевода');
  const translationFormBtn = el('button.btn.btn-primary.translation__btn', { type: 'submit' }, 'Отправить');
  const translationFormButton = el('div.translation__buttom');
  const chart = el('div.balance#balance');
  const chartContainer = el('div.balance__container');
  const chartTitle = el('h3.translation__title', 'Динамика баланса');
  const translationFormError = el('span.error');
  setChildren(chartContainer, [chartTitle, chart]);
  setChildren(translationFormButton, translationFormBtn);
  setChildren(translationFormLabelSum, [translationFormSpanSum, translationFormInputSum]);
  setChildren(translationFormLabelCheck, [translationFormSpanCheck, translationFormInputCheck]);
  setChildren(translationForm, [translationFormLabelCheck, translationFormLabelSum, translationFormError, translationFormButton]);
  setChildren(translationFormBody, [translationFormTitle, translationForm]);
  setChildren(translationContainer, [translationFormBody, chartContainer]);
  setChildren(translation, translationContainer);

  const tableContainer = el('div.tabl__container');
  const tableDiv = el('div.tabl__div');
  const table = el('table.tabl');
  const tableTitle = el('h3.translation__title', 'История переводов');
  const tableThead = el('thead');
  const tableTheadTr = el('tr.tabl__head');
  const tableTheadThSender = el('th#Sender', 'Счёт отправителя');
  const tableTheadThRecipient = el('th', 'Счёт получателя');
  const tableTheadThSum = el('th', 'Сумма');
  const tableTheadThDate = el('th#date', 'Дата');
  const tableBody = el('tbody');
  const translationHistory = (arr) => {
    const date = new Date(arr.date).toLocaleDateString();
    const tableBodyTr = el('tr#BodyTr');
    const tableBodyThSender = el('th#ThSender', `${arr.from.substr(0, 12)}`);
    const tableBodyThRecipient = el('th', `${arr.to.substr(0, 12)}`);
    const tableBodyThDate = el('th', `${date}`);
    if (data.payload.account === arr.from) {
      const tableBodyThSum = el('th.expense', `- ${formatMoney(arr.amount)} ₽`);
      setChildren(tableBodyTr, [tableBodyThSender, tableBodyThRecipient, tableBodyThSum, tableBodyThDate]);
      return tableBodyTr
    } else {
      const tableBodyThSum = el('th.profit', `+ ${formatMoney(arr.amount)} ₽`);
      setChildren(tableBodyTr, [tableBodyThSender, tableBodyThRecipient, tableBodyThSum, tableBodyThDate]);
      return tableBodyTr
    };

  }

  btnCardBack.addEventListener('click', async (e) => {
    e.preventDefault()
    const accounts = await accountsClient();
    setChildren(document.querySelector('main'), createClient(accounts));
  });

  translationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.error').classList.remove('error__open');
    document.querySelector('#check').classList.remove('error__input-open');
    document.querySelector('#sum').classList.remove('error__input-open');
    const from = data.payload.account;
    const to = translationFormInputCheck.value;
    const amount = translationFormInputSum.value;
    const render = await translationApi(from, to, amount);
    if(amount === '' || amount === '0'){
      document.querySelector('.error').textContent ='не указана сумма перевода, или она отрицательная';;
      document.querySelector('#sum').classList.add('error__input-open');
      document.querySelector('.error').classList.add('error__open')
      return
    }
    if (render.error === '') {
      setChildren(document.querySelector('main'), createCardInfo(render))
    }else validationTransferFunds(render)
  });

  data.payload.transactions.forEach(element => {
    tableBody.prepend(translationHistory(element))
  })
  setChildren(tableTheadTr, [tableTheadThSender, tableTheadThRecipient, tableTheadThSum, tableTheadThDate]);
  setChildren(tableThead, tableTheadTr);
  setChildren(table, [tableThead, tableBody]);
  setChildren(tableDiv, table);
  setChildren(tableContainer, [tableTitle, tableDiv]);


  setChildren(container, [cardInfoHeader, translation, tableContainer]);
  setChildren(cardInfo, [container]);


  chartContainer.addEventListener('click', (e) => {
    e.preventDefault()
    const chartsContainer = el('div.charts__container');
    const chartsbalance = el('div#chartBalance');
    const chartsbalanceDiv = el('div.charts__balance');
    const chartsbalanceH3 = el('h3.translation__title', 'Динамика баланса');
    const chartsTranslation = el('div#chartTranslation');
    const chartsTranslationDiv = el('div.charts__balance');
    const chartsTranslationH3 = el('h3.translation__title', 'Соотношение входящих исходящих транзакций');
    setChildren(chartsbalanceDiv, [chartsbalanceH3, chartsbalance]);
    setChildren(chartsTranslationDiv, [chartsTranslationH3, chartsTranslation]);
    setChildren(chartsContainer, [chartsbalanceDiv, chartsTranslationDiv]);
    setChildren(translation, chartsContainer);
    createGraphBalance(translationCard);
    createGraphTranslation(translationCard);
  });


  createGraphCard(translationCard);
  return cardInfo
};
