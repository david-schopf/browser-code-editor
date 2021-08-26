import React from "react";
import {File} from "../model";

interface FileEditorProps {
    file?: File;
    onEdit: (file: File, content: string) => void;
}

export default function FileEditor({file, onEdit}: FileEditorProps) {
    if (!file) {
        return <div>No file</div>
    }

    return <div className="FileEditor">
        <textarea onChange={(event => onEdit(file, event.target.value))}>
            {file.content}
        </textarea>
    </div>
}