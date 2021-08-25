import React, {useContext} from "react";
import {FilesContext} from "../App";
import FolderItem from "./FolderItem/FolderItem";
import {getFolderPath} from "../filesReducer";


export default function FileTree() {

    const [{ folders }] = useContext(FilesContext);

    return <div className="FileTree">
        {folders.map(folder => <FolderItem key={getFolderPath(folder)} folder={folder} />)}
    </div>
}