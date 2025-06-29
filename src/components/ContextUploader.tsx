import { FiFileText, FiUpload, FiTrash2 } from "react-icons/fi";

interface ContextUploaderProps {
  contextDocName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveContext: () => void;
}

export function ContextUploader({
  contextDocName,
  fileInputRef,
  onFileUpload,
  onRemoveContext,
}: ContextUploaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-zinc-400 text-sm flex items-center gap-2">
        <FiFileText className="text-zinc-400" size={18} />
        <span className="font-medium">Context doc</span>
        <input
          type="file"
          accept=".md,.txt"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
          id="context-upload"
        />
        <label
          htmlFor="context-upload"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded cursor-pointer text-xs font-semibold transition"
          title="Upload document"
        >
          <FiUpload size={16} />
          Upload
        </label>
        {contextDocName && (
          <button
            onClick={onRemoveContext}
            className="ml-2 text-red-400 hover:text-red-300 text-xs p-1 rounded transition"
            title="Remove document"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>
      {contextDocName && (
        <div className="flex items-center gap-1 text-xs text-zinc-300 mt-1 truncate max-w-[180px]">
          <FiFileText size={14} className="text-blue-400" />
          <span className="truncate">{contextDocName}</span>
        </div>
      )}
    </div>
  );
}
