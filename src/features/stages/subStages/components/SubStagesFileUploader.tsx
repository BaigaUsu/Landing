import React, { useRef, useState } from 'react';
import { ServerStageUrlKind } from '../../types/types';
import { useDeleteSubStageFileMutation, useGetSubStageFilesQuery, useUploadSubStageFileMutation } from '../api/subStagesFileApi';

interface Props {
    id: number;
    kind: ServerStageUrlKind;
    stageId: number;
    subStageId: number;
    category: string;
}

const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'doc':
        case 'docx':
            return '📄';
        case 'xls':
        case 'xlsx':
            return '📊';
        case 'pdf':
            return '📕';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return '🖼️';
        case 'txt':
            return '📃';
        default:
            return '📁';
    }
};

export const SubStagesFileUploader = ({ id, kind, stageId, subStageId, category }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadFile, { isLoading }] = useUploadSubStageFileMutation();
    const { data: files } = useGetSubStageFilesQuery({ id, kind, stageId, subStageId, category });
    const [deleteFile] = useDeleteSubStageFileMutation();

    const [isOpen, setIsOpen] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = async () => {
        if (!file) return;
        const safeFile = new File(
            [file],
            file.name.slice(0, 100),
            { type: file.type }
          );
        try {
            await uploadFile({ id, kind, stageId, subStageId, category, file: safeFile }).unwrap();
            setFile(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (fileId: string) => {
        await deleteFile({ id, kind, stageId, subStageId, category, fileId });
    };
    

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {/* Кнопка раскрытия списка */}
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="bg-gray-200 hover:bg-gray-300 rounded p-1 text-xl transition"
                >
                    ➕
                </button>

                {/* Кнопка выбора файла */}
                <button
                    onClick={triggerFileInput}
                    className="flex items-center rounded-lg text-sm font-medium hover:bg-gray-300 p-1"
                >
                    <span>📎</span>
                    <span className="truncate max-w-[150px]">{file ? file.name : ''}</span>
                </button>

                {file && (
                    <button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                    >
                        {isLoading ? 'Загрузка...' : 'Загрузить'}
                    </button>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Список файлов, раскрывается по кнопке */}
            {isOpen && (
                <div className="space-y-1 mt-2 border-t pt-2">
                    {Array.isArray(files?.results) && files.results.length > 0 ? (
                        files.results.map(f => (
                            <div
                                key={f.id}
                                className="flex items-center gap-2 border rounded px-2 py-1 bg-gray-50 text-sm"
                            >
                                <span className="flex items-center gap-1">
                                    {getFileIcon(f.filename)} ({f.size}b)
                                </span>
                                <button
                                    onClick={() => handleDelete(f.id)}
                                    className="text-red-600 hover:text-red-800 px-1 rounded"
                                >
                                    ❌
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm italic">Файлы отсутствуют</p>
                    )}
                </div>
            )}
        </div>
    );
};
