import { NavLink } from "react-router-dom";

const category = {
  Top上衣: 1,
  Bottomd褲子: 2,
  Accessory飾品: 3,
};

const Menu = () => {
  return (
    <nav>
      {Object.keys(category).map((key) => (
        <NavLink key={key} to={`/productlist?item=0${category[key]}`}>
          {key}
        </NavLink>
      ))}
    </nav>
  );
};

// const fetchCategory = () => {};

export default Menu;
