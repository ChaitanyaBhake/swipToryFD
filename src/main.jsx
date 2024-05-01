import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import Layout from "./components/common/Layout/Layout.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Layout>
                <App />
            </Layout>
        </Provider>
    </BrowserRouter>
);
