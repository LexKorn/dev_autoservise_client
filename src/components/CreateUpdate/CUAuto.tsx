import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';
import { IStamp, IModel } from '../../types/types';
import { fetchModels } from '../../http/modelsAPI';
import { fetchStamps } from '../../http/stampsAPI';
import { AUTOS_ROUTE } from '../../utils/consts';
import ModalCommon from '../Modals/ModalCommon';

interface CUAutoProps {
    id: number;
    year?: number;
    vin?: string;
    stateNumber: string;
    owner: string;
    phone: string;
    setYear: (year: number) => void;
    setVin: (vin: string) => void;
    setStateNumber: (stateNumber: string) => void;
    setOwner: (owner: string) => void;
    setPhone: (phone: string) => void;
    handler: (id: number, year: number | undefined, vin: string | undefined, stateNumber: string, owner: string, phone: string, stampId: number, modelId: number) => Promise<unknown>;
    title: string;
    btnName: string;
};


const CUAuto: React.FC<CUAutoProps> = observer(({id, year, vin, stateNumber, owner, phone, setYear, setVin, setStateNumber, setOwner, setPhone, handler, title, btnName}) => {
    const {service} = useContext(Context);
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    const [item, setItem] = useState<string>('');

    useEffect(() => {
        fetchStamps().then(data => service.setStamps(data));
        fetchModels().then(data => service.setModels(data));
    }, [visible]);


    const onClick = () => {
        if (!stateNumber.trim() || !owner.trim() || !phone.trim()) {
            return alert('Поля: гос.номер, владелец и телефон обязательны для заполнения');
        } else if (!service.selectedStamp.id) {
            return alert('Марку необходимо указать');        
        } else if (!service.selectedModel.id) {
            return alert('Модель необходимо указать');        
        }

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(year, vin, stateNumber, owner, phone, service.selectedStamp.id, service.selectedModel.id)
                .then(() => {
                    service.setSelectedStamp({} as IStamp);
                    service.setSelectedModel({} as IModel);
                    navigate(AUTOS_ROUTE);
                })
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, year, vin, stateNumber, owner, phone, service.selectedStamp.id, service.selectedModel.id)
                .then(() => {
                    service.setSelectedStamp({} as IStamp);
                    service.setSelectedModel({} as IModel);
                    navigate(AUTOS_ROUTE);
                })
                .catch(err => alert(err.response.data.message));
        }
    };

    const showStamp = () => {
        setVisible(true);
        setItem('stamp');
    };

    const showModel = () => {
        setVisible(true);
        setItem('model');
    };


    return (
        <Container className="d-flex justify-content-center">
            <div>
                <h1>{title}</h1>
                <Form>
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle variant={"outline-dark"}>{service.selectedStamp.stamp || 'Марка'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {service.stamps.map(stamp => 
                                <Dropdown.Item 
                                    onClick={() => service.setSelectedStamp(stamp)} 
                                    key={stamp.id} >
                                        {stamp.stamp}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={showStamp} >Добавить / удалить марку</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>  
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle variant={"outline-dark"}>{service.selectedModel.model || 'Модель'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {service.models.map(model => 
                                <Dropdown.Item 
                                    onClick={() => service.setSelectedModel(model)} 
                                    key={model.id} >
                                        {model.model}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={showModel} >Добавить / удалить модель</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <label htmlFor="year" className="mt-2">Год выпуска</label> 
                    <Form.Control
                        value={year}
                        type="number"
                        onChange={e => setYear(+e.target.value)}
                        placeholder="Год выпуска"
                    />
                    <label htmlFor="vin" className="mt-3">VIN номер</label> 
                    <Form.Control
                        value={vin}
                        onChange={e => setVin(e.target.value)}
                        placeholder="VIN номер"
                    /> 
                    <label htmlFor="stateNumber" className="mt-3">гос.номер</label> 
                    <Form.Control
                        value={stateNumber}
                        onChange={e => setStateNumber(e.target.value)}
                        placeholder="гос.номер"
                    />
                    <label htmlFor="owner" className="mt-3">Владелец</label> 
                    <Form.Control
                        value={owner}
                        onChange={e => setOwner(e.target.value)}
                        placeholder="Владелец"
                    />    
                    <label htmlFor="phone" className="mt-3">Телефон</label> 
                    <Form.Control
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Телефон владельца"
                    />        
                </Form>
                <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>   
            <ModalCommon show={visible} onHide={() => setVisible(false)} item={item} />
        </Container>
    );
});

export default CUAuto;