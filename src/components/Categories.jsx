import React from "react";

function Categories({ items, selectedCategory, actvCategoryIdex }) {
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => selectedCategory(null)}
          className={actvCategoryIdex === null ? "active" : ""}
        >
          Все
        </li>
        {items.map((obj, idx) => (
          <li className={actvCategoryIdex === idx ? "active" : ""}
          onClick={()=>selectedCategory(idx)}
          key={`__${idx}__${obj}__${idx}`}>{obj}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
