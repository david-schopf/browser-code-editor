import React from "react";
import fileCreateIcon from "./file-create.svg";
import folderCreateIcon from "./folder-create.svg";
import deleteIcon from "./delete.svg";
import folderIcon from "./folder.svg";
import fileIcon from "./file.svg";
import "./Icon.css";

export type IconProps = {
    iconFile: string;
}

function Icon({iconFile}: IconProps) {
    return <div className="Icon">
        <img src={iconFile} alt="Icon"/>
    </div>
}

export function IconCreateFile() {
    return <Icon iconFile={fileCreateIcon}/>
}

export function IconCreateFolder() {
    return <Icon iconFile={folderCreateIcon}/>
}

export function IconDelete() {
    return <Icon iconFile={deleteIcon}/>
}

export function IconFile() {
    return <Icon iconFile={fileIcon}/>
}

export function IconFolder() {
    return <Icon iconFile={folderIcon}/>
}

