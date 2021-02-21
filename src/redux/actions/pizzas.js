import axios from "axios";

// export const fetchPizzas = () => (dispatch) => {
//     axios.get(`http://localhost:3001/pizzas`)
//         .then(({ data }) => dispatch(setPizzas(data)))
// }
const api = 'http://localhost:3001'
export const fetchPizzas = (sortBy, category) => (dispatch) => {
    axios.get(
        `${api}/pizzas?${category !== null ? `category=${category}` : ""
        }&_sort=${sortBy.type}&_order=${sortBy.order}`,
    ).then(({ data }) => {
        dispatch(setPizzas(data));
    });
};

export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});


