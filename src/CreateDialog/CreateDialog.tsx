import React from "react";
import './CreateDialog.css';


export type CreateDialogProps = {
    title: string;
    isOpen: boolean;
    onCreated: (name: string) => void;
}

export default function CreateDialog({isOpen, title, onCreated}: CreateDialogProps) {
    if (!isOpen) {
        return null;
    }

    return <div className="CreateDialog">
        <h1>{title}</h1>
        <button onClick={() => onCreated('New x')}>OK</button>
    </div>
}