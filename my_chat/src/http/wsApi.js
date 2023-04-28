export const auth = (user, socket) => {
    socket.onopen = () => {
        socket.send(
            JSON.stringify({
                userId: user.id,
                method: "connection",
            })
        );
    };
    //console.log('ok')
};

export const sendNewMessage = (data, user, socket) => {
    socket.send(
        JSON.stringify({
            id: data.id,
            chatId: data.chatId,
            type: data.type,
            body: data.body,

            user: {
                id: user.id,
                name: user.name,
            },

            createdAt: data.createdAt,
            method: "message",
        })
    );
};

export const subscribeChat = (chatId, user, socket) => {
    socket.send(
        JSON.stringify({
            chatId: chatId,
            userId: user.id,
            method: "subscribe",
        })
    );
};

export const unsubscribeChat = (chatId, user, socket) => {
    socket.send(
        JSON.stringify({
            chatId: chatId,
            userId: user.id,
            method: "unsubscribe",
        })
    );
};
export const createChat = (chatId, user, socket) => {
    socket.send(
        JSON.stringify({
            chatId: chatId,
            userId: user.id,
            method: "create",
        })
    );
};
export const deleteChat = (data, user, socket) => {
    socket.send(
        JSON.stringify({
            chatId: data.chatId,
            method: "delete",
        })
    );
};
