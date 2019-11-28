export const reducer = (state = {}, action) => {

    if (action.type == 'USERS_MESSAGES') {
        state = {
            ...state,
            msgs: action.msgs
        };
    }

    if (action.type == 'USER_MESSAGE') {
        state = {
            ...state,
            msgs: state.msgs.concat(action.msg)
        };
    }

    if (action.type == 'USER_INFO') {
        state = {
            ...state,
            userInfo: action.userInfo.first
        };
    }

    return state;
};
