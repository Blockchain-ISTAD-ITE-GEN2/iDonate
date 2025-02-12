import Image from "next/image";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { UploadedFile } from "@/difinitions/types/fileupload";
import { EmptyCard } from "@/components/fileupload/empty-card";
import { FileText } from "lucide-react";

type UploadedFilesCardProps = {
  uploadedFiles: UploadedFile[] | File[];
};

type FilePreviewProps = {
  file?: File & { preview: string };
};

function FilePreview({ file }: FilePreviewProps) {
  if (file) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={50}
        height={50}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }
  return (
    <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
  );
}

function formatFileSize(sizeInBytes: number): string {
  const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
  return sizeInMB.toFixed(2) + " MB"; // Format to 2 decimal places
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card className="flex-1 p-0 m-0 border-0 shadow-none">
      <CardContent className="p-0 m-0 border-0 h-full">
        {uploadedFiles?.length > 0 ? (
          <div className="flex flex-col w-full gap-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={
                  typeof file === "object" && file !== null && "key" in file
                    ? (file.key as React.Key)
                    : index
                }
                className="relative flex items-center h-20 gap-2 border-[1.5px] w-full p-4 rounded-lg border-iDonate-navy-accent"
              >
                <FilePreview
                  file={
                    typeof file === "object" && file !== null && "file" in file
                      ? (file.file as File & { preview: string })
                      : undefined
                  }
                />

                <div className="flex flex-col">
                  <CardDescription className="text-iDonate-navy-primary text-lg">
                    {file.name}
                  </CardDescription>

                  <CardDescription className="text-iDonate-gray text-sm">
                    {file.size !== undefined
                      ? formatFileSize(file.size)
                      : "Unknown size"}
                  </CardDescription>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full h-full border-[1.5px] border-iDonate-navy-accent"
          />
        )}
      </CardContent>
    </Card>
  );
}
