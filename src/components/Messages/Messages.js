import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'evergreen-ui';

const Messages = ({ userInf }) => {
    const chatMessages = useSelector(
        state => state && state.msgs
    );

    return (
        <div className="messages__container">
            {chatMessages && chatMessages.map((message, i) => {
                return (
                    <Alert key={i}>
                        {message.message}
                    </Alert>
                );
            })}
        </div>
    );
}

export default Messages;