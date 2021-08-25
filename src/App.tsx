import React, {useEffect, useReducer} from 'react';
import './App.css';
import MainWindow from './MainWindow/MainWindow';
import Sidebar from "./Sidebar/Sidebar";
import filesReducer, {FilesAction, FilesState} from "./filesReducer";


const initialState = {folders: []};

export const FilesContext = React.createContext<[FilesState, React.Dispatch<FilesAction>]>([initialState, () => {
}]);

function App() {

    const [fileStore, dispatch] = useReducer(filesReducer, initialState)

    useEffect(() => {
        dispatch({name: 'ADD_FOLDER', payload: {name: 'NewFolder', inPath: '/'}})
        dispatch({name: 'ADD_FILE', payload: {name: 'NewFile', inPath: '/NewFolder/'}})
    }, []);

    return (
        <div className="App">
            <FilesContext.Provider value={[fileStore, dispatch]}>
                <Sidebar/>
                <MainWindow/>
            </FilesContext.Provider>
        </div>
    );
}

export default App;
