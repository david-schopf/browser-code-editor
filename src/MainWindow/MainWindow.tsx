import React, {useContext} from "react";
import './MainWindow.css';
import Tabs from "../Tabs/Tabs";
import FileEditor from "../FileEditor/FileEditor";
import {FilesContext} from "../App";
import {dispatchSaveFile, dispatchSelectFile, getPath} from "../filesReducer";

export default function MainWindow() {
    const [{openFiles, activeFile, fileContent}, dispatch] = useContext(FilesContext);

    const selectFile = dispatchSelectFile(dispatch)
    const saveFile = dispatchSaveFile(dispatch)

    const activeContent = activeFile ? fileContent.get(getPath(activeFile)) || '' : '' ;

    return <main className="MainWindow">
        <Tabs onSelectFile={selectFile} files={openFiles}/>
        <FileEditor file={activeFile}  content={activeContent} onEdit={saveFile}/>
    </main>;

}