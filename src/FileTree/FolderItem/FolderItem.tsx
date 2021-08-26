import React from "react";
import {Folder, isFile, isFolder} from "../../model";
import FileItem from "../FileItem/FileItem";
import {getPath} from "../../filesReducer";
import './FolderItem.css';

export type FolderProps = {
    folder: Folder;
    onCreateFolder: (path: string) => void;
    onCreateFile: (path: string) => void;
}

export default function FolderItem({folder, onCreateFolder, onCreateFile}: FolderProps) {

    return <div key={folder.name} className="FolderItem">
        <div className="folderHeader">
            <p>{folder.name}</p>
            <button onClick={() => onCreateFolder(getPath(folder))}>DIR</button>
            <button onClick={() => onCreateFile(getPath(folder))}>FILE</button>
        </div>
        <div className="folderChildren">
            {folder.children
                .sort((c1, c2) => isFolder(c1) ? -1 : +1)
                .map(child => isFile(child) ? <FileItem file={child} key={getPath(child)}/> :
                <FolderItem
                    key={getPath(child)}
                    folder={child as Folder}
                    onCreateFolder={onCreateFolder}
                    onCreateFile={onCreateFile}
                />)}
        </div>
    </div>
}