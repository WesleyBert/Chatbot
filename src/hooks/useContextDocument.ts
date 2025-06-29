import { useState, useRef } from "react";

export function useContextDocument() {
  const [contextDoc, setContextDoc] = useState<string | null>(null);
  const [contextDocName, setContextDocName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setContextDoc(event.target?.result as string);
      setContextDocName(file.name);
    };
    reader.readAsText(file);
  };

  const handleRemoveContext = () => {
    setContextDoc(null);
    setContextDocName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    contextDoc,
    contextDocName,
    fileInputRef,
    handleFileUpload,
    handleRemoveContext,
  };
}
