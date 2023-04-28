import { $authHost } from "./index";
import { subscribe } from "./subscribeApi";
import { createChat } from "./wsApi";

export const createRoom = async (name, userId, user, socket) => {
    //console.log(user)
    const { data } = await $authHost.post(`api/room/create`, { name, userId });
    console.log(data)
    createChat(data.id, user, socket);
    subscribe(data.id,user.id,user,socket)
    return data;
};

export const checkRoom = async (offset, limit, userId) => {
    //console.log(offset,limit)
    const { data } = await $authHost.get(
        `api/room/get?offset=${offset}&limit=${limit}&userId=${userId}`,
        {}
    );
    //console.log(data)
    return data.rows;
};

export const checkCountRoom = async (userId) => {
    const { data } = await $authHost.get(`api/room/get?userId=${userId}`, {});

    return data.count;
};
