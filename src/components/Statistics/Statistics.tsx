import React, {useState, useEffect, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import { Context } from '../..';
import {MAIN_ROUTE, AUTOS_ROUTE} from '../../utils/consts';

import './statistics.sass';


const Statistics: React.FC = observer(() => {
    const [quantityAutos, setQuantityAutos] = useState<number>(0);
    const [quantityOrders, setQuantityOrders] = useState<number>(0);
    const {service} = useContext(Context);

    useEffect(() => {
        setQuantityAutos(service.autos.length);
        setQuantityOrders(service.orders.length);
    }, [service.autos, service.orders]);

    return (
        <>
            <div className='statistics'>
                <div className='statistics__icons'>
                    <NavLink to={MAIN_ROUTE} className='statistics__icons_link'><i className="bi bi-gear"></i>{quantityOrders}</NavLink>
                    <NavLink to={AUTOS_ROUTE} className='statistics__icons_link'><i className="bi bi-car-front-fill"></i> {quantityAutos}</NavLink>
                </div>
            </div>
        </>
    );
});

export default Statistics;