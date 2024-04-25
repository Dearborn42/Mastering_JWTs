"use client"
import { signup } from "@/Components/serverFunctions";
// import React, { useState } from "react";

export default function Signup() {
    // const [form, setForm] = useState({
    //     email: "", password: ""
    // })
    // function handleForm(field:string, value:string){
    //     return setForm((prev) => { return { ...prev, [field]: value } });
    // }
    async function handleSubmit(e: FormData): Promise<void>{
        const result = await signup(e);
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
            // value={form.email}
            required
            // onChange={(e) => handleForm("email", e.target.value)}
        />
        <input 
            type="password" 
            autoComplete="true" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            required
            // onChange={(e) => handleForm("password", e.target.value)}
        />
        <input type="submit" value="Submit" />
        </form>
    );
}