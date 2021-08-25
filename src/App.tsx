import React from 'react';
import './App.css';
import MainWindow from './MainWindow/MainWindow';
import Sidebar from "./Sidebar/Sidebar";

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <MainWindow/>
        </div>
    );
}

export default App;
