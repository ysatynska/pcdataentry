'use client'
import React from 'react';
import { addStudentAction } from "@/app/lib/actions";
import {Form, Input, Button} from "@heroui/react";
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

export default function AddStudentForm () {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const result = await addStudentAction(formData);
    
        if (result.success) {
            redirect('/');
        }
    };

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={handleSubmit}
        >
            <Input
                isRequired
                errorMessage="Please enter a valid name"
                label="Full Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter the student's full name"
                type="name"
            />
            <Input
                isRequired
                errorMessage="Please enter a valid age"
                label="Age"
                labelPlacement="outside"
                name="age"
                placeholder="Enter the student's age"
                type="number"
            />
            <Input
                isRequired
                errorMessage="Please enter a valid sex"
                label="Sex"
                labelPlacement="outside"
                name="sex"
                placeholder="Enter the student's sex"
                type="text"
            />
            <Input
                isRequired
                errorMessage="Please enter a valid grade"
                label="Grade"
                labelPlacement="outside"
                name="grade"
                placeholder="Enter the student's grade in school"
                type="number"
            />
            <Input
                errorMessage="Please enter a valid address"
                label="Address"
                labelPlacement="outside"
                name="address"
                placeholder="Enter the student's address"
                type="text"
            />
            <Input
                errorMessage="Please enter a valid phone number"
                label="Phone Number"
                labelPlacement="outside"
                name="phone_number"
                placeholder="Enter the student's contact phone number"
                type="number"
            />
            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>
        </Form>
    )
}