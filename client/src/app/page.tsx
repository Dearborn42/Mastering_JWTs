"use client";
import Link from "next/link";
import { login } from "@/Components/serverFunctions";

export default function Login() {
  async function handleSubmit(e: FormData): Promise<void>{
        const result = await login(e);
        if(!result.success){
            alert(result.message);
        }
    }
  return (
    <form 
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center flex-col" 
      action={handleSubmit}
    >
      <input 
        type="email" 
        autoComplete="true" 
        id="email" 
        name="email" 
        placeholder="Enter your email address"
        required
      />
      <input 
        type="password" 
        autoComplete="true" 
        id="password" 
        name="password"
        placeholder="Enter your password"
        required
      />
      <Link href="/signup">If you don't have an account click here</Link>
      <input type="submit" title="Login" />
    </form>
  );
}
