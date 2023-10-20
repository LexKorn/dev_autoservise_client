import React, {useState, useEffect, useContext} from 'react';
import {Dropdown} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { IAuto, IOrder, IStamp, IModel, IMaster } from '../../types/types';
import { fetchAutos } from '../../http/autosAPI';
import { Context } from '../../index';

import './searchPanel.sass';

interface SearchPanelOrdersProps {
    orders: IOrder[];
    stamps: IStamp[];
    models: IModel[];
};


const SearchPanelOrders: React.FC<SearchPanelOrdersProps> = observer(({orders, stamps, models}) => { 
    const {service} = useContext(Context);
    const [autos, setAutos] = useState<IAuto[]>([]);
    const [directionSort, setDirectionSort] = useState<boolean>(true);
    const [condition, setCondition] = useState<string>('createdAt');
    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('All');
    const [filMast, setFilMast] = useState<IMaster>({} as IMaster);

    useEffect(() => {
        fetchAutos()
            .then(data => setAutos(data))
            .catch(err => alert(err.message));
    }, []);

    useEffect(() => {
        service.setVisibleOrders(sortHandler(filterMaster(filterClosed(search(orders, value), filter))));
    }, [value, directionSort, filter, orders, filMast]);

    function search(items: (IOrder)[], term: string) {   
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            const orderAuto: IAuto[] = autos.filter(auto => auto.id === item.autoId);

            return (
                stamps.filter(stamp => stamp.id === orderAuto[0].stampId)[0].stamp.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                models.filter(model => model.id === orderAuto[0].modelId)[0].model.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        }); 
    };

    function sortHandler(items: IOrder[]) {
        let sortElems: IOrder[] = [];
  
        if (directionSort) {
            sortElems = [...items].sort((a, b) => {
                // @ts-ignore
                return a[condition] < b[condition] ? 1 : -1;
            });
        } else {
            sortElems = [...items].sort((a, b) => {
                // @ts-ignore
                return a[condition] > b[condition] ? 1 : -1;
            });
        }
        return sortElems;
    };

    function filterClosed(items: IOrder[], filter: string) {
        switch (filter) {
            case 'closed':
                return items.filter(item => item.closed);
            case 'no-closed':
                return items.filter(item => !item.closed);
            case 'All':
                return items;
            default:
                return items;
        }
    };

    function filterMaster(items: IOrder[]) {
        if (filMast.id) {
            return items.filter(item => item.masterId === filMast.id);
        } else {
            return items;
        }
    };

    const sortDate = () => {
        setDirectionSort(!directionSort);
        setCondition('createdAt');
    };


    return (
        <>  
            <div className='sort'>
                <div className="sort__btns">
                    <button className='sort__btn' onClick={sortDate}>Время добавления</button>

                    <button className='sort__btn' onClick={() => setFilter('closed')}>закрыт</button>
                    <button className='sort__btn' onClick={() => setFilter('no-closed')}>не закрыт</button>
                    <button className='sort__btn' onClick={() => setFilter('All')}>Все</button>

                    <Dropdown>
                        <Dropdown.Toggle variant={"outline-dark"}>{filMast.master || 'Мастер'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {service.masters.map(master => 
                                <Dropdown.Item 
                                    onClick={() => setFilMast(master)} 
                                    key={master.id} >
                                        {master.master}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => setFilMast({} as IMaster)} >Все</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>  
                </div>                
            </div>
            <div className='search'>
                <input 
                    className='search__input' 
                    type='text' 
                    placeholder='Начните вводить марку или модель' 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />            
                {Boolean(value) && <i className="bi bi-x-circle search__icon" onClick={() => setValue('')}></i>}
            </div>
        </>
    );
});

export default SearchPanelOrders;