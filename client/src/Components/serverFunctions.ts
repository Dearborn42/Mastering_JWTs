"use server";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface serverResponse {
    success: boolean;
    token?: string;
    message: string;
    // Add more properties if necessary
}

export async function login(formdata: {email:string, password:string}): Promise<serverResponse> {
    const getUser = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formdata)
    })
    const response: serverResponse = await getUser.json();
    if (response.success) {
        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        if (response.token) {
            var date = new Date();
            date.setTime(date.getTime() + (60 * 1000));
            cookies().set("authToken", response.token, { expires: date, secure: true });
            redirect("/home");
        } else {
            return {
                success: false,
                message: "Wrong email or password"
            };
        }
    }
    return response;
}

export async function logout(): Promise<void>{
    cookies().set('authToken', '');
    redirect("/");
}

export async function signup(formdata: FormData): Promise<serverResponse>{
    console.log(formdata);
    const createUser = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formdata)
    })
    const response: serverResponse = await createUser.json();
    if (response.success) {
        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        if (response.token) {
            var date = new Date();
            date.setTime(date.getTime() + (60 * 1000));
            cookies().set("authToken", response.token, { expires: date, secure: true });
            redirect("/home");
        } else {
            return {
                success: false,
                message: "Server Error"
            };
        }
    }
    return response;
}