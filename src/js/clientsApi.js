let token = JSON.parse(localStorage.getItem("myKey"));
export const apiClient = async (login, password) => {
  try {
    login = login;
    password = password;

    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    // console.log(result)
    if (result.error === '') {
      token = result.payload.token;
    }

    return result;
  } catch (error) {
    console.log(error)
  }
};

export const translationApi = async (from, to, amount) => {
  try {
    const response = await fetch(`http://localhost:3000/transfer-funds`, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount
      }),
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}

export const createCard = async () => {
  try {

    const response = await fetch(`http://localhost:3000/create-account`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}



export const accountsClient = async () => {
  try {
    const response = await fetch(`http://localhost:3000/accounts`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}
export const cardClient = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/account/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}
export const currenciesCode = async () => {
  try {
    const response = await fetch(`http://localhost:3000/all-currencies`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const currencies = async () => {
  try {
    const response = await fetch(`http://localhost:3000/currencies`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}

export const currencyBuy = async (from, to, amount) => {
  try {
    const response = await fetch(`http://localhost:3000/currency-buy`, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount
      }),
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}

