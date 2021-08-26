import CreateDialog from "./CreateDialog"


export type CreateFileDialogProps = {
    onCreated: (name: string) => void;
    onCancel: () => void;
}

export default function CreateFileDialog({onCreated, onCancel}: CreateFileDialogProps) {
    return <CreateDialog
        title={"Create a new file"}
        onCreated={onCreated}
        onCancel={onCancel}
    />

}