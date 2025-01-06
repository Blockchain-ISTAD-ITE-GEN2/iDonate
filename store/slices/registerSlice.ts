import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { z } from 'zod'

// Reuse the validation schemas from the component
const step1Schema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean(),
})

const step2Schema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['Male', 'Female']),
  dateOfBirth: z.date(),
  phoneNumber: z.string(),
})

const formSchema = step1Schema.merge(step2Schema)

type FormState = z.infer<typeof formSchema>

interface SignUpState extends FormState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SignUpState = {
  email: '',
  password: '',
  rememberMe: false,
  username: '',
  firstName: '',
  lastName: '',
  gender: 'Male',
  dateOfBirth: new Date(),
  phoneNumber: '',
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk(
  'signUp/registerUser',
  async (userData: FormState, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/user-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload }
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const { updateField, resetForm } = signUpSlice.actions
export default signUpSlice.reducer

