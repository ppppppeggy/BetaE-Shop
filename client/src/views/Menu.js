import { NavLink } from "react-router-dom";

const category = {
  Top上衣: 1,
  Bottomd褲子: 2,
  Onepiece連身套裝: 3,
  Accessory飾品: 4,
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

export default Menu;
