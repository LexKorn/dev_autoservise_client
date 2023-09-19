import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { IOrder } from '../../types/types';
import List from '../List/List';
import ListItemOrder from '../ListItem/ListItemOrder';
import ModalOrderAdd from '../Modals/ModalOrderAdd';

import './orderList.sass';

// @ts-ignore
export default function OrderList2<T> ({title, orderItems}) {
    const [visible, setVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <Container className="activities">
            <div className="activities__title">
                <h3>{title}</h3>
                <i className="bi bi-plus-circle activities__title_icon" onClick={() => setVisible(true)}></i>
            </div>
            <List 
                items={orderItems}
                renderItem={(item: IOrder) => 
                    <ListItemOrder
                        onClick={(item) => navigate('/order/' + item.id)} 
                        item={item} 
                        key={item.id} 
                    />
                } 
            />
            <ModalOrderAdd
                show={visible} 
                onHide={() => setVisible(false)}
            />
        </Container> 
    );
};