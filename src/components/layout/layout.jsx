import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import styles from './layout.module.scss';
import { useSelector } from 'react-redux';
import Header from '../header/header';

const Layout = ({ children }) => {
  const { leftMenuIsOpened } = useSelector((state) => state.general);

  const menuWidth = useMemo(() => {
    return leftMenuIsOpened ? '300px' : '65px';
  }, [leftMenuIsOpened]);

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <Menu leftMenuIsOpened={leftMenuIsOpened} />
      </aside>
      <div
        className={styles.contentContainer}
        style={{ '--MENU_WIDTH': menuWidth }}
      >
        <header className={styles.header}>
          <Header />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
