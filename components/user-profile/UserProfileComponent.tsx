'use client'

import { Pencil } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Navigation Tabs */}
      <div className="border-b mb-8">
        <Tabs defaultValue="edit-profile" className="w-full">
          <TabsList className="w-full justify-start h-14 bg-transparent border-0 p-0">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-8"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="edit-profile"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-8"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger 
              value="edit-password"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-8"
            >
              Edit Password
            </TabsTrigger>
            <TabsTrigger 
              value="logout"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-8"
            >
              User Logout
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Profile Content */}
      <div className="border rounded-lg p-8">
        {/* Profile Image and Name */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IA05KGRj1qUBPMI5yLUAkszcpPDBZU.png"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Jessica Alba</h2>
          <div className="flex items-center text-gray-600">
            <span>@jennywilson</span>
            <button className="ml-2 text-blue-600">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Username</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Jenny Wilson</span>
              <button className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Email</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">jenny@gmail.com</span>
              <button className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Address</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">New York, USA</span>
              <button className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Nickname</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sky Angel</span>
              <button className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">DOB</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">April 28, 1981</span>
              <button className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

