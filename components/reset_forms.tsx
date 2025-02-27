"use client";

import { Form, Input, Button } from "@heroui/react";
import { redirect } from 'next/navigation';
import { resetEmailAction, resetNameAction } from "@/app/lib/actions";

interface ProfileProps {
  user_id: string;
  email: string;
}

export function EmailResetForm({ user_id, email }: ProfileProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (formData.new_email !== formData.confirm_email) {
      alert("New email and confirm email do not match.");
      return;
    }

    const result = await resetEmailAction({
      user_id,
      email: formData.new_email,
    });

    if (result.success) {
      redirect("/profile");
    }
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input isRequired name="user_id" type="hidden" value={user_id} />
      
      <Input
        label="Old Email"
        labelPlacement="outside"
        name="old_email"
        value={email}
        type="email"
        disabled
      />
      
      <Input
        isRequired
        errorMessage="Please enter a valid email address"
        label="New Email"
        labelPlacement="outside"
        name="new_email"
        placeholder="Enter your new email"
        type="email"
      />
      
      <Input
        isRequired
        errorMessage="Emails do not match"
        label="Confirm Email"
        labelPlacement="outside"
        name="confirm_email"
        placeholder="Confirm your new email"
        type="email"
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
  );
}

interface NameResetProps {
  user_id: string;
  name: string;
}

export function NameResetForm({ user_id, name }: NameResetProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (!formData.new_name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    const result = await resetNameAction({
      user_id,
      name: formData.new_name.trim(),
    });

    if (result.success) {
      redirect("/profile");
    }
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input isRequired name="user_id" type="hidden" value={user_id} />
      
      <Input
        label="Current Name"
        labelPlacement="outside"
        name="old_name"
        value={name}
        type="text"
        disabled
      />
      
      <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="New Name"
        labelPlacement="outside"
        name="new_name"
        placeholder="Enter your new name"
        type="text"
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
  );
}
