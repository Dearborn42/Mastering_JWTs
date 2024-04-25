"use client";
import Link from "next/link";
import { login } from "@/Components/serverFunctions";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "", password: ""
  })
  function handleForm(field:string, value:string){
    return setForm((prev) => { return { ...prev, [field]: value } });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();
    const result = await login(form);
    if(!result.success){
      alert(result.message);
    }
  }
  return (
    <form 
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center flex-col" 
      onSubmit={(e)=>handleSubmit(e)}
    >
      <input 
        type="email" 
        autoComplete="true" 
        id="email" 
        name="email" 
        placeholder="Enter your email address"
        value={form.email}
        required
        onChange={(e) => handleForm("email", e.target.value)}
      />
      <input 
        type="password" 
        autoComplete="true" 
        id="password" 
        name="password"
        placeholder="Enter your password"
        required
        onChange={(e) => handleForm("password", e.target.value)} 
      />
      <Link href="/signup">If you don't have an account click here</Link>
      <input type="submit" title="Login" />
    </form>
  );
}
