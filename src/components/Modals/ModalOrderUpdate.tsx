import React, {useState} from 'react';

import { updateOrder } from '../../http/ordersAPI';
import { IOrder } from '../../types/types';
import CUOrder from '../CreateUpdate/CUOrder';

interface ModalOrderUpdateProps {
    show: boolean;
    onHide: () => void;
    order: IOrder;
};


const ModalOrderUpdate: React.FC<ModalOrderUpdateProps> = ({show, onHide, order}) => {
    const [opened, setOpened] = useState<string>(order.opened);
    const [closed, setClosed] = useState<string | undefined>(order.closed);
    const [income, setIncome] = useState<number | undefined>(order.income);
    const [comment, setComment] = useState<string | undefined>(order.comment);
    
    return (
        <CUOrder 
            id={order.id}
            opened={opened}
            closed={closed}
            income={income}
            comment={comment}
            setOpened={setOpened}
            setClosed={setClosed}
            setIncome={setIncome}
            setComment={setComment}
            // @ts-ignore
            handler={updateOrder}
            title='Обновить заказ'
            btnName='Обновить'
            show={show}
            onHide={onHide}
        />
    );
};

export default ModalOrderUpdate;