import React from "react";
import './CreateDialog.css';


export type CreateDialogProps = {
    title: string;
    onCreated: (name: string) => void;
}

export default function CreateDialog({ title, onCreated}: CreateDialogProps) {
    return <div className="CreateDialog">
        <h1>{title}</h1>
        <button onClick={() => onCreated(Math.random().toFixed(3))}>OK</button>
    </div>
}