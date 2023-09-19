import React from 'react';
import {Container, Button, Form } from 'react-bootstrap';

interface CUItemProps {
    id: number;
    name: string;
    price: number;
    setName: (name: string) => void;
    setPrice: (price: number) => void;
    orderId: number;
    handler: (id: number, name: string, price: number, orderId: number) => Promise<unknown>;
    title: string;
    btnName: string;
    onHide: () => void;
};


const CUItem: React.FC<CUItemProps> = ({id, name, setName, price, setPrice, orderId, handler, title, btnName, onHide}) => {
    const onClick = () => {
        if (!name.trim() || !price) {
            return alert('Поля обязательны для заполнения');
        }

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(name, price, orderId)
                .then(() => {
                    setName('');
                    setPrice(0);
                    onHide();
                })
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, name, price, orderId)
                .then(() => {
                    setName('');
                    setPrice(0);
                    onHide();
                })
                .catch(err => alert(err.response.data.message));
        }
    };

    let toggle: boolean = false;

    if (title === 'Добавить работу' || title === 'Обновить работу') {
        toggle = true;
    }


    return (
        <Container className="d-flex flex-column justify-content-center">
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <Form>
                <label htmlFor="name" className="mt-3">{toggle ? 'Работа' : 'Запчасть'}</label> 
                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={toggle ? 'Введите название работы' : 'Введите название запчасти'}
                />
                <label htmlFor="name" className="mt-3">Стоимость</label> 
                <Form.Control
                    value={price}
                    type="number"
                    onChange={e => setPrice(+e.target.value)}
                    placeholder={toggle ? 'Введите стоимость работы' : 'Введите стоимость запчасти'}
                />
            </Form>
            <Button variant={"outline-dark"} onClick={onClick} className="mt-3" style={{width: 100}}>{btnName}</Button>
        </Container>
    );
};

export default CUItem;