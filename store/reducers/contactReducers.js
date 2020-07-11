const initialReducers = {
  contacts: [],
  loading: false,
  error: null
};

export default function contactReducers (state = initialReducers, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return {...state, contact: action.payload};
    case "ADD_CONTACT":
      return {...state, contacts: [...state.contacts].push(payload)};
    case "EDIT_CONTACT":
      return {...state, contacts: [...state.contacts].map(contact => {
        if (contact.id === action.payload.id) contact = action.payload.data;
        return contact;
      })};
    case "DELETE_CONTACT":
      return {...state, contact: [...state.contacts].filter(contact => contact.id !== action.payload.id)};
    case "SET_LOADING":
      return {...state, loading: action.payload};
    case "SET_ERROR":
      return {...state, error: action.payload};
    default:
      return state;
  }
}