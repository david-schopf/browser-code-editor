import React, {FormEvent, useEffect, useRef, useState} from "react";
import './CreateDialog.css';

export type CreateDialogProps = {
    title: string;
    onCreated: (name: string) => void;
    onCancel: () => void;
}

export default function CreateDialog({title, onCreated, onCancel}: CreateDialogProps) {

    const [name, setName] = useState('');

    // Focus the text input when the dialog is rendered
    const inputEl = useRef<HTMLInputElement>(null);
    useEffect(() => inputEl.current?.focus(), [inputEl]);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (name.length > 0) {
            onCreated(name);
        }
    }

    return <div className="CreateDialog">
        <form onSubmit={onSubmit}>
            <h2>{title}</h2>
            <input className="textInput" type="text" value={name} onChange={event => setName(event.target.value)} ref={inputEl} />
            <div className="actions">
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit">OK</button>
            </div>
        </form>
    </div>
}