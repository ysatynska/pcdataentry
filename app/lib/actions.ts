'use server';
 
// import { signIn } from '@/app/lib/auth';
// import { AuthError } from 'next-auth';
// import { z } from "zod";
import { redirect } from 'next/navigation';
// import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }

// export type State = {
//   errors?: {
//     name?: string[];
//     email?: string[];
//     password?: string[];
//   };
// };

// const schemaRegister = z.object({
//   name: z
//     .string()
//     .min(3)
//     .max(50, {
//       message: "Name must be between 3 and 50 characters.",
//     })
//     .refine((val) => val.trim().split(/\s+/).length >= 2, {
//       message: "Name must contain at least two words",
//     }),
//   password: z.string().min(6).max(100, {
//     message: "Password must be between 6 and 100 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
// });

// export async function registerUserAction(prevState: State, formData: FormData) {
//   const validatedFields = schemaRegister.safeParse({
//     name: formData.get("name"),
//     password: formData.get("password"),
//     email: formData.get("email"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }
//   const hashedPassword = await bcrypt.hash(formData.get("password") as string, 3);
//   try {
//     await sql`
//       INSERT INTO players (name, email, password)
//       VALUES (${formData.get("name") as string}, ${formData.get("email") as string}, ${hashedPassword})
//     `;
//   } catch (error:any) {
//     if (error.code === '23505') {
//       return {
//         errors: {
//           email: ["Email already registered."],
//         },
//       };
//     } else {
//       console.log("Database Error.");
//     }
//   }

//   redirect('/signin');
// }

export async function addStudentAction(formData: any) {
  // const validatedFields = schemaRegister.safeParse({
  //   name: formData.get("name"),
  //   password: formData.get("password"),
  //   email: formData.get("email"),
  // });

  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }
  const now = new Date().toISOString();
  try {
    await sql`
      INSERT INTO students (name, age, sex, grade, address, phone_number, created_at, created_by, updated_at, updated_by)
      VALUES (${formData.name}, ${formData.age}, ${formData.sex}, ${formData.grade}, ${formData.address}, ${formData.phone_number}, ${now}, 1, ${now}, 1)
    `;
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}