import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from './Menu.module.scss';
import imgMenu from './menu-button-wide.svg';
import { NavLink } from 'react-router-dom';
import imgHome from './house-door-fill.svg';
import imgProfile from './person-square.svg';
import imgTravel from './bus-front-fill.svg';
import imgLogOut from './box-arrow-right.svg';
import imgAdmin from './person-fill-gear.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Admin from '../AdminPage/Admin';

const Menu = ({ set }) => {
    const uid = auth.currentUser.uid;
    const uidAdmin = 'G4dZuHvlW4f7O1XCaPxd4ctNvnN2';
    const [show, setShow] = useState(true);

    const navMenu = [
      {
        title: 'Home',
        url: '/',
        img: imgHome,
      },
      {
        title: 'Profile',
        url: '/profile',
        img: imgProfile,
      },
      {
        title: 'Travel',
        url: '/travel',
        img: imgTravel,
      },
    ];
    if (uid === uidAdmin) {
      navMenu.push({
        title: 'Admin',
        url: '/admin',
        img: imgAdmin,
      });
    }

    const userSignOut = () => {
      signOut(auth)
        .then(() => console.log('sign out'))
        .catch(error => console.log(error));
    };
    const menuIsOpenedCallback = () => {
      setShow(!show);
    };

    const menuWidth = show ? '300px' : '80px';

    return (
      <Offcanvas style={{ width: menuWidth }} className={style.menu} show={true} backdrop={false} scroll={true}>
        <Button variant={'default'} onClick={menuIsOpenedCallback}>
          <img className={style.imgMenu} src={imgMenu} alt="Button"/>
        </Button>
        <nav className={style.navBlock}>
          <div>
            {navMenu.map((element, index) => {
              return (
                <NavLink key={index} to={element.url}
                         className={({ isActive }) => isActive ? style.activeNavLink : style.navLink}>
                  <div><img className={style.imgNav} src={element.img} alt=""/></div>
                  {show ? <p className={style.navTitle}>{element.title}</p> : null}
                </NavLink>
              );
            })}
          </div>
          <button onClick={userSignOut} className={style.logOut}><img className={style.imgNav} src={imgLogOut}
                                                                      alt=""/>{show ?
            <p className={style.navTitle}>LogOut</p> : null}
          </button>
        </nav>
      </Offcanvas>
    );
  }
;

export default Menu;
