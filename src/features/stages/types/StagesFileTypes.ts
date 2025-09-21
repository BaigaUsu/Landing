export interface FileUploadResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface FileData {
    id: string;
    filename: string;
    size: number;
    uploaded_at: string;
}