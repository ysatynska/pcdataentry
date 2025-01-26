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
        SELECT id, name, grade, sex, address, phone_number, age
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

export async function fetchAveragesBySectionID(){
  try{
    const avgs = await sql `
      SELECT 
        e.section_id, 
        AVG(score) AS avg, 
        s.short_name
      FROM 
        evaluation_section_map e
      JOIN 
        sections s 
        ON s.id = e.section_id
      GROUP BY 
        e.section_id, s.short_name
      ORDER BY 
        e.section_id;
    `;
    return avgs;
  }
  catch(error: any){
    console.error('Error fetching averages, ', error);
    throw new Error('Failed to fetch evaluations.');
  }
}

export async function fetchTop5EvaluationSumsByStudents(){
  try{
    const evals = await sql `
    SELECT s.name, SUM(esm.score) as total_score
    FROM evaluation_section_map esm
    JOIN evaluations e ON esm.evaluation_id = e.id
    JOIN students s ON e.student_id = s.id
    GROUP BY s.id, s.name
    ORDER BY total_score DESC
    LIMIT 5
    `;
    return evals;
  }
  catch(error: any){
    console.error('Error fetching evaluations.');
    throw new Error('Failed to fetch evaluations.');
  }
}

export async function fetchAveragesForGrade(grade: string){
  try{
    const avgs = await sql`
      SELECT 
        s.grade,
        sec.id AS section_id,
        sec.short_name,
        AVG(esm.score) AS avg
      FROM 
        students s
      JOIN 
        evaluations e ON s.id = e.student_id
      JOIN 
        evaluation_section_map esm ON e.id = esm.evaluation_id
      JOIN 
        sections sec ON esm.section_id = sec.id
      WHERE 
        s.grade = ${grade}
      GROUP BY 
        s.grade, sec.id, sec.short_name
      ORDER BY 
        sec.id;
    `;
    return avgs;
  }
  catch(error: any){
    console.error('Error fetching averages: ', error);
    throw new Error('Failed to fetch evaluations.');
  }
}

export async function fetchAllGrades () {
  try{
    const grades = await sql `
      SELECT DISTINCT grade
      FROM students
      ORDER BY grade
    `;
    return grades;
  }
  catch(error: any){
    console.error('Error fetching grades: ', error);
    throw new Error('Failed to fetch grades.');
  }
}