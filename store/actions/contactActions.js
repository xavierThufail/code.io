import axios from "axios";

const url = "https://simple-contact-crud.herokuapp.com/contact";

const setContacts = (contacts) => {
  return {
    type: "SET_CONTACTS",
    payload: contacts
  };
};

const addContact = (contact) => {
  return {
    type: "ADD_CONTACT",
    payload: contact
  };
};

const editContact = (id, data) => {
  return {
    type: "EDIT_CONTACT",
    payload: { id, data }
  };
};

const deleteContact = (id) => {
  return {
    type: "DELETE_CONTACT",
    payload: { id }
  }
}

const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: loading
  };
};

const setError = (err) => {
  return {
    type: "SET_ERROR",
    payload: err
  };
};

const get = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "GET",
      url
    })
      .then(({ data }) => {
        dispatch(setContacts(data));
      })
      .catch(error => {
        dispatch(setError(error));
      })
      .finally(_ => {
        dispatch(setLoading(false));
      });
  };
};

const post = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url,
      data
    })
      .then(({ data }) => {
        dispatch(addContact(data));
      })
      .catch(err => {
        dispatch(setError(err));
      })
      .finally(_ => {
        dispatch(setLoading(false));
      });
  };
};

const put = (id, data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "PUT",
      url: `${url}/${id}`,
      data
    })
      .then(_ => {
        dispatch(editContact(id, data));
      })
      .catch(err => {
        dispatch(setError(err));
      })
      .finally(_ => {
        dispatch(setLoading(false));
      });
  };
};

const del = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios({
      method: "DELETE",
      url: `${url}/${id}`
    })
      .then(({ data }) => {
        dispatch(deleteContact(id))
      })
      .catch(err => {
        dispatch(setError(err));
      })
      .finally(_ => {
        dispatch(setLoading(false));
      });
  };
};


export default {
  get,
  post,
  put,
  del
}