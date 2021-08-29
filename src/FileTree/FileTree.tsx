import React, {useContext} from "react";
import {FilesContext} from "../App";
import FolderItem from "./FolderItem/FolderItem";
import {dispatchDeleteNode, dispatchOpenFile} from "../filesDispatch";

export type FileTreeProps = {
    onCreateFile: (path: string) => void;
    onCreateFolder: (path: string) => void;
}

export default function FileTree({onCreateFolder, onCreateFile}: FileTreeProps) {

    const [{tree}, dispatch] = useContext(FilesContext);

    const openFile = dispatchOpenFile(dispatch);
    const deleteNode = dispatchDeleteNode(dispatch)

    return <FolderItem folder={tree}
                       onCreateFolder={onCreateFolder}
                       onCreateFile={onCreateFile}
                       onClickFile={openFile}
                       onDelete={deleteNode}
                       isRoot={true}
    />
}