import React, {useState} from "react";
import './Sidebar.css';
import FileTree from "../FileTree/FileTree";
import CreateDialog from "../CreateDialog/CreateDialog";
import CreateFolderDialog from "../CreateDialog/CreateFolderDialog";

export type SidebarProps = {
    addFileToPath: (path: string) => (name: string) => void;
    addFolderToPath: (path: string) => (name: string) => void;
}

export default function Sidebar({ addFolderToPath, addFileToPath}: SidebarProps) {
    const addFolderToRoot = (name: string) => addFolderToPath('/')(name);
    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

    const createFolder = (name: string) => {
         addFolderToRoot(name)
         setCreateDialogIsOpen(false)
    }

    return <aside className="Sidebar">
        <button onClick={() => setCreateDialogIsOpen(true)}>+</button>
        <FileTree addFolderToPath={addFolderToPath} addFileToPath={addFileToPath}/>
        <CreateFolderDialog
            isOpen={createDialogIsOpen}
            onCreated={createFolder} />
    </aside>
}
