import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import OrderItem from '../components/OrderItem/OrderItem';
import Statistics from '../components/Statistics/Statistics';
import SearchPanelOrders from '../components/SearchPanel/SearchPanelOrders';
import Pageup from '../components/Pageup/Pageup';
import { IOrder } from '../types/types';
import { Context } from '../index';
import { fetchOrders } from '../http/ordersAPI';
import { fetchStamps } from '../http/stampsAPI';
import { fetchModels } from '../http/modelsAPI';
import { fetchAutos } from '../http/autosAPI';
import { fetchMasters } from '../http/mastersAPI';
import { fetchActivities } from '../http/activitiesAPI';


const MainPage: React.FC = observer(() => {
    const {service} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders()
            .then(data => service.setOrders(data))
            .catch(err => alert(err.message))

        fetchStamps()
            .then(data => service.setStamps(data))
            .catch(err => alert(err.message));

        fetchModels()
            .then(data => service.setModels(data))
            .catch(err => alert(err.message));

        fetchAutos()
            .then(data => service.setAutos(data))
            .catch(err => alert(err.message));

        fetchMasters()
            .then(data => service.setMasters(data))
            .catch(err => alert(err.message));

        fetchActivities()
            .then(data => service.setActivities(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }, []);


    return (        
        <Container>
            <Helmet>
                <title>Список заказов</title>
                <meta name="description" content="Список заказов" />
            </Helmet>

            <Statistics />
            {/* @ts-ignore */}
            <SearchPanelOrders orders={service.orders} stamps={service.stamps} models={service.models} />
            <h1 style={{textAlign: 'center'}}>Список заказов:</h1>
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={service.visibleOrders} 
                    renderItem={(order: IOrder) => 
                        <OrderItem 
                            order={order} 
                            onClick={(order) => navigate('/order/' + order.id)}                         
                            key={order.id} 
                        />
                    } 
                />
            }
            <Pageup />
        </Container>
    );
});

export default MainPage;