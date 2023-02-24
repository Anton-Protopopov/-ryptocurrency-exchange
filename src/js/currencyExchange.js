import { el, setChildren } from "redom";
import { currenciesCode, currencies, currencyBuy } from "./clientsApi.js";
import { formatMoney } from './format.js'
import { validationСurrencyBuy } from './validationsForm.js'

export const currencyExchange = async () => {
  const Code = await currenciesCode();
  const data = await currencies();

  const currency = el('div.currency');
  const container = el('div.currency__container.container');
  const currencyTitle = el('h2.title.currency__title', 'Валютный обмен');
  const currencyBody = el('div.currency__body');
  const currencyBodyContainer = el('div.currency__header');
  const currencyClient = el('div.currency__client');
  const currencyClientTitle = el('h3.translation__title', 'Ваши валюты');
  const currencyClientList = el('ul.currency__list');

  const currencyClientExchange = el('div.currency__exchange');
  const currencyFormTitle = el('h3.translation__title', 'Обмен валюты');
  const currencyFormExchange = el('form.currency__form');
  const currencyFormExc = el('div.currency__exc');
  const currencyFormDiv = el('div.currency__div');
  const currencyFormSpanFrom = el('span.currency__span', 'Из');
  const currencySelectFrom = el('select.currency__select.form-select', { ariaLabel: 'Default select example' });
  const currencyFormSpanTo = el('span.currency__span', 'в');
  const currencySelectTo = el('select.currency__select.form-select', { ariaLabel: 'Default select example' });
  const currencyFormSum = el('div.currency__sum');
  const currencyFormSpanSum = el('span.currency__span', 'Сумма');
  const currencyFormInputSum = el('input.currency__input.form-control', { type: 'number'});
  const currencyFormBtn = el('button.btn.btn-primary.currency__btn', { type: 'submit' }, 'Обменять');
  const currencyFormButton = el('div.currency__buttom');
  const currencyFormError = el('span.error');

  const currencyClientChange = el('div.change__client');
  const currencyClientChangeTitle = el('h3.translation__title', 'Изменение курсов в реальном времени');
  const currencyClientChangeList = el('ul.Change__list');
  Code.payload.forEach(element => {
    const currencyOptionFrom = el('option.currency__optionFrom', `${element}`);
    const currencyOptionTo = el('option.currency__optionTo', `${element}`);
    currencySelectFrom.append(currencyOptionFrom);
    currencySelectTo.append(currencyOptionTo);

  });
  currencyFormExchange.addEventListener('submit', async (e) => {
    e.preventDefault()
    currencyFormInputSum.classList.remove('error__input-open');
    currencyFormError.classList.remove('error__open');
    const from = currencySelectFrom.value;
    const to = currencySelectTo.value;
    const amount = currencyFormInputSum.value;
    const data = await currencyBuy(from, to, amount);
    if(amount === '' || amount === '0'){
      currencyFormError.textContent ='не указана сумма перевода, или она отрицательная';;
      currencyFormInputSum.classList.add('error__input-open');
      currencyFormError.classList.add('error__open')
      return
    }
    if( data.error === ''){
      currencyClientList.innerHTML = '';
      for (const key in data.payload) {
        const value = data.payload[key]
        const currencyClientItem = el('li.currency__item');
        const currencySpanCode = el('div.currency__span-code', `${value.code}`);
        const currencySpanPrice = el('div.currency__span-price', `${formatMoney(value.amount)}`);

        setChildren(currencyClientItem, [currencySpanCode, currencySpanPrice]);
        currencyClientList.append(currencyClientItem)
      }
    }
    else validationСurrencyBuy(data)

  });

  for (const key in data.payload) {
    const value = data.payload[key]
    const currencyClientItem = el('li.currency__item');
    const currencySpanCode = el('div.currency__span-code', `${value.code}`);
    const currencySpanPrice = el('div.currency__span-price', `${formatMoney(value.amount)}`);

    setChildren(currencyClientItem, [currencySpanCode, currencySpanPrice]);
    currencyClientList.append(currencyClientItem)
  }

  setChildren(currencyClient, [currencyClientTitle, currencyClientList]);
  setChildren(currencyFormExc, [currencyFormSpanFrom, currencySelectFrom, currencyFormSpanTo, currencySelectTo]);
  setChildren(currencyFormSum, [currencyFormSpanSum, currencyFormInputSum]);
  setChildren(currencyFormButton, currencyFormBtn);
  setChildren(currencyFormDiv, [currencyFormExc, currencyFormSum,currencyFormError]);
  setChildren(currencyFormExchange, [currencyFormDiv, currencyFormButton]);
  setChildren(currencyClientExchange, [currencyFormTitle, currencyFormExchange]);
  setChildren(currencyBody, [currencyClient, currencyClientExchange]);
  setChildren(currencyClientChange, [currencyClientChangeTitle, currencyClientChangeList]);
  setChildren(currencyBodyContainer, [currencyBody, currencyClientChange]);
  setChildren(container, [currencyTitle, currencyBodyContainer]);
  setChildren(currency, container);

  const changingRates = new WebSocket("ws://localhost:3000/currency-feed");
  changingRates.onmessage = function (event) {
    let data = JSON.parse(event.data)
    if (data.type === 'EXCHANGE_RATE_CHANGE') {
      if (currencyClientChangeList.querySelectorAll('li').length > 28) {
        const list = currencyClientChangeList.querySelectorAll('li')
        const last = list[list.length - 1]
        currencyClientChangeList.removeChild(last)
      };
      const currencyChangingRatesItem = el('li.change__item');
      const currencyChangingRatesSpanFrom = el('div', `${data.from}/${data.to}`);
      const currencyChangingRatesSpanPrice = el('div', `${formatMoney(data.rate)}`);
      if (data.change === 1){
        currencyChangingRatesSpanFrom.classList.add('change__span-top')
        currencyChangingRatesSpanPrice.classList.add('change__span-price--top')
      }
      if (data.change === -1){
        currencyChangingRatesSpanFrom.classList.add('change__span-bottom')
        currencyChangingRatesSpanPrice.classList.add('change__span-price--bottom')
      }

      setChildren(currencyChangingRatesItem, [currencyChangingRatesSpanFrom, currencyChangingRatesSpanPrice]);
      currencyClientChangeList.prepend(currencyChangingRatesItem);
    };
  };
  return currency
}
