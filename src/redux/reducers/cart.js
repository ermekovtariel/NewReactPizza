const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};



const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZAS_CART':     
            return  {
                ...state,
                totalCount: action.payload
            }
        default:
            return state;
    }
  };
  
export default cart;