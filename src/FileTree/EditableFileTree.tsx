import React, {useMemo, useState} from "react";
import FileTree from "./FileTree";
import CreateFolderDialog from "../CreateDialog/CreateFolderDialog";
import CreateFileDialog from "../CreateDialog/CreateFileDialog";


export type EditableFileTreeProps = {
    addFileToPath: (path: string) => (name: string) => void;
    addFolderToPath: (path: string) => (name: string) => void;
}

type DialogType = 'FILE' | 'FOLDER';

interface DialogState {
    isOpen: boolean;
    type?: DialogType;
    inPath?: string;
}

export default function EditableFileTree({addFileToPath, addFolderToPath}: EditableFileTreeProps) {

    const [dialog, setDialog] = useState<DialogState>({isOpen: true});

    const openCreateFolderDialog = (path: string) => {
        setDialog({isOpen: true, type: 'FOLDER', inPath: path})
    };

    const openCreateFileDialog = (path: string) => {
        setDialog({isOpen: true, type: 'FILE', inPath: path})
    };

    const CreateDialog = useMemo(() => {
        if (!dialog.inPath || !dialog.type) {
            return null;
        }

        const closeDialog = () => setDialog({ isOpen: false});

        const createWith = (creator: (path: string) => (name: string) => void) => (name: string) => {
            dialog.inPath && creator(dialog.inPath)(name)
            closeDialog();
        }

        const createFolder = createWith(addFolderToPath)
        const createFile = createWith(addFileToPath);

        return dialog.type === 'FILE' ? <CreateFileDialog onCreated={createFile} onCancel={closeDialog}/> :
            <CreateFolderDialog onCreated={createFolder} onCancel={closeDialog}/>;
    }, [dialog, setDialog, addFileToPath, addFolderToPath])

    return <>
        {
            dialog.isOpen && CreateDialog
        }
        <FileTree onCreateFile={openCreateFileDialog} onCreateFolder={openCreateFolderDialog}/>
    </>
}