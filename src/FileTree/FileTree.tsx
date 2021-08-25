import React, {useContext} from "react";
import {FilesContext} from "../App";


export default function FileTree() {

    const [{ folders }] = useContext(FilesContext);

    return <div className="FileTree">
        {folders.map(folder => <div key={folder.name}>{folder.name}</div>)}
    </div>
}