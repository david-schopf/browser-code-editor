import React from "react";
import {File} from "../../model";

export type FileProps = {
    file: File;
}

export default function FileItem({ file } : FileProps) {
    return <div key={file.name}>{file.name}</div>
}