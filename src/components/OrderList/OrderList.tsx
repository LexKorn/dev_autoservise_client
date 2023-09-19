import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { IActivity, IAutopart } from '../../types/types';
import { deleteActivity } from '../../http/activitiesAPI';
import { deleteAutopart } from '../../http/autopartsAPI';
import { Context } from '../..';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import ModalItemAdd from '../Modals/ModalItemAdd';
import ModalItemUpdate from '../Modals/ModalItemUpdate';

import './orderList.sass';

// @ts-ignore
export default function OrderList<T> ({title, orderItems}) {
    const [activity, setActivity] = useState<IActivity>({} as IActivity);
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleActivity, setVisibleActivity] = useState<boolean>(false);
    const {id} = useParams();
    const {service} = useContext(Context);

    useEffect(() => {
        service.setToggle(!service.toggle);
    }, [visible, visibleActivity]);

    const removeItem = (item: IAutopart | IActivity) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            if (title === "Работы:") {
                deleteActivity(item.id);
            } else if (title === "Запчасти:") {
                deleteAutopart(item.id);
            }
            service.setToggle(!service.toggle);
        }
    };

    const editItem = (item: IAutopart | IActivity) => {
        setActivity(item);
        setVisible(true);
    };


    return (
        <Container className="activities">
            <div className="activities__title">
                <h3>{title}</h3>
                <i className="bi bi-plus-circle activities__title_icon" onClick={() => setVisibleActivity(true)}></i>
            </div>
            <List 
                items={orderItems}
                renderItem={(item: IAutopart | IActivity) => 
                    <ListItem 
                        onDelete={() => removeItem(item)} 
                        onEdit={() => editItem(item)}
                        item={item} 
                        key={item.id} 
                    />
                } 
            />
            <ModalItemAdd
                show={visibleActivity} 
                onHide={() => setVisibleActivity(false)} 
                orderId={Number(id)}
                title={title}
            />
            <ModalItemUpdate
                show={visible} 
                onHide={() => setVisible(false)} 
                orderId={Number(id)}
                activity={activity}
                title={title}
            />
        </Container> 
    );
};