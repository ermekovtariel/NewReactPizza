export const addPizzaToCart = (obj) => ({
    type: 'ADD_PIZZAS_CART',
    payload: obj,
})


export const cleanCart = (obj) => ({
    type: 'CLEAN_CART',
    payload: obj,
})
export const minusItemOnCart = (id) => ({
    type: 'MINUS_CART_ITEM',
    payload: id,
})
export const plusItemOnCart = (id) => ({
    type: 'PLUS_CART_ITEM',
    payload: id,
})

export const onRemove = (id) => ({
    type: 'REMOVE',
    payload: id
})