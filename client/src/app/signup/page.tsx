"use client"
import { signup } from "@/Components/serverFunctions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Signup() {
    async function handleSubmit(e: FormData): Promise<void>{
        const result = await signup(e);
        if(!result.success){
            alert(result.message);
        }
    }

    return (
        <Form 
            className="fixed top-24 bottom-24 left-12 right-12 flex justify-center flex-col border-red-50 rounded border-8 bg-[#222]" 
            action={handleSubmit}
        >
            <Form.Group className="mb-3 max-w-lg mx-auto flex flex-col" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    autoComplete="true" 
                    id="email" 
                    name="email"
                    required 
                />
            </Form.Group>

            <Form.Group className="mb-3 max-w-lg mx-auto flex flex-col" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    autoComplete="true" 
                    id="password" 
                    name="password"
                    required 
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}