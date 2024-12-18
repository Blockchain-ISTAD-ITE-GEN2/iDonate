import { type ClientUploadedFileData } from "uploadthing/types"

export interface UploadedFile<T = unknown> {
    key: string
    url: string
    appUrl: string
    fileHash: string
    customId: string | null
    name: string
    size: number
    type: string
    lastModified?: number
    serverData?: T
     file: File & { preview: string } | undefined
  }
  