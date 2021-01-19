const initialState = {
  credits: [],
  debits: [],
  debitsTotal: 0,
  creditsTotal: 0,
  accountBalance: 0
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_CREDIT") {
    return Object.assign({}, state, {
      credits: state.credits.concat(action.payload),
      creditsTotal: parseFloat(state.creditsTotal) + parseFloat(action.payload.amount),
      accountBalance: parseFloat(state.accountBalance) + parseFloat(action.payload.amount)
    });
  }
  if (action.type === "ADD_DEBIT") {
    return Object.assign({}, state, {
      debits: state.debits.concat(action.payload),
      debitsTotal: parseFloat(state.debitsTotal) + parseFloat(action.payload.amount),
      accountBalance: parseFloat(state.accountBalance) - parseFloat(action.payload.amount)
    });
  }
  if (action.type === "LOAD_BALANCE") {
    let credits = state.credits.reduce((acc, item) => acc + item.amount, 0)
    let debits = state.debits.reduce((acc, item) => acc + item.amount, 0)
    let balance = parseFloat(credits) - parseFloat(debits);
    return Object.assign({}, state, {
      accountBalance: balance
    });
  }
  if (action.type === "LOAD_CREDITS") {
    let credits = action.payload.reduce((acc, item) => acc + item.amount, 0)
    let debits = state.debits.reduce((acc, item) => acc + item.amount, 0)
    return Object.assign({}, state, {
      credits: state.credits.concat(action.payload),
      creditsTotal: credits,
      accountBalance: credits - debits
    });
  }
  if (action.type === "LOAD_DEBITS") {
    let credits = state.credits.reduce((acc, item) => acc + item.amount, 0)
    let debits = action.payload.reduce((acc, item) => acc + item.amount, 0)
    return Object.assign({}, state, {
      debits: state.debits.concat(action.payload),
      debitsTotal: debits,
      accountBalance: credits - debits
    });
  }
  return state;
};

export default rootReducer;
