import { el, setChildren } from "redom";
import { formatMoney } from './format.js'
import { createCardInfo } from './createCard.js'
import { cardClient, createCard } from "./clientsApi.js"

export const createClient = (accounts) => {
  const card = el('div.cards');
  const container = el('div.cards__container.container');
  const cardHeader = el('div.cards__header');
  const cardinfo = el('div.cards__info');
  const cardTitle = el('h2.title', 'Ваши счета');
  const cardSelect = el('select.cards__select.form-select', { ariaLabel: 'Default select example' });
  const cardOptionselected = el('option.cards__option', 'Сортировка');
  const cardOptionNumber = el('option.cards__option', { value: 'По номеру' }, 'По номеру');
  const cardOptionBalance = el('option.cards__option', { value: 'По балансу' }, 'По балансу');
  const cardOptionTransactions = el('option.cards__option', { value: 'По последней транзакции' }, 'По последней транзакции');
  setChildren(cardSelect, [cardOptionselected, cardOptionNumber, cardOptionBalance, cardOptionTransactions]);
  const btnCreateScore = el('button.btn.btn-primary.scor-btn', { type: "button" }, 'Создать новый счёт');
  const cardBody = el('div.card__container')

  const clientCard = (account) => {
    const clientCard = el('div.card', { style: "width: 400px;" });
    const clientCardInfo = el('div.card__info');
    const clientCardNumber = el('h5.card__number.card-title', `${account.account.substr(0, 15)}`);
    const clientCardBalance = el('p.card__text.card-text', `${formatMoney(account.balance)} ₽`);
    const clientCardTransactions = el('p.card__transactions.card-text', `Последняя транзакция:`);
    const clientCardDate = el('span.card__span.card-text', `${account.transactions.map(e => {
      const date = new Date(e.date).toLocaleDateString();
      return date
    })}`);
    const clientCardbutton = el('div.');
    const clientCardbtn = el('a.btn.btn-primary.card__btn', 'Открыть');
    setChildren(clientCardbutton, clientCardbtn)
    setChildren(clientCardInfo, [clientCardNumber, clientCardBalance, clientCardTransactions, clientCardDate]);
    setChildren(clientCard, [clientCardInfo, clientCardbutton]);
    clientCardbtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const client = await cardClient(account.account);
      setChildren(document.querySelector('main'), createCardInfo(client));
    });
    return clientCard
  }

  accounts.payload.forEach(account => {
    cardBody.append(clientCard(account))

  });
  cardSelect.addEventListener('change', () => {
    if (cardSelect.value === 'По номеру') {
      const cardSortNumber = accounts.payload.sort((a, b) => b.account - a.account)
      cardBody.innerHTML = '';
      cardSortNumber.forEach(account => {
        cardBody.append(clientCard(account))
      });
    }
    if (cardSelect.value === 'По балансу') {
      const cardSortNumber = accounts.payload.sort((a, b) => b.balance - a.balance)
      cardBody.innerHTML = '';
      cardSortNumber.forEach(account => {
        cardBody.append(clientCard(account))
      });
    }
    if (cardSelect.value === 'По последней транзакции') {
      const cardSortNumber = accounts.payload.sort((a, b) => b.transactions.date - a.transactions.date)

      cardBody.innerHTML = '';
      cardSortNumber.forEach(account => {
        cardBody.append(clientCard(account))
        console.log(cardSortNumber.transactions);
      });
    }
  })

  btnCreateScore.addEventListener('click', async (e) => {
    e.preventDefault();
    const card = await createCard();
    cardBody.append(clientCard(card.payload));
  })

  setChildren(cardinfo, [cardTitle, cardSelect]);
  setChildren(cardHeader, [cardinfo, btnCreateScore]);
  setChildren(container, [cardHeader, cardBody]);
  setChildren(card, container);

  return card
};
