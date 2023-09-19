import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { MAIN_ROUTE, ADD_AUTO_ROUTE, AUTOS_ROUTE, CALC_ROUTE } from "../../utils/consts";
import { Context } from '../../index';

import './header.sass';


const Header: React.FC = () => {
    const location = useLocation();
    const [classMenu, setClassMenu] = useState<string>('');
    const {user} = useContext(Context);

    useEffect(() => {
        setClassMenu('');
    }, [location.pathname]);

    const menuHandler = () => {
        classMenu === '' ? setClassMenu('open-menu') : setClassMenu('');
    };

    const logOut = () => {
        user.setIsAuth(false);
        localStorage.clear();
    };

    return (
        <>
            {user.isAuth ?
                <div className='header'>
                    <div className={"header__menu-burger" + ' ' + classMenu} onClick={() => menuHandler()}>
                        <span></span>
                    </div>

                    <nav className={'header__nav' + ' ' + classMenu}>
                        <ul className="header__menu">
                            <li className="header__menu_item">
                                <NavLink to={MAIN_ROUTE} className={location.pathname === MAIN_ROUTE ? "active" : ''} >
                                    ЗАКАЗЫ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={AUTOS_ROUTE} className={location.pathname === AUTOS_ROUTE ? "active" : ''} >
                                    АВТОМОБИЛИ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={ADD_AUTO_ROUTE} className={location.pathname === ADD_AUTO_ROUTE ? "active" : ''} >
                                    Добавить авто
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={CALC_ROUTE} className={location.pathname === CALC_ROUTE ? "active" : ''} >
                                    Калькулятор
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <Button 
                                    variant={"outline-secondary"} 
                                    onClick={() => logOut()} 
                                    className="ms-2 nav-btn"
                                    >Выйти
                                </Button> 
                            </li>
                        </ul>
                    </nav>
                </div>
            :
                <div></div>
            }
        </>
    );
};

export default Header;