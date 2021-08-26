import React, {useState} from "react";
import './CreateDialog.css';


export type CreateDialogProps = {
    title: string;
    onCreated: (name: string) => void;
    onCancel: () => void;
}

export default function CreateDialog({ title, onCreated, onCancel}: CreateDialogProps) {

    const [name, setName] = useState('');

    return <div className="CreateDialog">
        <h1>{title}</h1>
        <input type="text" value={name} onChange={event => setName(event.target.value) } />
        <div className="actions">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onCreated(name)}>OK</button>
        </div>
    </div>
}