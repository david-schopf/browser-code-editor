import React, {useContext, useMemo} from "react";
import './MainWindow.css';
import Tabs from "../Tabs/Tabs";
import FileEditor from "../FileEditor/FileEditor";
import {FilesContext} from "../App";
import {dispatchSaveFile, dispatchSelectFile} from "../filesDispatch";
import {getPath} from "../filesFunctions";

export default function MainWindow() {
    const [{openFiles, activeFile, fileContent}, dispatch] = useContext(FilesContext);

    const selectFile = dispatchSelectFile(dispatch)
    const saveFile = dispatchSaveFile(dispatch)

    // Get content of currently active file
    const content = useMemo(() => {
        return (activeFile && fileContent && fileContent.get(getPath(activeFile))) || '';
    }, [activeFile, fileContent])

    return <main className="MainWindow">
        <Tabs onSelectFile={selectFile} activeFile={activeFile} files={openFiles}/>
        <FileEditor file={activeFile} content={content} onEdit={saveFile}/>
    </main>;

}