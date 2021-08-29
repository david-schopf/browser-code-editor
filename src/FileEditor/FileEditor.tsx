import React from "react";
import {File} from "../filesModel";
import "./FileEditor.css";

interface FileEditorProps {
    file?: File;
    onEdit: (file: File, content: string) => void;
    content: string;
}

export default function FileEditor({file, content, onEdit}: FileEditorProps) {
    if (!file) {
        return <div className="noFileMessage">Create folders and files to start</div>
    }

    return <div className="FileEditor">
        <textarea onChange={(event => onEdit(file, event.target.value))} value={content}/>
    </div>
}