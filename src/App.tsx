import React, {useReducer} from 'react';
import './App.css';
import MainWindow from './MainWindow/MainWindow';
import Sidebar from "./Sidebar/Sidebar";
import filesReducer, {
    dispatchAddFileInPath,
    dispatchAddFolderInPath,
    FilesAction,
    FilesState,
    initialState
} from "./filesReducer";


export const FilesContext = React.createContext<[FilesState, React.Dispatch<FilesAction>]>([initialState, () => {
}]);

function App() {

    const [fileStore, dispatch] = useReducer(filesReducer, initialState)


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
