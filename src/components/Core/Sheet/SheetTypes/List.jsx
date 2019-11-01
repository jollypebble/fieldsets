import React from 'react';

const List = (props) => {
  return(
    <ul>
      <li>
        {props.children}
      </li>
    </ul>
  )
}

export default List
