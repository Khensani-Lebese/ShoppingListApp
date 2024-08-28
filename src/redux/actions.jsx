// src/redux/actions.js

export const fetchLists = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/lists');
    const data = await response.json();
    dispatch({ type: 'FETCH_LISTS_SUCCESS', payload: data });
  } catch (error) {
    console.error('Failed to fetch lists', error);
  }
};

export const addList = (formData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const newList = await response.json();
    console.log({ newList });
    
    dispatch({ type: 'ADD_LIST_SUCCESS', payload: newList });
  } catch (error) {
    console.error('Failed to add list', error);
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:5000/lists/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_LIST_SUCCESS', payload: id });
  } catch (error) {
    console.error('Failed to delete list', error);
  }
};

export const updateList = (list) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/lists/${list.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    });
    const updatedList = await response.json();
    dispatch({ type: 'UPDATE_LIST_SUCCESS', payload: updatedList });
  } catch (error) {
    console.error('Failed to update list', error);
  }
};
