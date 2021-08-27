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

    const content = useMemo(() => {
        if (activeFile && fileContent) {
                return fileContent.get(getPath(activeFile)) || '';
        }
        return '';
    }, [activeFile, fileContent])

    return <main className="MainWindow">
        <Tabs onSelectFile={selectFile} activeFile={activeFile} files={openFiles}/>
        <FileEditor file={activeFile} content={content} onEdit={saveFile}/>
    </main>;

}