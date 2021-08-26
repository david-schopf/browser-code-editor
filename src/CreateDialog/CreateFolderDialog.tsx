import React from "react";
import CreateDialog from "./CreateDialog"

export type CreateFolderDialogProps = {
    onCreated: (name: string) => void;
    onCancel: () => void;
}

export default function CreateFolderDialog({onCreated, onCancel}: CreateFolderDialogProps) {
    return <CreateDialog
        title={"Create a new folder"}
        onCreated={onCreated}
        onCancel={onCancel}
    />

}