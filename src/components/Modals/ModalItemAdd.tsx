import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import CUItem from '../CreateUpdate/CUItem';
import { createActivity } from '../../http/activitiesAPI';
import { createAutopart } from '../../http/autopartsAPI';

interface ModalItemAddProps {
    show: boolean;
    onHide: () => void;
    orderId: number;
    title: string;
};


const ModalItemAdd: React.FC<ModalItemAddProps> = ({show, onHide, orderId, title}) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    
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
                    id={0}
                    name={name}
                    price={price}
                    setName={setName}
                    setPrice={setPrice}
                    orderId={orderId}
                    // @ts-ignore
                    handler={title === 'Работы:' ? createActivity : createAutopart}
                    title={title === 'Работы:' ? 'Добавить работу' : 'Добавить запчасть'}
                    btnName='Добавить'
                    onHide={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalItemAdd;