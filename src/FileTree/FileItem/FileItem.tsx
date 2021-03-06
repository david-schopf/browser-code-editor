import React from "react";
import {File} from "../../filesModel";
import "./FileItem.css";
import {IconDelete, IconFile} from "../../Icon/Icon";

export type FileProps = {
    file: File;
    onClickFile: (file: File) => void;
    onDelete: (file: File) => void;
}

export default function FileItem({ file, onClickFile, onDelete } : FileProps) {
    return <div className="FileItem" key={file.name} role="treeitem">
        <div className="filename" aria-label="Select" onClick={() => onClickFile(file)}><IconFile /> <div>{file.name}</div></div>
        <button aria-label="Delete" onClick={() => onDelete(file)}><IconDelete/></button>
    </div>
}