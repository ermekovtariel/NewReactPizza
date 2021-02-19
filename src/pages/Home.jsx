import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Categories, SortPopap } from "../components";

import { setCategory, setSortBy } from "../redux/actions/filter";
import PizzasBlock from '../components/PizzasBlock';

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
     <PizzasBlock />
     
      </div>
    </div>
  );
}

export default Home;
