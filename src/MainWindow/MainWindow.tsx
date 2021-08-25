import React from "react";
import './MainWindow.css';
import Tabs from "../Tabs/Tabs";
import FileEditor from "../FileEditor/FileEditor";

export default function MainWindow() {
    return <main className="MainWindow">
        <Tabs />
        <FileEditor />
    </main>;

}