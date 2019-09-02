import React from "react";

const List = ({ data, showInfo }) => (
  <ul>
    {data.map(item => (
      <li key={item.id} id={item.id} onClick={(e) => showInfo(e)}>
            {item.name.split("_").join(" ")}{" "}
      </li>
    ))}
  </ul>
);

export default List;
