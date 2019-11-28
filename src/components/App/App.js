import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from '../Chat/Chat';

const App = () => {
    return (
        <div>
            <h1>App</h1>
            <BrowserRouter>
                <Route exact path="/" component={Chat} />
            </BrowserRouter>
        </div>
    );
}

export default App;