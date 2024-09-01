// src/redux/actions.js

export const fetchLists = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/lists');
    const data = await response.json();
    console.log('Fetched lists:', data);
    dispatch({ type: 'FETCH_LISTS_SUCCESS', payload: data });
  } catch (error) {
    console.error('Failed to fetch lists', error);
  }
};

export const addList = (formData) => async (dispatch) => {
  const imageFile = formData.get('image');
  let base64Image = null;

  if (imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      base64Image = reader.result;

      const plainData = {
        name: formData.get('name'),
        quantity: formData.get('quantity'),
        notes: formData.get('notes'),
        category: formData.get('category'),
        image: base64Image,
      };

      try {
        const response = await fetch('http://localhost:5000/lists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(plainData),
        });

        const newList = await response.json();
        console.log({ newList });

        dispatch({ type: 'ADD_LIST_SUCCESS', payload: newList });

        if(callback)callback();
      } catch (error) {
        console.error('Failed to add list', error);
      }
    };
  } else {
    // Handle cases where there's no image
    const plainData = {
      name: formData.get('name'),
      quantity: formData.get('quantity'),
      notes: formData.get('notes'),
      category: formData.get('category'),
    };

    try {
      const response = await fetch('http://localhost:5000/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plainData),
      });

      const newList = await response.json();
      console.log({ newList });

      dispatch({ type: 'ADD_LIST_SUCCESS', payload: newList });

      if(callback) callback();
    } catch (error) {
      console.error('Failed to add list', error);
    }
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
    console.log('Updated List:', updatedList);
    dispatch({ type: 'UPDATE_LIST_SUCCESS', payload: updatedList });
  } catch (error) {
    console.error('Failed to update list', error);
  }
};
