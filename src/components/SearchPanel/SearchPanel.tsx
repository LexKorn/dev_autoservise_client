import React, {useState, useEffect, useContext} from 'react';

import { IAuto, IStamp, IModel } from '../../types/types';
import { Context } from '../../index';

import './searchPanel.sass';

interface SearchPanelProps {
    autos: IAuto[];
    stamps: IStamp[];
    models: IModel[];
};


const SearchPanel: React.FC<SearchPanelProps> = ({autos, stamps, models}) => { 
    const {service} = useContext(Context);
    const [directionSort, setDirectionSort] = useState<boolean>(true);
    const [condition, setCondition] = useState<string>('stampId');
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        service.setVisibleAutos(sortHandler(search(autos, value)));
    }, [value, directionSort, autos, condition]);


    function search(items: (IAuto)[], term: string) {   
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return (
                stamps.filter(stamp => stamp.id === item.stampId)[0].stamp.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                models.filter(model => model.id === item.modelId)[0].model.toLowerCase().indexOf(term.toLowerCase()) > -1 ||               
                item.stateNumber.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        }); 
    };


    function sortHandler(items: IAuto[]) {
        let sortElems: IAuto[] = [];
  
        if (directionSort) {
            sortElems = [...items].sort((a, b) => {
                // @ts-ignore
                return a[condition] > b[condition] ? 1 : -1;
            });
        } else {
            sortElems = [...items].sort((a, b) => {
                // @ts-ignore
                return a[condition] < b[condition] ? 1 : -1;
            });
        }
        return sortElems;
    };

    const sortStamp = () => {
        setDirectionSort(!directionSort);
        setCondition('stampId');
    };

    const sortDate = () => {
        setDirectionSort(!directionSort);
        setCondition('createdAt');
    };


    return (
        <>  
            <div className='sort'>
                <div className="sort__btns">
                    <button className='sort__btn' onClick={sortStamp}>Марка авто</button>
                    <button className='sort__btn' onClick={sortDate}>Время добавления</button>
                </div>                
            </div>
            <input 
                className='search' 
                type='text' 
                placeholder='Начните вводить марку, модель или гос.номер' 
                value={value}
                onChange={e => setValue(e.target.value)}
            />            
        </>
    );
};

export default SearchPanel;