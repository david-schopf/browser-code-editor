import React, {useContext, useMemo} from "react";
import './MainWindow.css';
import Tabs from "../Tabs/Tabs";
import FileEditor from "../FileEditor/FileEditor";
import {FilesContext} from "../App";
import {dispatchSaveFile, dispatchSelectFile, getPath} from "../filesReducer";

export default function MainWindow() {
    const [{openFiles, activeFile, fileContent}, dispatch] = useContext(FilesContext);

    const selectFile = dispatchSelectFile(dispatch)
    const saveFile = dispatchSaveFile(dispatch)

    const content = useMemo(() => {
        if (activeFile && fileContent) {
                return fileContent.get(getPath(activeFile)) || '';
        }
        return '';
    }, [activeFile, fileContent])

    return <main className="MainWindow">
        <Tabs onSelectFile={selectFile} files={openFiles}/>
        <FileEditor file={activeFile} content={content} onEdit={saveFile}/>
    </main>;

}