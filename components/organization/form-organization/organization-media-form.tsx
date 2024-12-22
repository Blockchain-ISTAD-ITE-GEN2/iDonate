"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Upload } from "lucide-react"
import Image from "next/image"
import organization from "@/public/images/Cambodia-Kantha-Bopha-Foundation.jpeg"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { organizationMediaSchema } from "@/components/schema/schema"
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog"

export function OrganizationMediaForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof organizationMediaSchema>>({
    resolver: zodResolver(organizationMediaSchema),
    defaultValues: {
      image: "",
    },
  })    

  function onSubmit(values: z.infer<typeof organizationMediaSchema>) {
    console.log("Preview URL:", previewImage)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
        alert("Only JPG or PNG files are allowed.")
        return
      }
      const previewURL = URL.createObjectURL(file)
      setPreviewImage(previewURL)
      onChange(previewURL) // Notify form of the new value
    }
  }
  

  function handleCancel() {
    form.reset()
    setPreviewImage(null)
  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card
    className={`flex flex-col border-0 shadow-none px-20 py-12 rounded-none items-start gap-6 ${
        previewImage ? "bg-iDonate-light-gray" : ""
    }`}
    >

        {/* Card Header: Conditionally rendered when previewImage exists */}
        {previewImage && (
            <CardHeader className="w-full flex flex-row items-center justify-between p-0 m-0">
                <CardTitle  className="text-2xl font-medium text-iDonate-navy-secondary">Image Preview</CardTitle>

                <div className="flex gap-3">
                    {/* Cancel Button */}
                    {form.formState.isDirty ? (
                    <AlertComfirmDialog
                        trigger={
                        <Button
                            type="button"
                            className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                        >
                            Cancel
                        </Button>
                        }
                        title="Are you sure you want to cancel?"
                        description="All unsaved changes will be lost. Do you want to proceed?"
                        actionText="Yes, Cancel"
                        cancelText="No, Stay"
                        onAction={handleCancel}
                    />
                    ) : (
                    <Button
                        type="button"
                        onClick={handleCancel}
                        className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                    >
                        Cancel
                    </Button>
                    )}

                    {/* Submit Button */}
                    <Button
                    type="submit"
                    className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                    >
                    Submit
                    </Button>
              </div>
            </CardHeader>
        )}

        <div className="flex items-center gap-9">
            {/* Card Content for Image */}
            <CardContent className="flex p-0 m-0">
                {previewImage ? (
                <Image
                    src={previewImage}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="rounded-md"
                />
                ) : (
                <Image src={organization} alt="Organization" width={150} height={150} />
                )}
            </CardContent>

            {/* Card Content for Upload Button */}
            <CardContent className="flex flex-col p-0 m-0 gap-4">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="relative">
                            <input
                                id="file-input"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileChange(e, field.onChange)} // Pass field.onChange
                                ref={field.ref}
                            />
                            <Button
                                type="button"
                                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                                onClick={() => {
                                document.getElementById("file-input")?.click()
                                }}
                            >
                                <Upload />
                                New Media
                            </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                        <div>
                            <FormDescription className="text-iDonate-gray text-sm">
                            JPG or PNG is allowed.
                            </FormDescription>
                            <FormDescription className="text-iDonate-gray text-sm">
                            At least 800x800 px recommended.
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                    />

            </CardContent>
        </div>
        </Card>

      </form>
    </Form>
  )
}