export type UploadedFile = {
  uri: string; // URL or path to the uploaded file
  name?: string; // Optional: File name
  size?: number; // Optional: File size in bytes
  type?: string; // Optional: MIME type (e.g., "image/png")
};

export type UploadedFileType = UploadedFile | UploadedFile[];
