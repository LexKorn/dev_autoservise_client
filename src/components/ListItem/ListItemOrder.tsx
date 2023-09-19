import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';

import { IOrder, IActivity, IMaster } from '../../types/types';

import { fetchActivities } from '../../http/activitiesAPI';
import { fetchMasters } from '../../http/mastersAPI';
import { trimString, textDate, convertNumToStr } from '../../utils/calc';

import './listItem.sass';

interface ListItemOrderProps {
    item: IOrder;
    onClick: (item: IOrder) => void;
};


const ListItemOrder: React.FC<ListItemOrderProps> = ({item, onClick}) => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [activitiesOrder, setActivitiesOrder] = useState<IActivity[]>([]);
    const [masters, setMasters] = useState<IMaster[]>([]);
    const [mastersOrder, setMastersOrder] = useState<IMaster[]>([]);

    useEffect(() => {
        fetchActivities().then(data => setActivities(data));
        fetchMasters().then(data => setMasters(data));
    }, []);

    useEffect(() => {
        setActivitiesOrder(activities.filter(activity => activity.orderId === item.id));
    }, [activities]);

    useEffect(() => {
        setMastersOrder(masters.filter(master => master.id === item.masterId));
    }, [masters]);

    return (
        <Card 
            className="list-item order-card shadow"
            onClick={() => onClick(item)}
            style={{border: Boolean(item.closed) ? '1px solid rgba(0, 0, 0, 0.175)' : '3px solid darkgrey'}}
        >
            <div className="order-card__common">
                <div className="order-card__date">
                    {/* @ts-ignore */}
                    {textDate(item.opened)} - {Boolean(item.closed) && textDate(item.closed)}
                </div>
                <div className="order-card__activity">
                    {Boolean(activitiesOrder.length) && trimString(activitiesOrder[0].name)}
                    {Boolean(activitiesOrder.length > 1) && <span> + ...</span>}
                </div>
                <div className="order-card__master">{mastersOrder.length ? mastersOrder[0].master : ''}</div>
            </div>
            {/* @ts-ignore */}
            {Boolean(item.income) && <div>{convertNumToStr(item.income)}р</div>}
        </Card>      
    );
};

export default ListItemOrder;