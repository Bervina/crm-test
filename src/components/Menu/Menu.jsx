import React, { useState, useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './Menu.module.scss';
import imgMenu from './menu-button-wide.svg';
import { NavLink } from 'react-router-dom';
import ImgHome from './house-door-fill.svg';
import ImgProfile from './person-square.svg';
import ImgTravel from './bus-front-fill.svg';
import ImgLogOut from './box-arrow-right.svg';
import ImgAdmin from './person-fill-gear.svg';
import { ReactSVG } from 'react-svg';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLeftMenuState } from '../../store/general-slice';

const Menu = ({ leftMenuIsOpened }) => {
  const uid = auth.currentUser.uid;
  const uidAdmin = 'G4dZuHvlW4f7O1XCaPxd4ctNvnN2';
  const [show, setShow] = useState(true);

  const menuWidth = useMemo(() => {
    return leftMenuIsOpened ? '300px' : '65px';
  }, [leftMenuIsOpened]);

  const dispatch = useDispatch();

  const navMenu = [
    {
      title: 'Home',
      url: '/',
      img: ImgHome,
    },
    {
      title: 'Profile',
      url: '/profile',
      img: ImgProfile,
    },
    {
      title: 'Travel',
      url: '/travel',
      img: ImgTravel,
    },
  ];
  if (uid === uidAdmin) {
    navMenu.push({
      title: 'Admin',
      url: '/admin',
      img: ImgAdmin,
    });
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log('sign out'))
      .catch((error) => console.log(error));
  };

  const menuIsOpenedCallback = useCallback(() => {
    setShow(!show);
    dispatch(setLeftMenuState(!leftMenuIsOpened));
  }, [dispatch, leftMenuIsOpened, show]);

  return (
    <Offcanvas
      className={style.menu}
      show={true}
      backdrop={false}
      scroll={true}
      style={{ '--MENU_WIDTH': menuWidth }}
    >
      <Button
        className={style.buttonOpen}
        variant={'default'}
        onClick={menuIsOpenedCallback}
      >
        <img src={imgMenu} alt="imgMenu" className={style.imgMenu} />
      </Button>
      <nav className={style.navBlock}>
        <div>
          {navMenu.map((element, index) => {
            return (
              <NavLink
                key={index}
                to={element.url}
                className={({ isActive }) =>
                  isActive ? style.activeNavLink : style.navLink
                }
              >
                <ReactSVG src={element.img} />
                {show ? (
                  <p className={style.navTitle}>{element.title}</p>
                ) : null}
              </NavLink>
            );
          })}
        </div>
        <button onClick={userSignOut} className={style.logOut}>
          <ReactSVG src={ImgLogOut} />

          {show ? <p className={style.navTitle}>LogOut</p> : null}
        </button>
      </nav>
    </Offcanvas>
  );
};

Menu.propTypes = {
  leftMenuIsOpened: PropTypes.bool,
};
export default Menu;
