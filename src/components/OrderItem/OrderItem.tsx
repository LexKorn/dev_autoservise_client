import React, {useContext, useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { IAuto, IOrder, IActivity, IStamp, IModel, IMaster } from '../../types/types';
import { Context } from '../../index';
import {textDate, trimString, convertNumToStr} from '../../utils/calc';

import './orderItem.sass';

interface OrderItemProps {
    order: IOrder;
    onClick: (order: IOrder) => void;
};


const OrderItem: React.FC<OrderItemProps> = observer(({order, onClick}) => {    
    const {service} = useContext(Context);
    const [modelAuto, setModelAuto] = useState<IModel[]>([]);
    const [stampAuto, setStampAuto] = useState<IStamp[]>([]);
    const [autoOrder, setAutoOrder] = useState<IAuto[]>([]);
    const [mastersOrder, setMastersOrder] = useState<IMaster[]>([]);
    const [activitiesOrder, setActivitiesOrder] = useState<IActivity[]>([]);

    useEffect(() => {
        setAutoOrder(service.autos.filter(auto => auto.id === order.autoId));
        setActivitiesOrder(service.activities.filter(activity => activity.orderId === order.id));
    }, []);

    useEffect(() => {
        setMastersOrder(service.masters.filter(master => master.id === order.masterId));
    }, []);

    useEffect(() => {
        if (autoOrder.length) {
            setModelAuto(service.models.filter(model => model.id === autoOrder[0].modelId));
            setStampAuto(service.stamps.filter(stamp => stamp.id === autoOrder[0].stampId));
        }
    }, [autoOrder]);


    return (
        <Card 
            className="order-card shadow"
            onClick={() => onClick(order)}
            style={{border: Boolean(order.closed) ? '1px solid rgba(0, 0, 0, 0.175)' : '3px solid darkgrey'}}
        >
            <div className="order-card__common">
                <div className="order-card__date">
                    {/* @ts-ignore */}
                    {textDate(order.opened)} - {Boolean(order.closed) && textDate(order.closed)}
                </div>
                <div className="order-card__auto">{Boolean(stampAuto.length) && stampAuto[0].stamp} {Boolean(modelAuto.length) && modelAuto[0].model}</div>
                <div className="order-card__activity">
                    {Boolean(activitiesOrder.length) && trimString(activitiesOrder[0].name)}
                    {Boolean(activitiesOrder.length > 1) && <span> + ...</span>}
                </div>
                <div className="order-card__master">{mastersOrder.length ? mastersOrder[0].master : ''}</div>
            </div>
            {/* @ts-ignore */}
            {Boolean(order.income) && <div>{convertNumToStr(order.income)}р</div>}
        </Card>
    );
});

export default OrderItem;