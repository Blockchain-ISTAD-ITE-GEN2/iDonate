export async function updateUserPassword(email:string,newPassword: string,confirmPassoword:string) {
  // In a real application, you would update the user's password in your database or auth service
  console.log(`Updating user password to: ${newPassword}`);
  // Simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
