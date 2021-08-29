import React from "react";
import './Sidebar.css';
import EditableFileTree from "../FileTree/EditableFileTree";

export type SidebarProps = {
    addFileToPath: (path: string) => (name: string) => void;
    addFolderToPath: (path: string) => (name: string) => void;
}

export default function Sidebar({addFolderToPath, addFileToPath}: SidebarProps) {
    return <aside className="Sidebar">
        <EditableFileTree addFolderToPath={addFolderToPath} addFileToPath={addFileToPath}/>
    </aside>
}
