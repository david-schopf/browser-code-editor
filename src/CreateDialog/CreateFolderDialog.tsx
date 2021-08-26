import React from "react";
import CreateDialog from "./CreateDialog"

export type CreateFolderDialogProps = {
    onCreated: (name: string) => void;
}

export default function CreateFolderDialog({onCreated}: CreateFolderDialogProps) {
    return <CreateDialog
        title={"Create a new folder"}
        onCreated={() => onCreated(Math.random().toFixed(2))}
    />

}