import axios from './axios';

export function chatMessages(msgs) {
    return {
        type: 'USERS_MESSAGES',
        msgs: msgs
    };
}

export function chatMessage(msg) {
    return {
        type: 'USER_MESSAGE',
        msg: msg
    };
}

export async function getClientInfo() {
    const { data } = await axios.get('/user');
    return {
        type: 'USER_INFO',
        userInfo: data
    };
}