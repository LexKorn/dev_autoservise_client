import { $authHost } from ".";

export const createModel = async (model: string) => {
    const {data} = await $authHost.post('api/models', {model});
    return data;
};

export const fetchModels = async () => {
    const {data} = await $authHost.get('api/models');
    return data;
};

export const fetchOneModel = async (id: number) => {
    const {data} = await $authHost.get('api/models/' + id);
    return data;
};

export const updateModel = async (id: number, model: string) => {
    const {data} = await $authHost.put('api/models/' + id, {model});
    return data;
};

export const deleteModel = async (model: string) => {
    const {data} = await $authHost.delete('api/models/' + model);
    return data;
};