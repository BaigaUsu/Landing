import React, { useEffect, useState } from "react";

type FileViewerProps = {
  fileId: string;
  type: "image" | "pdf" | "text";
  className?: string;
};

const FileViewer: React.FC<FileViewerProps> = ({ fileId, type, className }) => {
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      const res = await fetch(`http://95.179.247.253:9000/api/v1/files/get/${fileId}/`);
      if (type === "text") {
        const text = await res.text();
        setTextContent(text);
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setContentUrl(url);
      }
    };
    fetchFile();

    return () => {
      // Очистка URL, чтобы не засорять память
      if (contentUrl) URL.revokeObjectURL(contentUrl);
    };
  }, [fileId, type]);

  if (type === "text") {
    return textContent ? <pre className={className}>{textContent}</pre> : <p>Загрузка...</p>;
  }

  if (type === "image") {
    return contentUrl ? <img src={contentUrl} alt="Файл" className={className} /> : <p>Загрузка...</p>;
  }

  if (type === "pdf") {
    return contentUrl ? (
      <iframe src={contentUrl} width="100%" height="600" className={className} />
    ) : (
      <p>Загрузка...</p>
    );
  }

  return null;
};

export default FileViewer;