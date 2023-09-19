import React from 'react';
import { Card } from 'react-bootstrap';

import { IAutopart, IActivity } from '../../types/types';
import { convertNumToStr } from '../../utils/calc';

import './listItem.sass';

interface ListItemProps {
    item: IAutopart | IActivity;
    onDelete: (item: IAutopart | IActivity) => void;
    onEdit: (item: IAutopart | IActivity) => void;
};


const ListItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    return (
        <Card 
            className="list-item shadow"
        >
            <div>
                <div>{item.name}</div>
                <div>{convertNumToStr(item.price)}p</div>
            </div>
            <div>
                <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
            </div>
        </Card>      
    );
};

export default ListItem;