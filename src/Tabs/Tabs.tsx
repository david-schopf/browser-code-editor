import React from "react";
import {File} from "../filesModel";
import {getPath, isPathEqual} from "../filesFunctions";
import "./Tabs.css";

interface TabsProps {
    files: File[];
    onSelectFile: (file: File) => void;
    activeFile?: File;
}

export default function Tabs({files, onSelectFile, activeFile}: TabsProps) {

    const getClass = (file: File) => activeFile && isPathEqual(file, activeFile) ? "tab active" : "tab";

    return <div className="Tabs" role="tablist">
        {files.map(file => {
            const path = getPath(file);
            return <div key={path} className={getClass(file)} onClick={() => onSelectFile(file)} role="tab">{path}</div>;
        })}
    </div>
}
