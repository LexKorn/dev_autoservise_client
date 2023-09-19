import React, { useState } from 'react';
import {Helmet} from "react-helmet";

import CUAuto from '../components/CreateUpdate/CUAuto';
import { createAuto } from '../http/autosAPI';

const AddAutoPage: React.FC = () => {
    const [stamp, setStamp] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<number>(2000);
    const [vin, setVin] = useState<string>('');
    const [stateNumber, setStateNumber] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    
    return (
        <div style={{marginTop: '60px'}}>
            <Helmet>
                <title>Добавить автомобиль</title>
                <meta name="description" content="Добавить автомобиль" />
            </Helmet>
            
            <CUAuto 
                id={0}
                stamp={stamp}
                model={model}
                year={year}
                vin={vin}
                stateNumber={stateNumber}
                owner={owner}
                phone={phone}
                setStamp={setStamp}
                setModel={setModel}
                setYear={setYear}
                setVin={setVin}
                setStateNumber={setStateNumber}
                setOwner={setOwner}
                setPhone={setPhone}
                // @ts-ignore
                handler={createAuto}
                title='Добавить автомобиль'
                btnName='Добавить'
            />
        </div>
    );
};

export default AddAutoPage;