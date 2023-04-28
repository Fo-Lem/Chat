import { $authHost } from "./index";
import { sendNewMessage } from "./wsApi";

export const createMessage = async (
    type,
    body,
    userId,
    chatId,
    user,
    socket
) => {
    body = body.replace("\n", "</br>");
    const { data } = await $authHost.post(`api/message/create`, {
        type,
        body,
        userId,
        chatId,
    });

    sendNewMessage(data, user, socket);

    return data.rows;
};
export const checkMessage = async (offset, limit, roomId) => {
    const { data } = await $authHost.get(
        `api/message/get?offset=${offset}&limit=${limit}&chatId=${roomId}`,
        {}
    );

    return data.rows;
};

export const checkCountMessage = async (chatId) => {
    const { data } = await $authHost.get(
        `api/message/get?chatId=${chatId}`,
        {}
    );

    return data.count;
};
