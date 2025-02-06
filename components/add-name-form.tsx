'use client'
import React from 'react';
import { Form, Input, Button } from "@heroui/react";
import { redirect } from 'next/navigation';
import { addUserNameAction } from "@/app/lib/actions";

export default function AddNameForm ({ email } : { email: string }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const result = await addUserNameAction(formData);
    
        if (result.success) {
            redirect("/");
        }
    };
    return (
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
            <div className="w-full max-w-md text-center">
                <p className="mb-6">Please provide the following information</p>
            </div>
            <Form
                className="w-full max-w-xs flex flex-col gap-4"
                validationBehavior="native"
                onSubmit={handleSubmit}
            >
                <Input
                    isRequired
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    type="email"
                    readOnly
                    value={email}
                />
                <Input
                    isRequired
                    errorMessage="Please enter a valid name"
                    label="Full Name"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Please enter your full name"
                    type="text"
                />
                <div className="flex gap-2">
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}