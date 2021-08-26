import React from "react";
import {File} from "../../model";

export type FileProps = {
    file: File;
    onClickFile: (file: File) => void;
}

export default function FileItem({ file, onClickFile } : FileProps) {
    return <div key={file.name} onClick={() => onClickFile(file)}>{file.name}</div>
}