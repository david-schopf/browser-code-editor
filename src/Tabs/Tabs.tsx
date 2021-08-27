import React from "react";
import {File} from "../filesModel";
import {getPath} from "../filesFunctions";

interface TabsProps {
    files: File[];
    onSelectFile: (file: File) => void;
}

export default function Tabs({files, onSelectFile}: TabsProps) {
    return <div className="Tabs">
        {files.map(file => {
            const path = getPath(file);
            return <div key={path} onClick={() => onSelectFile(file)}>{path}</div>;
        })}
    </div>
}
