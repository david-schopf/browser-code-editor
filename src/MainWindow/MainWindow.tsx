import React, {useContext} from "react";
import './MainWindow.css';
import Tabs from "../Tabs/Tabs";
import FileEditor from "../FileEditor/FileEditor";
import {FilesContext} from "../App";
import {dispatchSaveFile, dispatchSelectFile} from "../filesReducer";

export default function MainWindow() {
    const [{openFiles, activeFile}, dispatch] = useContext(FilesContext);

    const selectFile = dispatchSelectFile(dispatch)
    const saveFile = dispatchSaveFile(dispatch)

    return <main className="MainWindow">
        <Tabs onSelectFile={selectFile} files={openFiles}/>
        <FileEditor file={activeFile} onEdit={saveFile}/>
    </main>;

}