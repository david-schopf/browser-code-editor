import React, {useEffect, useReducer} from 'react';
import './App.css';
import MainWindow from './MainWindow/MainWindow';
import Sidebar from "./Sidebar/Sidebar";
import filesReducer, {
    FilesState,
    initialState
} from "./filesReducer";
import {loadStateFromLocalStorage, writeStateToLocalStorage} from "./storage";
import {dispatchAddFileInPath, dispatchAddFolderInPath} from "./filesDispatch";
import {FilesAction} from "./filesActions";


export const FilesContext = React.createContext<[FilesState, React.Dispatch<FilesAction>]>([initialState, () => {
}]);

function App() {

    const [fileStore, dispatch] = useReducer(filesReducer, initialState, loadStateFromLocalStorage)

    useEffect(() => {
        // Persist changes in local storage
        writeStateToLocalStorage(fileStore)
    }, [fileStore])

    const addFolderToPath = (path: string) => (name: string) => dispatchAddFolderInPath(dispatch)(path)(name);
    const addFileToPath = (path: string) => (name: string) => dispatchAddFileInPath(dispatch)(path)(name);

    return (
        <div className="App">
            <FilesContext.Provider value={[fileStore, dispatch]}>
                <Sidebar addFolderToPath={addFolderToPath} addFileToPath={addFileToPath}/>
                <MainWindow/>
            </FilesContext.Provider>
        </div>
    );
}

export default App;
