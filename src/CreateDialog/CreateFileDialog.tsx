import CreateDialog from "./CreateDialog"


export type CreateFileDialogProps = {
    onCreated: (name: string) => void;
}

export default function CreateFileDialog({onCreated}: CreateFileDialogProps) {
    return <CreateDialog
        title={"Create a new file"}
        onCreated={() => onCreated(Math.random().toFixed(2))}
    />

}