import React, {useContext} from "react";
import {FilesContext} from "../App";
import FolderItem from "./FolderItem/FolderItem";
import {dispatchDeleteNode, dispatchOpenFile} from "../filesDispatch";
import {isFolder} from "../filesModel";
import {getPath} from "../filesFunctions";
import "./FileTree.css";
import {IconCreateFile, IconCreateFolder} from "./Icon";
import FileItem from "./FileItem/FileItem";

export type FileTreeProps = {
    onCreateFile: (path: string) => void;
    onCreateFolder: (path: string) => void;
}

export default function FileTree({onCreateFolder, onCreateFile}: FileTreeProps) {

    const [{tree}, dispatch] = useContext(FilesContext);

    const openFile = dispatchOpenFile(dispatch);
    const deleteNode = dispatchDeleteNode(dispatch)

    return <div className="FileTree">
        <div className="treeHeader">
            <h1>Files</h1>
            <button onClick={() => onCreateFolder(getPath(tree))}><IconCreateFolder/></button>
            <button onClick={() => onCreateFile(getPath(tree))}><IconCreateFile/></button>
        </div>
        <div className="treeChildren">
            {tree.children
                .map(node => isFolder(node) ?
                    <FolderItem
                        key={getPath(node)}
                        onCreateFolder={onCreateFolder}
                        onCreateFile={onCreateFile}
                        folder={node}
                        onClickFile={openFile}
                        onDelete={deleteNode}
                    /> :
                    <FileItem file={node} onClickFile={openFile} onDelete={deleteNode}/>
                )}
        </div>
    </div>
}