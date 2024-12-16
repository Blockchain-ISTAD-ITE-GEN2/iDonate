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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { SquarePen } from "lucide-react"
import { organizationBioSchema } from "../schema/schema"
import { Textarea } from "../ui/textarea"

export function OrganizationBioForm() {
  // 1. State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false)

  // 2. Define your form.
  const form = useForm<z.infer<typeof organizationBioSchema>>({
    resolver: zodResolver(organizationBioSchema),
    defaultValues: {
      bio: "Elizabeth Joe គឺជាអ្នកសកម្មក្នុងវិស័យឧស្សាហកម្មស្រ្តីដែលបង្កើតរបស់ជាច្រើនគាត់ជាអ្នកផ្តល់ជំនួយដល់ជំនួយដ៏ធំដល់អ្នកដទៃគាត់គឺជាមនុស្សម្ន ាក់ ដែលស្រឡាញវិជ្ជាសាស្រ្ត ពិភពលោក ផងដែរ🌍។គាត់គឺជាស្ថាបត្យករ GreenFuture Innovations ដែលពេញនិយមសម្រាប់ការបង្កើតដំណោះស្រាយមិត្តភាពដូចជា គ្រឿងពិនិត្យការពុលអាកាសដែលប្រើថាមពលព្រះអាទិត្យ។ គាត់ក៏ជាកម្មសិក្ខារ EmpowerHer Foundation ដែលគាំទ្រស្រ្តីក្នុងវិស័យ STEM តាមរយៈទទួល​អាហារូបករណ៍ និងការបណ្ដុះបណ្ដាលផ្សេង 💡។ គាត់ក៏បានសរសេរសៀវភៅ Sustainability Starts With You ដែលជាសៀវភៅបង្ហាញបុគ្គលភាពទៅកាន់ការរស់នៅ ក្នុងរបរិស្ថានតែមួយ។ ក្នុងពេលសំរាករបស់នាង Elizabeth មានការចូលរួមក្នុងការឆ្លងកាត់ភ្នំ គំនូរ និងចំណាយពេលជាមួយឆ្មារបស់នាង ​🐾 តែពេលនេះគាត់ពិតត្រូវការ  ជួយពីអ្នកទាំងអស់យ៉ាងក្រៃឡេង ដោយសារគាត់បានជួបជាមួយ និងឧបទ្ទវហេតុក្នុងគ្រោះថ្នាក់ចរាចរណ៍ពេលនេះគាត់កំពុងត្រូវអ្នកទាំងអស់គ្នាដើ់ម្បីបន្តនិងសេចក្តីសង្ឈឹមនូវជិវិតរបស់គាត់។",
    },
  })

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof organizationBioSchema>) {
    console.log(values)
    // Switch back to view mode after submitting
    setIsEditing(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
              Location
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="flex w-fle gap-9 p-0 m-0">
              <div lang="km" className="flex flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">Bio</CardDescription>
                <CardDescription className="font-siemreap text-xl text-iDonate-navy-primary leading-8">Elizabeth Joe គឺជាអ្នកសកម្មក្នុងវិស័យឧស្សាហកម្មស្រ្តីដែលបង្កើតរបស់ជាច្រើនគាត់ជាអ្នកផ្តល់ជំនួយដល់ជំនួយដ៏ធំដល់អ្នកដទៃគាត់គឺជាមនុស្សម្នាក់ ដែលស្រឡាញវិជ្ជាសាស្រ្ត ពិភពលោក ផងដែរ🌍។គាត់គឺជាស្ថាបត្យករ GreenFuture Innovations ដែលពេញនិយមសម្រាប់ការបង្កើតដំណោះស្រាយមិត្តភាពដូចជា គ្រឿងពិនិត្យការពុលអាកាសដែលប្រើថាមពលព្រះអាទិត្យ។ គាត់ក៏ជាកម្មសិក្ខារ EmpowerHer Foundation ដែលគាំទ្រស្រ្តីក្នុងវិស័យ STEM តាមរយៈទទួល​អាហារូបករណ៍ និងការបណ្ដុះបណ្ដាលផ្សេង 💡។ គាត់ក៏បានសរសេរសៀវភៅ Sustainability Starts With You ដែលជាសៀវភៅបង្ហាញបុគ្គលភាពទៅកាន់ការរស់នៅ ក្នុងរបរិស្ថានតែមួយ។ ក្នុងពេលសំរាករបស់នាង Elizabeth មានការចូលរួមក្នុងការឆ្លងកាត់ភ្នំ គំនូរ និងចំណាយពេលជាមួយឆ្មារបស់នាង ​🐾 តែពេលនេះគាត់ពិតត្រូវការ  ជួយពីអ្នកទាំងអស់យ៉ាងក្រៃឡេង ដោយសារគាត់បានជួបជាមួយ និងឧបទ្ទវហេតុក្នុងគ្រោះថ្នាក់ចរាចរណ៍ពេលនេះគាត់កំពុងត្រូវអ្នកទាំងអស់គ្នាដើ់ម្បីបន្តនិងសេចក្តីសង្ឈឹមនូវជិវិតរបស់គាត់។</CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Organization Information
              </CardTitle>

              <Button
                type="submit"
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                Submit
              </Button>
            </CardHeader>

            <CardContent className="flex w-fle gap-9 p-0 m-0">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormLabel className="text-sm text-iDonate-navy-secondary">Current Address</FormLabel>
                    <FormControl className="w-full h-full">
                      <Textarea className="h-auto overflow-auto scrollbar-hide" placeholder="Elizabeth Joe" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-iDonate-gray text-sm">
                      This is your organization's address.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  )
}
