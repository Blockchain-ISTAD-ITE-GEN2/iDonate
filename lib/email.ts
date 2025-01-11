export async function sendPasswordResetEmail(email: string) {
        // In a real application, you would use an email service here
        console.log(`Sending password reset email to ${email}`)
        // Simulate an API delay
      
        await new Promise(resolve => setTimeout(resolve, 1000))
      
      }
      
      