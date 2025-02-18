'use server';
 
// import { signIn } from '@/app/lib/auth';
// import { AuthError } from 'next-auth';
// import { z } from "zod";
// import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);
import { revalidatePath } from 'next/cache';

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
  try {
    await sql`
      INSERT INTO students (name, age, grade, sex, address, phone_number, created_by, updated_by)
      VALUES (${formData.name}, ${formData.age}, ${formData.grade}, ${formData.sex}, ${formData.address}, ${formData.phone_number}, ${parseInt(formData.user_id)}, ${parseInt(formData.user_id)})
    `;
    revalidatePath('/student_lookup');
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}

export async function addEvaluationAction(formData: any) {
  try {
    const userId = Number(formData.user_id);
    if (isNaN(userId)) throw new Error("Invalid user_id format");
    console.log("User ID:", userId, typeof userId);

    const [evaluation] = await sql`
      INSERT INTO evaluations (student_id, created_by, updated_by)
      VALUES (${formData.student_id}, ${userId}, ${userId})
      RETURNING id AS evaluation_id
    `;

    const evaluationId = evaluation.evaluation_id;
    const entries = Object.entries(formData).filter(([key]) => (key !== 'student_id' && key != 'user_id'));
    for (const [sectionId, score] of entries) {
      await sql`
        INSERT INTO evaluation_section_map (evaluation_id, section_id, score, created_by, updated_by)
        VALUES (${evaluationId}, ${sectionId}, ${score}, ${userId}, ${userId})
      `;
    }
    revalidatePath(`/${formData.student_id}/overview`);
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}

export async function addUserNameAction (formData: any) {
  try {
    await sql`
      UPDATE users
      SET name = ${formData.name}
      WHERE email = ${formData.email}
    `;
    console.log(formData.email);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}