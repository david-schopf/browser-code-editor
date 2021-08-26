import React from "react";
import CreateDialog from "./CreateDialog"

export type CreateFolderDialogProps = {
    isOpen: boolean;
    onCreated: (name: string) => void;
}

export default function CreateFolderDialog({isOpen, onCreated}: CreateFolderDialogProps) {
    return <CreateDialog
        isOpen={isOpen}
        title={"Create a new folder"}
        onCreated={() => onCreated(Math.random().toFixed(2))}
    />

}