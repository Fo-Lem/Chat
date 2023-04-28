import { $authHost } from "./index";
import { subscribeChat,
     //unsubscribeChat
     } from "./wsApi";

export const subscribe = async (chatId, userId,user,socket) => {
    const { data } = await $authHost.post(`api/room/subscribe`, {
        userId,
        chatId,
    });
    console.log(chatId)
    console.log(`Вы подписаны на комнату № `+chatId)
    subscribeChat(chatId, user, socket);
    
    return data.rows;
};
export const unsubscribe = async (chatId, userId) => {
    const { data } = await $authHost.post(`api/room/unsubscribe`, {
        userId,
        chatId,
    });
    //unsubscribeChat(chatId, user, socket);
    return data.rows;
};
