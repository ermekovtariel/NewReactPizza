import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Categories, SortPopap } from "../components";
import PizzasBlock from '../components/PizzasBlock';

import { setCategory, setSortBy } from "../redux/actions/filter";
import { fetchPizzas } from "../redux/actions/pizzas";


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

  const items = useSelector(({pizzas})=>pizzas.items)

  //----Looking Date-----
  // console.log('Pizzas is Comming', useSelector(({pizzas})=>pizzas));
  //----||||||||||||-----

  useEffect(()=>{
    dispatch(fetchPizzas())
  },[fetchPizzas])
  

  const selectCategory = useCallback((idx)=>{
    dispatch(setCategory(idx))
  })

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

 
  return (
    <div className="container">
      <div className="content__top">
        <Categories 
        selectedCategory={selectCategory}
        actvCategoryIdex={category}
        items={categoryNames}/>
        <SortPopap 
          activeSortType={sortBy.type} 
          items={sortItems} 
          onClickSortType={onSelectSortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
          { 
            items && items.map((obj, idx)=><PizzasBlock 
            dispatch={dispatch} 
              key={idx} 
              {...obj}  />)
          }
      </div>
    </div>
  );
}

export default Home;
