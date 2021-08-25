import React from "react";
import {Folder, isFile} from "../../model";
import FileItem from "../FileItem/FileItem";
import {getPath} from "../../filesReducer";
import './FolderItem.css';

export type FolderProps = {
    folder: Folder;
    addFolderToPath: (path: string) => (name: string) => void;
}

export default function FolderItem({folder, addFolderToPath}: FolderProps) {

    const addSubFolder = (name: string) => addFolderToPath(getPath(folder))(name)

    return <div key={folder.name} className="FolderItem">
        <div className="folderHeader">
            <p>{folder.name}</p>
            <button onClick={() => addSubFolder('New Sub' + Math.random().toFixed(2))}>+</button>
        </div>
        <div className="folderChildren">
            {folder.children.map(child => isFile(child) ? <FileItem file={child} key={getPath(child)}/> :
                <FolderItem
                    key={getPath(child)}
                    folder={child as Folder}
                    addFolderToPath={addFolderToPath}
                />)}
        </div>
    </div>
}