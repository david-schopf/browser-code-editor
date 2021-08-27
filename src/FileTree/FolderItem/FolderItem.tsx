import React from "react";
import {File, Folder, isFolder} from "../../filesModel";
import FileItem from "../FileItem/FileItem";
import './FolderItem.css';
import {getPath} from "../../filesFunctions";

export type FolderProps = {
    folder: Folder;
    onCreateFolder: (path: string) => void;
    onCreateFile: (path: string) => void;
    onClickFile: (file: File) => void;
    onDelete: (file: File) => void;
}

export default function FolderItem({folder, onCreateFolder, onCreateFile, onClickFile, onDelete}: FolderProps) {

    return <div key={folder.name} className="FolderItem">
        <div className="folderHeader">
            <p>{folder.name}</p>
            <p onClick={() => onDelete(folder)}>X</p>
            <button onClick={() => onCreateFolder(getPath(folder))}>DIR</button>
            <button onClick={() => onCreateFile(getPath(folder))}>FILE</button>
        </div>
        <div className="folderChildren">
            {folder.children
                .sort((c1, c2) => isFolder(c1) ? -1 : +1)
                .map(child => isFolder(child) ? <FolderItem
                    key={getPath(child)}
                    folder={child as Folder}
                    onCreateFolder={onCreateFolder}
                    onCreateFile={onCreateFile}
                    onClickFile={onClickFile}
                    onDelete={onDelete}
                /> : <FileItem file={child} key={getPath(child)} onClickFile={onClickFile} onDelete={onDelete}/>)}
        </div>
    </div>
}