import { $authHost } from ".";

export const createAuto = async (year: number, vin: string, stateNumber: string, owner: string, phone: string, stampId: number, modelId: number) => {
    const {data} = await $authHost.post('api/autos', {year, vin, stateNumber, owner, phone, stampId, modelId});
    return data;
};

export const fetchAutos = async () => {
    const {data} = await $authHost.get('api/autos');
    return data;
};

export const fetchOneAuto = async (id: number) => {
    const {data} = await $authHost.get('api/autos/' + id);
    return data;
};

export const updateAuto = async (id: number, year: number, vin: string, stateNumber: string, owner: string, phone: string, stampId: number, modelId: number) => {
    const {data} = await $authHost.put('api/autos/' + id, {year, vin, stateNumber, owner, phone, stampId, modelId});
    return data;
};

export const deleteAuto = async (id: number) => {
    const {data} = await $authHost.delete('api/autos/' + id);
    return data;
};