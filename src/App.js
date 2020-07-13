import React from 'react';
import Main from './components/Main';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {BrowserRouter} from 'react-router-dom';

const store = ConfigureStore();

function App(props){
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;