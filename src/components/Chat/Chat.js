import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';
import { getClientInfo } from '../../actions';
import { Textarea, Button } from 'evergreen-ui';
import Messages from '../Messages/Messages';

const Chat = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const userInf = useSelector(state => state.userInfo);

    useEffect(() => {
        dispatch(getClientInfo());
    }, []);

    const keyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('chatMessage', name);
            setName('');
        }
    }

    const sendHandler = () => {
        socket.emit('chatMessage', name);
        setName('');
    };

    return (
        <div className="chat__container">
            <h1>Chat {userInf}</h1>
            <Messages />
            <Textarea
                name="textarea"
                value={name}
                onKeyDown={keyDown}
                placeholder="type your message..."
                onChange={e => setName(e.target.value)}
            />
            <Button
                onClick={() => sendHandler()}
                height="24"
                marginTop={20}
                appearance="primary"
                width="150px"
                justifyContent="center">Send</Button>
        </div>
    );
}

export default Chat;