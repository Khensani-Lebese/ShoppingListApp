// src/redux/reducer.js

const initialState = {
    lists: [], 
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_LISTS_SUCCESS':
        return action.payload;
        //return { ...state, lists: action.payload }; 

        
           
      case 'ADD_LIST_SUCCESS':
        return { ...state, lists: [...state.lists, action.payload] };
      case 'DELETE_LIST_SUCCESS':
        return { ...state, lists: state.lists.filter(list => list.id !== action.payload) };
      case 'UPDATE_LIST_SUCCESS':
        return {
          
          lists: state.lists.map(list =>
            list.id === action.payload.id ? action.payload : list
          ),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  