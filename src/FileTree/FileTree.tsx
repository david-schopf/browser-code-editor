import React, {useContext} from "react";
import {FilesContext} from "../App";
import FolderItem from "./FolderItem/FolderItem";
import {getPath} from "../filesReducer";
import {isFolder} from "../model";

export type FileTreeProps = {
    addFileToPath: (path: string) => (name: string) => void;
    addFolderToPath: (path: string) => (name: string) => void;
}

export default function FileTree({addFolderToPath, addFileToPath}: FileTreeProps) {

    const [{tree}] = useContext(FilesContext);

    return <div className="FileTree">
        {tree.children.filter(isFolder).map(folder =>
            <FolderItem
                key={getPath(folder)}
                addFolderToPath={addFolderToPath}
                folder={folder}
            />)}
    </div>
}