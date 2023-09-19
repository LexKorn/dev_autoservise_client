import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import { createOrder } from '../../http/ordersAPI';
import CUOrder from '../CreateUpdate/CUOrder';

interface ModalOrderAddProps {
    show: boolean;
    onHide: () => void;
};


const ModalOrderAdd: React.FC<ModalOrderAddProps> = ({show, onHide}) => {
    const [opened, setOpened] = useState<string>('');
    const [closed, setClosed] = useState<string | undefined>('');
    const [income, setIncome] = useState<number | undefined>(0);
    const [comment, setComment] = useState<string | undefined>('');
    const {id} = useParams<{id: string}>();
    
    return (
        <CUOrder 
            id={0}
            opened={opened}
            closed={closed}
            income={income}
            comment={comment}
            setOpened={setOpened}
            setClosed={setClosed}
            setIncome={setIncome}
            setComment={setComment}
            // @ts-ignore
            autoId={id}
            // @ts-ignore
            handler={createOrder}
            title='Добавить заказ'
            btnName='Добавить'
            show={show}
            onHide={onHide}
        />
    );
};

export default ModalOrderAdd;