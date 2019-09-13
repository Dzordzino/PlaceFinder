import React from "react";
import PropTypes from "prop-types";

const List = ({ data, showInfo }) => (
  <ul>
    {data.map(item => (
      <li key={item.id} id={item.id} onClick={(e) => showInfo(e)}>
            {item.name.split("_").join(" ")}{" "}
      </li>
    ))}
  </ul>
);

List.propTypes = {
    data: PropTypes.array,
    showInfo: PropTypes.func.isRequired
};

export default List;
