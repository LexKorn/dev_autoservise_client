import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, Button, Form} from 'react-bootstrap';

import { createStamp, deleteStamp } from '../../http/stampsAPI';
import { createModel, deleteModel } from '../../http/modelsAPI';
import { createMaster, deleteMaster } from '../../http/mastersAPI';
import { ADD_AUTO_ROUTE } from '../../utils/consts';
import { IAuto, IStamp, IModel, IMaster, IOrder } from '../../types/types';
import { Context } from '../..';

interface ModalCommonProps {
    show: boolean;
    onHide: () => void;
    item: string;
};


const ModalCommon: React.FC<ModalCommonProps> = ({show, onHide, item}) => {
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();
    const {service} = useContext(Context);

    const addStamp = () => {
        if (!value.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        if (item === "stamp") {
            createStamp(value)
                .then(() => {
                    setValue('');
                    onHide();
                    navigate(ADD_AUTO_ROUTE);
                })
                .catch(err => alert(err.response.data.message));

        } else if (item === "model") {
            createModel(value)
                .then(() => {
                    setValue('');
                    onHide();
                    navigate(ADD_AUTO_ROUTE);
                })
                .catch(err => alert(err.response.data.message));  

        } else if (item === "master") {
            createMaster(value)
                .then(() => {
                    setValue('');
                    onHide();
                })
                .catch(err => alert(err.response.data.message));  
        }
    };

    const removeStamp = () => {
        if (!value.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        if (item === "stamp") {
            const stamps: IStamp[] = service.stamps.filter(stamp => stamp.stamp == value);
            if (stamps.length) {
                const autosStamp: IAuto[] = service.autos.filter(auto => auto.stampId == stamps[0].id);
                if (autosStamp.length) {
                    return alert('Марку нельзя удалить, пока на неё ссылается автомобиль');
                }
            }

            deleteStamp(value).then(() => {
                setValue('');
                onHide();
                navigate(ADD_AUTO_ROUTE);
            });

        } else if (item === "model") {
            const models: IModel[] = service.models.filter(model => model.model == value);
            if (models.length) {
                const autosModel: IAuto[] = service.autos.filter(auto => auto.modelId == models[0].id);
                if (autosModel.length) {
                    return alert('Модель нельзя удалить, пока на неё ссылается автомобиль');
                }
            }

            deleteModel(value).then(() => {
                setValue('');
                onHide();
                navigate(ADD_AUTO_ROUTE);
            });

        } else if (item === "master") {
            const masters: IMaster[] = service.masters.filter(master => master.master == value);
            if (masters.length) {
                const ordersMaster: IOrder[] = service.orders.filter(order => order.masterId == masters[0].id);
                if (ordersMaster.length) {
                    return alert('Мастера нельзя удалить, пока у него есть заказы');
                }
            }

            deleteMaster(value).then(() => {
                setValue('');
                onHide();
            });
        }
    };

    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore 
            size="md"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Выберите действие с {item === 'stamp' ? 'маркой' : item === 'model' ? 'моделью' : 'мастером'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        // @ts-ignore
                        onKeyPress={e => keyPress(e)}
                        placeholder={item === 'stamp' ? 'Введите название марки' : item === 'model' ? 'Введите название модели' : 'Введите мастера'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addStamp}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={removeStamp}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCommon;