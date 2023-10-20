import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IAuto, IStamp, IModel } from '../../types/types';
import { AUTOS_ROUTE, NOTFOUND_ROUTE } from '../../utils/consts';
import { deleteAuto, fetchOneAuto } from '../../http/autosAPI';
import { fetchOneStamp } from '../../http/stampsAPI';
import { fetchOneModel } from '../../http/modelsAPI';
import { fetchOrders } from '../../http/ordersAPI';
import {Context} from '../../index';
import ModalAutoUpdate from '../Modals/ModalAutoUpdate';

import './autoBlock.sass';


const AutoBlock: React.FunctionComponent = () => {
    const {service} = useContext(Context);
    const [auto, setAuto] = useState<IAuto>({} as IAuto);
    const [stamp, setStamp] = useState<IStamp>({} as IStamp);
    const [model, setModel] = useState<IModel>({} as IModel);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneAuto(Number(id)).then(data => setAuto(data));
        // @ts-ignore
        fetchOrders().then(data => setQuantity(data.filter(item => item.autoId === Number(id)).length));
    }, []);

    useEffect(() => {
        if (auto.id) {
            fetchOneStamp(auto.stampId).then(data => setStamp(data));
            fetchOneModel(auto.modelId).then(data => {
                setModel(data);
            });
        }
    }, [auto]);

    useEffect(() => {
        if (stamp.id && model.id) {
            setLoading(false);
            service.setSelectedStamp(stamp);
            service.setSelectedModel(model);
        }
    }, [stamp, model]);

    const removeAuto = () => {
        if (window.confirm('Вы действительно хотите удалить автомобиль? Все заказы, связанные с ним, будут удалены.')) {
            deleteAuto(auto.id);
            navigate(AUTOS_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <div>
            <Helmet>
                <title>{`${stamp.stamp} ${model.model}`}</title>
                <meta name="description" content={`Страничка ${stamp.stamp} ${model.model}`} />
            </Helmet>

            <div className="auto">
                    <div className="auto__name">{`${stamp.stamp} ${model.model} ${auto.year ? auto.year : ''}`}</div>
                    <div className="auto__description">гос.номер: <span>{auto.stateNumber}</span></div>
                    {auto.vin && <div className="auto__description">VIN: <span>{auto.vin}</span></div>}
                    <div className="auto__description">владелец: <span>{auto.owner}</span></div>
                    <div className="auto__description">телефон: <span>{auto.phone}</span></div>
                    <div className="auto__description">количество заказов: <span>{quantity}</span></div>
                    <Button className="auto__button" variant={"outline-primary"} onClick={() => setVisible(true)}>Редактировать</Button>
                    <Button className="auto__button" variant={"outline-danger"} onClick={removeAuto}>Удалить</Button>
            </div>

            <ModalAutoUpdate
                show={visible} 
                onHide={() => setVisible(false)} 
                auto={auto}
            />
        </div>
    );
};

export default AutoBlock;