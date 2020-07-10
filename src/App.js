import React from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

function App(props){
    return(
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
    }

export default App;