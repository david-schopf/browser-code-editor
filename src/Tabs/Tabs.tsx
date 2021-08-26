import React from "react";
import {getPath} from "../filesReducer";
import {File} from "../model";

interface TabsProps {
    files: File[];
    onSelectFile: (file: File) => void;
}

export default function Tabs({files, onSelectFile}: TabsProps) {
    return <div className="Tabs">
        {files.map(file => <div key={getPath(file)} onClick={() => onSelectFile(file)}>{file.name}</div>)}
    </div>
}
