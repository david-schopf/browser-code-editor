import React, {useState} from "react";
import './CreateDialog.css';


export type CreateDialogProps = {
    title: string;
    onCreated: (name: string) => void;
    onCancel: () => void;
}

export default function CreateDialog({title, onCreated, onCancel}: CreateDialogProps) {

    const [name, setName] = useState('');

    const submitForm = () => onCreated(name);

    return <div className="CreateDialog">
        <form onSubmit={() => submitForm()}>
            <h1>{title}</h1>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            <div className="actions">
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit">OK</button>
            </div>
        </form>
    </div>
}