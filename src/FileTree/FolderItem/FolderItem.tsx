import React from "react";
import {File, Folder, isFolder} from "../../filesModel";
import FileItem from "../FileItem/FileItem";
import './FolderItem.css';
import {getPath} from "../../filesFunctions";
import {IconCreateFile, IconCreateFolder, IconDelete, IconFolder} from "../../Icon/Icon";

export type FolderProps = {
    folder: Folder;
    onCreateFolder: (path: string) => void;
    onCreateFile: (path: string) => void;
    onClickFile: (file: File) => void;
    onDelete: (file: File) => void;
    isRoot: boolean;
}

export default function FolderItem({folder, onCreateFolder, onCreateFile, onClickFile, onDelete, isRoot}: FolderProps) {
    return <div key={folder.name} className="FolderItem">
        <div className="header">
            <div className='name'>
                {isRoot ? <h1>Files</h1> : <><IconFolder/><div>{folder.name}</div></>}
            </div>
            <button onClick={() => onCreateFolder(getPath(folder))}><IconCreateFolder/></button>
            <button onClick={() => onCreateFile(getPath(folder))}><IconCreateFile/></button>
            {!isRoot && <button onClick={() => onDelete(folder)}><IconDelete/></button>}
        </div>
        <div className="children">
            {folder.children
                .sort((c1, c2) => isFolder(c1) ? -1 : +1)
                .map(child => isFolder(child) ? <FolderItem
                    key={getPath(child)}
                    folder={child as Folder}
                    onCreateFolder={onCreateFolder}
                    onCreateFile={onCreateFile}
                    onClickFile={onClickFile}
                    onDelete={onDelete}
                    isRoot={false}
                /> : <FileItem file={child} key={getPath(child)} onClickFile={onClickFile} onDelete={onDelete}/>)}
        </div>
    </div>
}