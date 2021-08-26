import {FilesState} from "./filesReducer";

const LocalStorageKey = 'filesState';

// Source: https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
function replacer(key: string, value: any) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        };
    } else {
        return value;
    }
}

function reviver(key: string, value: any) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export const loadStateFromLocalStorage = (initialState: FilesState): FilesState => {
    const storedState = localStorage.getItem(LocalStorageKey,);
    if (storedState) {
        return JSON.parse(storedState, reviver) as FilesState;
    } else {
        writeStateToLocalStorage(initialState);
        return initialState;
    }
}

export const writeStateToLocalStorage = (state: FilesState) => {
    const serialized = JSON.stringify(state, replacer);
    localStorage.setItem(LocalStorageKey, serialized);
}