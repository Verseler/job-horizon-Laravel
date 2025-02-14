import { File, FileUp, Trash } from 'lucide-react';
import React from 'react';

import { Button } from '@/Components/UI/Button';

type UploaderProps = {
    files: Array<File>;
    setFiles: Function;
};

export default function Uploader({ files, setFiles }: UploaderProps) {
    function handleClick() {
        const fileInputField = document.querySelector(
            '.file-input-field',
        ) as HTMLInputElement;

        fileInputField.click();
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#a3a3a3';
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#d4d4d4';
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        const uploadedFiles = e.dataTransfer.files;
        if (!uploadedFiles) return;

        const newFiles = filterOutExistingNewFiles(uploadedFiles, files);
        setFiles('documents', [...files, ...newFiles]);
    }

    function handleOnChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const uploadedFiles = target.files;
        if (!uploadedFiles) return;

        const newFiles = filterOutExistingNewFiles(uploadedFiles, files);
        setFiles('documents', [...files, ...newFiles]);
    }

    function deleteFile(name: string) {
        const latestFiles = files.filter((file) => file.name !== name);
        setFiles('documents', latestFiles);
    }

    function filterOutExistingNewFiles(
        uploadedFiles: FileList,
        existingFiles: Array<File>,
    ) {
        return Array.from(uploadedFiles).filter(
            (uploadedFile) =>
                !existingFiles.some((file) => file.name === uploadedFile.name),
        );
    }

    return (
        <>
            <div
                role="form"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="isolate flex h-60 w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-lg border-2 border-dashed border-neutral-300 transition-all hover:border-neutral-400"
            >
                <FileUp className="mb-2 size-8 text-green-600" />
                <p>Drag and drop to upload the file</p>
                <p>or</p>
                <label
                    onClick={(e) => e.stopPropagation()}
                    role="button"
                    tabIndex={0}
                    htmlFor="file-input-field"
                    className="rounded-md bg-green-600 px-3.5 py-2 text-sm text-white hover:bg-green-700"
                >
                    Browse File
                    <input
                        id="file-input-field"
                        type="file"
                        accept="image/*,.doc,.docx,.pdf"
                        className="file-input-field sr-only"
                        multiple
                        onChange={handleOnChange}
                    />
                </label>
            </div>

            {files.length > 0 &&
                files.map((file) => (
                    <FilePreviewItem
                        key={file.name}
                        name={file.name}
                        onClickDelete={() => deleteFile(file.name)}
                    />
                ))}
        </>
    );
}

type FilePreviewItemProps = {
    name: string;
    onClickDelete: () => void;
};

function FilePreviewItem({ name, onClickDelete }: FilePreviewItemProps) {
    return (
        <div className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 px-2">
            <div className="flex items-center gap-x-2">
                <div className="max-w-max rounded-full bg-green-100 p-2">
                    <File className="size-3 text-green-600" />
                </div>
                <p className="line-clamp-1 text-sm">{name}</p>
            </div>
            <Button
                onClick={onClickDelete}
                size="icon"
                variant="link"
                className="w-5"
            >
                <Trash className="text-red-500/80" />
            </Button>
        </div>
    );
}
