'use server';
 
import { neon } from '@neondatabase/serverless';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);
import { revalidatePath } from 'next/cache';
import { Student } from "@/app/lib/definitions";

export async function addStudentAction(formData: Student) {
  try {
    const userId = parseInt(formData.id);
    if (isNaN(userId)) throw new Error("Invalid user_id format");
    
    await sql`
      INSERT INTO students (name, grade, sex, created_by, updated_by)
      VALUES (${formData.name}, ${formData.grade}, ${formData.sex}, ${userId}, ${userId})
    `;
    revalidatePath('/student_lookup');
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}

interface EvaluationFormData {
  student_id: string;
  user_id: string;
  [key: string]: string | number;
}

export async function addEvaluationAction(formData: EvaluationFormData) {
  try {
    const userId = Number(formData.user_id);
    if (isNaN(userId)) throw new Error("Invalid user_id format");
    
    const [evaluation] = await sql`
      INSERT INTO evaluations (student_id, created_by, updated_by)
      VALUES (${formData.student_id}, ${userId}, ${userId})
      RETURNING id AS evaluation_id
    `;

    const evaluationId = evaluation.evaluation_id;
    const entries = Object.entries(formData).filter(([key]) => key !== 'student_id' && key !== 'user_id');
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

interface UserNameFormData {
  name: string;
  email: string;
}

export async function addUserNameAction(formData: UserNameFormData) {
  try {
    await sql`
      UPDATE users
      SET name = ${formData.name}
      WHERE email = ${formData.email}
    `;
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}

interface ResetEmailFormData {
  email: string;
  user_id: string;
}

export async function resetEmailAction(formData: ResetEmailFormData) {
  try {
    await sql`
      UPDATE users
      SET email = ${formData.email}
      WHERE id = ${formData.user_id}
    `;
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}

interface ResetNameFormData {
  user_id: string;
  name: string;
}

export async function resetNameAction(formData: ResetNameFormData) {
  try {
    await sql`
      UPDATE users
      SET name = ${formData.name}
      WHERE id = ${formData.user_id}
    `;
    return { success: true };
  } catch (error) {
    console.log("Database Error: ", error);
    return { success: false };
  }
}
