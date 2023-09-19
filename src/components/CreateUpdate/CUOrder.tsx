import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown, Modal} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';
import { fetchMasters } from '../../http/mastersAPI';
import {MAIN_ROUTE} from '../../utils/consts';
import ModalCommon from '../Modals/ModalCommon';

interface CUOrderProps {
    id: number;
    opened: string;
    closed?: string;
    income?: number;
    comment?: string;
    autoId: number;
    setOpened: (opened: string) => void;
    setClosed: (closed: string) => void;
    setIncome: (income: number) => void;
    setComment: (comment: string) => void;
    handler: (opened: string, closed: string | undefined, income: number | undefined, comment: string | undefined, autoId: number, masterId: number) => Promise<unknown>;
    title: string;
    btnName: string;
    show: boolean;
    onHide: () => void;
};


const CUOrder: React.FC<CUOrderProps> = observer(({id, opened, closed, income, comment, autoId, setOpened, setClosed,  setIncome, setComment, handler, title, btnName, show, onHide}) => {
    const {service} = useContext(Context);
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    const [item, setItem] = useState<string>('');

    useEffect(() => {
        fetchMasters().then(data => service.setMasters(data));
    }, [visible]);

    const onClick = () => {
        if (!opened.trim()) {
            return alert('Дата открытия заказа обязательна для заполнения');
        }

        if (!service.selectedMaster.id) {
            return alert('Мастера необходимо указать');
        }

        if (btnName === 'Добавить') {
            handler(opened, closed, income, comment, autoId, service.selectedMaster.id)
                .then(() => navigate(MAIN_ROUTE))
                .catch(err => alert(err.response.data.message));
        } else {
            // @ts-ignore 
            handler(id, opened, closed, income, comment, autoId, service.selectedMaster.id)
                .then(() => navigate(MAIN_ROUTE))
                .catch(err => alert(err.response.data.message));
        }
    };

    const showMaster = () => {
        setVisible(true);
        setItem('master');
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore
            size="md"
            centered
            >
            <Modal.Body>
                <Container className="d-flex justify-content-center">
                    <div>
                        <h1>{title}</h1>
                        <Form>
                            <label htmlFor="opened" className="mt-3">Открытие</label> 
                            <Form.Control
                                type="date"
                                value={opened}
                                onChange={e => setOpened(e.target.value)}
                                placeholder="Когда открыт заказ"
                            />
                            <label htmlFor="closed" className="mt-3">Закрытие</label> 
                            <Form.Control
                                type="date"
                                value={closed}
                                onChange={e => setClosed(e.target.value)}
                                placeholder="Когда закрыт заказ"
                            />
                            <Dropdown className="mt-3 mb-3">
                                <Dropdown.Toggle variant={"outline-dark"}>{service.selectedMaster.master || 'Мастер'}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {service.masters.map(master => 
                                        <Dropdown.Item 
                                            onClick={() => service.setSelectedMaster(master)} 
                                            key={master.id} >
                                                {master.master}
                                        </Dropdown.Item>                                
                                    )}
                                    <Dropdown.Item onClick={showMaster} >Добавить / удалить мастера</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <label htmlFor="income" className="mt-3">Оплачено</label> 
                            <Form.Control
                                value={income}
                                type="number"
                                onChange={e => setIncome(+e.target.value)}
                                placeholder="Оплачено"
                            />
                            <label htmlFor="comment" className="mt-3">Комментарий</label> 
                            <Form.Control as="textarea"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Комментарий"
                                maxLength={700}
                            />       
                        </Form>
                        <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
                    </div>
                    <ModalCommon show={visible} onHide={() => setVisible(false)} item={item} />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
        
    );
});

export default CUOrder;