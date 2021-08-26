import React, {useContext} from "react";
import {FilesContext} from "../App";
import FolderItem from "./FolderItem/FolderItem";
import {dispatchOpenFile, getPath} from "../filesReducer";
import {isFolder} from "../model";

export type FileTreeProps = {
    onCreateFile: (path: string) => void;
    onCreateFolder: (path: string) => void;
}

export default function FileTree({onCreateFolder, onCreateFile}: FileTreeProps) {

    const [{tree}, dispatch] = useContext(FilesContext);

    const openFile = dispatchOpenFile(dispatch);

    return <div className="FileTree">
        <button onClick={() => onCreateFolder(getPath(tree))}>New folder</button>
        {tree.children
            .filter(isFolder)
            .map(folder =>
            <FolderItem
                key={getPath(folder)}
                onCreateFolder={onCreateFolder}
                onCreateFile={onCreateFile}
                folder={folder}
                onClickFile={openFile}
            />)}
    </div>
}