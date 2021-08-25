import React from "react";
import {Folder, isFile} from "../../model";
import FileItem from "../FileItem/FileItem";

export type FolderProps = {
    folder: Folder;
}

export default function FolderItem({ folder } : FolderProps) {
    return <div key={folder.name}>
        <p>{folder.name}</p>
        <div>
            {folder.children.map(child => isFile(child) ? <FileItem file={child} /> : <FolderItem folder={child as Folder} />)}
        </div>
    </div>
}