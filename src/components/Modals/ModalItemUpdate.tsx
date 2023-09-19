import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';

import CUItem from '../CreateUpdate/CUItem';
import { IActivity } from '../../types/types';
import { updateActivity } from '../../http/activitiesAPI';
import { updateAutopart } from '../../http/autopartsAPI';

interface ModalItemUpdateProps {
    show: boolean;
    onHide: () => void;
    orderId: number;
    activity: IActivity;
    title: string;
};


const ModalItemUpdate: React.FC<ModalItemUpdateProps> = ({show, onHide, orderId, activity, title}) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setName(activity.name);
        setPrice(activity.price);
    }, [show]);
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore
            size="md"
            centered
            >
            <Modal.Body>
                <CUItem 
                    id={activity.id}
                    name={name}
                    price={price}
                    setName={setName}
                    setPrice={setPrice}
                    orderId={orderId}
                    // @ts-ignore
                    handler={title === 'Работы:' ? updateActivity : updateAutopart}
                    title={title === 'Работы:' ? 'Обновить работу' : 'Обновить запчасть'}
                    btnName='Обновить'
                    onHide={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalItemUpdate;