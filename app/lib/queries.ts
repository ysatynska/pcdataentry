import { User, Section, Student, StudentSectionCourseMap, Course } from "@/app/lib/definitions";
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined in environment variables.');
const sql = neon(process.env.DATABASE_URL);

export async function fetchAllSections() {
    try {
      const sections = await sql`
        SELECT id, name, description, total_score
        FROM sections
        WHERE deleted_at IS NULL
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
        WHERE deleted_at IS NULL
        ORDER BY name desc;
      `;
      return students;
    } catch (error: any) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to fetch students.');
    }
}

export async function fetchStudent(student_id: string) {
  try {
    const student = await sql`
      SELECT id, name, age, grade, sex, address, phone_number
      FROM students
      WHERE deleted_at IS NULL
      AND id = ${student_id};
    `;
    return student[0];
  } catch (error: any) {
    console.error('Error fetching student with id ', student_id, ": ", error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchSectionsByEvaluationId (evaluation_id: string) {
  try {
    const evaluations = await sql`
      SELECT s.id, s.name, s.description, s.total_score, esm.score
      FROM sections s
      JOIN evaluation_section_map esm ON esm.section_id = s.id
      WHERE esm.evaluation_id = ${evaluation_id};
    `;
    return evaluations;
  } catch (error: any) {
    console.error('Error fetching evaluations sections with id ', evaluation_id, ': ', error);
    throw new Error('Failed to fetch evaluations sections.');
  }
}

export async function fetchEvaluations(student_id: any) {
  try {
    const evaluations = await sql`
      SELECT id, created_at
      FROM evaluations
      WHERE student_id = ${student_id};
    `;
    return evaluations;
  } catch (error: any) {
    console.error('Error fetching evaluations with student_id ', student_id, '.');
    throw new Error('Failed to fetch evaluations.');
  }
}

export async function fetchEvaluationsBySectionID(){
  try{
    const evals = await sql `
    SELECT evaluation_id, SUM(score)
    FROM evaluation_section_map
    GROUP BY evaluation_id
    `;
    return evals;
  }
  catch(error: any){
    console.error('Error fetching evaluations.');
    throw new Error('Failed to fetch evaluations.');
  }
}