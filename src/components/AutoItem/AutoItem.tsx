import React, {useContext} from 'react';
import { Card } from 'react-bootstrap';

import { IAuto, IStamp, IModel } from '../../types/types';
import { Context } from '../../index';

import './autoItem.sass';

interface AutoItemProps {
    auto: IAuto;
    onClick: (auto: IAuto) => void;
};


const AutoItem: React.FC<AutoItemProps> = ({auto, onClick}) => {    
    const {service} = useContext(Context);
    const stampAuto: IStamp[] = service.stamps.filter(stamp => stamp.id === auto.stampId);
    const modelAuto: IModel[] = service.models.filter(model => model.id === auto.modelId);

    if (stampAuto.length && modelAuto.length) {
        return (
            <Card 
                className="auto-card shadow"
                onClick={() => onClick(auto)}
            >
                <div className="auto-card__auto" >{stampAuto[0].stamp} {modelAuto[0].model} {auto.stateNumber}</div>
                <div className="auto-card__owner" >{auto.owner}</div>
            </Card>
        );
    } else {
        return (
            <div></div>
        );
    }
};

export default AutoItem;