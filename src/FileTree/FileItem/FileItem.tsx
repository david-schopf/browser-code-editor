import React from "react";
import {File} from "../../filesModel";
import "./FileItem.css";

export type FileProps = {
    file: File;
    onClickFile: (file: File) => void;
    onDelete: (file: File) => void;
}

export default function FileItem({ file, onClickFile, onDelete } : FileProps) {
    return <div className="FileItem" key={file.name} >
        <div className="filename" onClick={() => onClickFile(file)}>{file.name}</div>
        <div onClick={() => onDelete(file)}>X</div>
    </div>
}