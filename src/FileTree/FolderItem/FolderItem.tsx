import React from "react";
import {File, Folder, isFolder} from "../../model";
import FileItem from "../FileItem/FileItem";
import {getPath} from "../../filesReducer";
import './FolderItem.css';

export type FolderProps = {
    folder: Folder;
    onCreateFolder: (path: string) => void;
    onCreateFile: (path: string) => void;
    onClickFile: (file: File) => void;
}

export default function FolderItem({folder, onCreateFolder, onCreateFile, onClickFile}: FolderProps) {

    return <div key={folder.name} className="FolderItem">
        <div className="folderHeader">
            <p>{folder.name}</p>
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
                /> : <FileItem file={child} key={getPath(child)} onClickFile={onClickFile}/>)}
        </div>
    </div>
}