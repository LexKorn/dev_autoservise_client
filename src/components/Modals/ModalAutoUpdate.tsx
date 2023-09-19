import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateAuto } from '../../http/autosAPI';
import { IAuto } from '../../types/types';
import CUAuto from '../CreateUpdate/CUAuto';

interface ModalAutoUpdateProps {
    show: boolean;
    onHide: () => void;
    auto: IAuto;
};


const ModalAutoUpdate: React.FC<ModalAutoUpdateProps> = ({show, onHide, auto}) => {
    const [year, setYear] = useState<number | undefined>(auto.year);
    const [vin, setVin] = useState<string | undefined>(auto.vin);
    const [stateNumber, setStateNumber] = useState<string>(auto.stateNumber);
    const [owner, setOwner] = useState<string>(auto.owner);
    const [phone, setPhone] = useState<string>(auto.phone);
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore
            size="md"
            centered
            >
            <Modal.Body>
                <CUAuto 
                    id={auto.id}
                    year={year}
                    vin={vin}
                    stateNumber={stateNumber}
                    owner={owner}
                    phone={phone}
                    setYear={setYear}
                    setVin={setVin}
                    setStateNumber={setStateNumber}
                    setOwner={setOwner}
                    setPhone={setPhone}
                    // @ts-ignore
                    handler={updateAuto}
                    title='Обновить автомобиль'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAutoUpdate;