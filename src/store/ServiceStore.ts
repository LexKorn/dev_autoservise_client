import {makeAutoObservable} from 'mobx';

import { IAuto, IActivity, IOrder, IStamp, IModel, IMaster } from '../types/types';

export default class ServiceStore {
    _activities: IActivity[];
    _autos: IAuto[];
    _masters: IMaster[];
    _models: IModel[];
    _stamps: IStamp[];
    _orders: IOrder[];
    _selectedMaster: IMaster;
    _selectedModel: IModel;
    _selectedStamp: IStamp;
    _visibleAutos: IAuto[];
    _visibleOrders: IOrder[];
    _toggle: boolean;

    constructor() {
       this._activities = [];
       this._autos = [];
       this._masters = [];
       this._models = [];
       this._stamps = [];
       this._orders = [];
       this._selectedMaster = {} as IMaster;
       this._selectedModel = {} as IModel;
       this._selectedStamp = {} as IStamp;
       this._visibleAutos = [];
       this._visibleOrders = [];
       this._toggle = false;

       makeAutoObservable(this); 
    };

    setActivities(activities: IActivity[]) {
        this._activities = activities;
    };
    setAutos(autos: IAuto[]) {
        this._autos = autos;
    };
    setMasters(masters: IMaster[]) {
        this._masters = masters;
    };
    setModels(models: IModel[]) {
        this._models = models;
    };
    setStamps(stamps: IStamp[]) {
        this._stamps = stamps;
    };  
    setOrders(orders: IOrder[]) {
        this._orders = orders;
    };
    setSelectedMaster(master: IMaster) {
        this._selectedMaster = master;
    };
    setSelectedModel(model: IModel) {
        this._selectedModel = model;
    };
    setSelectedStamp(stamp: IStamp) {
        this._selectedStamp = stamp;
    };    
    setVisibleAutos(visibleAutos: IAuto[]) {
        this._visibleAutos = visibleAutos;
    };
    setVisibleOrders(visibleOrders: IOrder[]) {
        this._visibleOrders = visibleOrders;
    };
    setToggle(bool: boolean) {
        this._toggle = bool;
    }

    get activities() {
        return this._activities;
    };
    get autos() {
        return this._autos;
    };
    get masters() {
        return this._masters;
    };
    get models() {
        return this._models;
    };
    get stamps() {
        return this._stamps;
    };   
    get orders() {
        return this._orders;
    };
    get selectedMaster() {
        return this._selectedMaster;
    };
    get selectedModel() {
        return this._selectedModel;
    };
    get selectedStamp() {
        return this._selectedStamp;
    };    
    get visibleAutos() {
        return this._visibleAutos;
    };
    get visibleOrders() {
        return this._visibleOrders;
    };
    get toggle() {
        return this._toggle;
    }
};