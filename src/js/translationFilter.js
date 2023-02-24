export const translationFilter = (data) => {
  let januaryTransfers = {
    expenses: 0,
    profit: 0
  };
  let februaryTransfers = {
    expenses: 0,
    profit: 0
  };
  let marchTransfers = {
    expenses: 0,
    profit: 0
  };
  let aprilTransfers = {
    expenses: 0,
    profit: 0
  };
  let mayTransfers = {
    expenses: 0,
    profit: 0
  };
  let juneTransfers = {
    expenses: 0,
    profit: 0
  };
  let julyTransfers = {
    expenses: 0,
    profit: 0
  };
  let augustTransfers = {
    expenses: 0,
    profit: 0
  };
  let septemberTransfers = {
    expenses: 0,
    profit: 0
  };
  let octoberTransfers = {
    expenses: 0,
    profit: 0
  };
  let novemberTransfers = {
    expenses: 0,
    profit: 0
  };
  let decemberTransfers = {
    expenses: 0,
    profit: 0
  };

  const filterSum = (arr) => {
    let date = new Date(arr.date)
    if (data.payload.account === arr.from) {
      if (date.getMonth() === 0) {
        januaryTransfers.expenses = Number(januaryTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 1) {
        februaryTransfers.expenses = Number(februaryTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 2) {
        marchTransfers.expenses = Number(marchTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 3) {
        aprilTransfers.expenses = Number(aprilTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 4) {
        mayTransfers.expenses = Number(mayTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 5) {
        juneTransfers.expenses = Number(juneTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 6) {
        julyTransfers.expenses = Number(julyTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 7) {
        augustTransfers.expenses = Number(augustTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 8) {
        septemberTransfers.expenses = Number(septemberTransfers.expenses) + Number(arr.amount);
          ;
      }
      if (date.getMonth() === 9) {
        octoberTransfers.expenses = Number(octoberTransfers.expenses) + Number(arr.amount);
      }
      if (date.getMonth() === 10) {
        novemberTransfers.expenses = Number(novemberTransfers.expenses) + Number(arr.amount);

      }
      if (date.getMonth() === 11) {
        decemberTransfers.expenses = Number(decemberTransfers.expenses) + Number(arr.amount);

      }
    }
    if (data.payload.account !== arr.from ) {
      if (date.getMonth() === 0) {
        januaryTransfers.profit = Number(januaryTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 1) {
        februaryTransfers.profit = Number(februaryTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 2) {
        marchTransfers.profit = Number(marchTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 3) {
        aprilTransfers.profit = Number(aprilTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 4) {
        mayTransfers.profit = Number(mayTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 5) {
        juneTransfers.profit = Number(juneTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 6) {
        julyTransfers.profit = Number(julyTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 7) {
        augustTransfers.profit = Number(augustTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 8) {
        septemberTransfers.profit = Number(septemberTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 9) {
        octoberTransfers.profit = Number(octoberTransfers.profit) + Number(arr.amount);
      }
      if (date.getMonth() === 10) {
        novemberTransfers.profit = Number(novemberTransfers.profit) + Number(arr.amount);

      }
      if (date.getMonth() === 11) {
        decemberTransfers.profit = Number(decemberTransfers.profit) + Number(arr.amount);

      }
    }
  };

  data.payload.transactions.forEach(element => {
    filterSum(element);
  })
  return{
    januaryTransfers,
    februaryTransfers,
    marchTransfers,
    aprilTransfers,
    mayTransfers,
    juneTransfers,
    julyTransfers,
    augustTransfers,
    septemberTransfers,
    octoberTransfers,
    novemberTransfers,
    decemberTransfers
  }
}
