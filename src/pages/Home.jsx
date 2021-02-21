import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Categories, SortPopap } from "../components";
import PizzaBlock from '../components/PizzasBlock';

import { setCategory, setSortBy } from "../redux/actions/filter";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortItems = [
  { name: "популярности", type: "popular", order: 'desc' },
  { name: "цене", type: "price", order: 'desc' },
  { name: "алфавиту", type: "name", order: 'asc' },
];


function Home() {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items)
  const items = useSelector(({ pizzas }) => pizzas.items)

  // console.log(cartItems)

  //----Looking Date-----
  // console.log('Pizzas is Comming', useSelector(({pizzas})=>pizzas));
  //----||||||||||||-----

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category))
  }, [sortBy, category])


  const selectCategory = useCallback((idx) => {
    dispatch(setCategory(idx))
  })
  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj))
  }

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);


  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={selectCategory}
          actvCategoryIdex={category}
          items={categoryNames} />
        <SortPopap
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          items.map((obj) =>
            <PizzaBlock
              onClickAddPizza={handleAddPizzaToCart}
              key={obj.id}
              addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
              {...obj} />)
        }
      </div>
    </div>
  );
}

export default Home;
