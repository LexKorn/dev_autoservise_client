import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import AutoItem from '../components/AutoItem/AutoItem';
import Statistics from '../components/Statistics/Statistics';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import Pageup from '../components/Pageup/Pageup';
import { IAuto } from '../types/types';
import { Context } from '../index';
import { fetchAutos } from '../http/autosAPI';
import { fetchStamps } from '../http/stampsAPI';
import { fetchModels } from '../http/modelsAPI';
import { fetchOrders } from '../http/ordersAPI';


const AutosPage: React.FC = observer(() => {
    const {service} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAutos()
            .then(data => service.setAutos(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));

        fetchStamps()
            .then(data => service.setStamps(data))
            .catch(err => alert(err.message));

        fetchModels()
            .then(data => service.setModels(data))
            .catch(err => alert(err.message));

        fetchOrders()
            .then(data => service.setOrders(data))
            .catch(err => alert(err.message))
    }, []);
    

    return (
        <Container
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <Helmet>
                <title>Список автомобилей</title>
                <meta name="description" content="Список автомобилей" />
            </Helmet>

            <Statistics />
            <SearchPanel autos={service.autos} stamps={service.stamps} models={service.models} />
            <h1 style={{textAlign: 'center'}}>Список автомобилей:</h1>
            {loading ? <Spinner animation={"border"}/> :
                <List
                    items={service.visibleAutos} 
                    renderItem={(auto: IAuto) => 
                        <AutoItem 
                            onClick={(auto) => navigate('/auto/' + auto.id)} 
                            auto={auto}
                            key={auto.id} 
                        />
                    } 
                />
            }
            <Pageup />
        </Container>
    );
});

export default AutosPage;