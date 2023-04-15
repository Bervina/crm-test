import React from 'react';
import style from './NavBar.module.scss'
import Menu from '../Menu/Menu';
const NavBar = () => {
  return (
    <div className={style.NavBar}>
      <nav>
        <Menu/>
      </nav>
    </div>
  );
};

export default NavBar;
