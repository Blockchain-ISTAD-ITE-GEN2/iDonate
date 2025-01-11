import { NextResponse } from 'next/server'
import cors from 'cors'
import { request } from 'http'

// Configure CORS middleware
const corsMiddleware = cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  methods: ['POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// Helper function to run middleware
function runMiddleware(request: Request, middleware: any) {
  return new Promise((resolve, reject) => {
    const res = NextResponse.next()
    middleware(request, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(res)
    })
  })
}

export async function OPTIONS() {
  const response = NextResponse.next()
  // Handle CORS preflight request
  // await runMiddleware(request, corsMiddleware)
  return response
}

export async function POST(request: Request) {
  try {
    // Handle CORS for the actual request
    await runMiddleware(request, corsMiddleware)

    const data = await request.json()

    // Your registration logic here
    // For example:
    // const user = await db.createUser(data)

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}

