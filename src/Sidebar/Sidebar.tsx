import React from "react";
import './Sidebar.css';
import FileTree from "../FileTree/FileTree";

export type SidebarProps = {
    addFileToPath: (path: string) => (name: string) => void;
    addFolderToPath: (path: string) => (name: string) => void;
}

export default function Sidebar({ addFolderToPath, addFileToPath}: SidebarProps) {
    const addFolderToRoot = (name: string) => addFolderToPath('/')(name);

    return <aside className="Sidebar">
        <button onClick={() => addFolderToRoot('New folder in root' + Math.random().toFixed(2))}>+</button>
        <FileTree addFolderToPath={addFolderToPath} addFileToPath={addFileToPath}/>
    </aside>
}
