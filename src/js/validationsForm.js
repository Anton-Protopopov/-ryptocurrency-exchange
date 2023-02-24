export const validationСurrencyBuy = (data) => {
  const errorSpan = document.querySelector('.error');
  const errorInput = document.querySelector('.currency__input');
  errorSpan.classList.add('error__open')
  if(data.error === 'Invalid amount'){
    errorSpan.textContent ='не указана сумма перевода, или она отрицательная';;
    errorInput.classList.add('error__input-open');
  }
  if(data.error === 'Not enough currency'){
    errorSpan.textContent ='на валютном счёте списания нет средств';
    errorInput.classList.add('error__input-open');
  }
  if(data.error === 'Overdraft prevented'){
    errorSpan.textContent ='попытка перевести больше, чем доступно на счёте списания';
    errorInput.classList.add('error__input-open');
  }else return
}
export const validationLogin = (data) => {
  const errorSpan = document.querySelector('.error');
  const errorInputLogin = document.querySelector('#login');
  const errorInputPassword = document.querySelector('#password');
  errorSpan.classList.add('error__open')
  if(data.error === 'Invalid password'){
    errorSpan.textContent ='пытаемся войти с неверным паролем';;
    errorInputPassword.classList.add('error__input-open');
  }
  if(data.error === 'No such user'){
    errorSpan.textContent ='пользователя с таким логином не существует';
    errorInputLogin.classList.add('error__input-open');
  }else return
}
export const validationTransferFunds = (data) => {
  const errorSpan = document.querySelector('.error');
  const errorInputCheck = document.querySelector('#check');
  const errorInputSum = document.querySelector('#sum');
  errorSpan.classList.add('error__open')
  if(data.error === 'Invalid account to'){
    errorSpan.textContent ='не указан счёт зачисления, или этого счёта не существует';;
    errorInputCheck.classList.add('error__input-open');
  }
  if(data.error === 'Overdraft prevented'){
    errorSpan.textContent ='мы попытались перевести больше денег, чем доступно на счёте списания';
    errorInputSum.classList.add('error__input-open');
  }
  if(data.error === 'Invalid amount'){
    errorSpan.textContent ='не указана сумма перевода, или она отрицательная';
    errorInputSum.classList.add('error__input-open');
  }else return
}
