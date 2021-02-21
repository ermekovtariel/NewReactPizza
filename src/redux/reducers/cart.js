const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split(".");
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZAS_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            }
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }
        }


        case 'PLUS_CART_ITEM': {
            const newObjectItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems)
                }
            }
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }
        }
        case 'CLEAN_CART': {
            const totalCount = 0
            const totalPrice = 0
            return {
                ...state,
                items: [],
                totalCount,
                totalPrice,
            }
        }
        case "PLUS_CART_ITEM": {
            const newObjItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0],
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, "items.length");
            const totalPrice = getTotalSum(newItems, "totalPrice");


            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }
        case "MINUS_CART_ITEM": {
            // console.log('aawdwadwadwadwad', state.items[action.payload])
            const oldItems = state.items[action.payload].items;
            const newObjItems =
                oldItems.length > 1
                    ? state.items[action.payload].items.slice(1)
                    : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };
            const totalCount = getTotalSum(newItems, "items.length");
            const totalPrice = getTotalSum(newItems, "totalPrice");
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }
        case "REMOVE": {
            const newItems = { ...state.items };
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount,
            };
        }

        case "CLEAR_CART": {
            return {
                totalPrice: 0,
                totalCount: 0,
                items: {},
            };
        }
        default:
            return state;
    }
};

export default cart;