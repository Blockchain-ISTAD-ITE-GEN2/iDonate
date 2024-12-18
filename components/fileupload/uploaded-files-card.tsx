import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { UploadedFile } from "@/difinitions/types/fileupload"
import { EmptyCard } from "./empty-card"
import { FileText } from "lucide-react"

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[]
}

interface FilePreviewProps {
  file: File & { preview: string } | undefined
}

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
    )
  }
  return (
    <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
  )
}

function formatFileSize(sizeInBytes: number): string {
  const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
  return sizeInMB.toFixed(2) + " MB"; // Format to 2 decimal places
}


export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card className="p-0 m-0 border-0 shadow-none">
      <CardContent className="p-0 m-0 border-0">
        {uploadedFiles.length > 0 ? (
            <div className="flex flex-col w-full gap-2">
              {uploadedFiles.map((file) => (
                <div key={file.key} className="relative flex items-center h-20 gap-2 border-[1.5px] w-full p-4 rounded-lg border-iDonate-navy-accent">
                  <FilePreview file={file.file || undefined} /> 
                    <div className="flex flex-col">
                      <CardDescription className="text-iDonate-navy-primary text-lg">{file.name}</CardDescription>

                      <CardDescription className="text-iDonate-gray text-sm">{formatFileSize(file.size)}</CardDescription>
                    </div>
                </div>
              ))}
            </div>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full border-[1.5px] border-iDonate-navy-accent"
          />
        )}
      </CardContent>
    </Card>
  )
}
