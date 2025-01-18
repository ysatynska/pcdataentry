import { User, Section, Student, StudentSectionCourseMap, Course } from "@/app/lib/definitions";
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);

export async function fetchSections() {
    try {
      const sections = await sql`
        SELECT id, name, description, total_score
        FROM sections
        ORDER BY id;
      `;
      return sections;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw new Error('Failed to fetch sections.');
    }
}

export async function fetchStudents() {
    try {
      const students = await sql`
        SELECT id, name, age, grade, sex, address, phone_number
        FROM students
        ORDER BY name desc;
      `;
      return students;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to fetch students.');
    }
}