import { User, Section, Student, StudentSectionCourseMap, Course, Grade, StudentAverage, SectionAverage } from "@/app/lib/definitions";
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
      return sections as Section[];
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw new Error('Failed to fetch sections.');
    }
}

export async function fetchStudents(user_id: string) {
    try {
      const students = await sql`
        SELECT id, name, grade
        FROM students
        WHERE deleted_at IS NULL
        AND created_by = ${user_id}
        ORDER BY name desc;
      `;
      return students;
    } catch (error: any) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to fetch students.');
    }
}

export async function fetchStudentsWithAverages(user_id: string) {
  try {
    const students = await sql`
      WITH section_scores AS (
          SELECT 
            s.name AS name, 
            s.id AS id,
            s.grade AS grade,
            s.sex as sex,
            sec.id as section_id, 
            sec.total_score as total_score,
            (SUM(esm.score) * 100.0) / SUM(sec.total_score) AS section_percent_score, 
            AVG(esm.score) AS esm_score,
            s.created_by AS created_by
          FROM students s
          JOIN evaluations e on e.student_id = s.id
          JOIN evaluation_section_map esm on esm.evaluation_id = e.id
          JOIN sections sec on esm.section_id = sec.id
          WHERE s.created_by = ${user_id}
          GROUP BY s.id, s.name, s.grade, s.created_by, sec.id, sec.total_score, s.sex
      )
      SELECT 
          id,
          name,
          sex,
          grade,
          ROUND(AVG(section_percent_score), 2) AS avg_percent_score
      FROM section_scores
      GROUP BY id, name, grade, sex
    `;
    return students;
  } catch (error: any) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students.');
  }
}

export async function fetchStudent(student_id: string, user_id: string) {
  try {
    const student = await sql`
      SELECT id, name, age, grade, sex, address, phone_number
      FROM students
      WHERE deleted_at IS NULL
      AND created_by = ${user_id}
      AND id = ${student_id};
    `;
    return student[0] as Student;
  } catch (error: any) {
    console.error('Error fetching student with id ', student_id, ": ", error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchSectionsByEvaluationId (evaluation_id: string, user_id: string) {
  try {
    const evaluations = await sql`
      SELECT s.id, s.name, s.description, s.total_score, esm.score
      FROM sections s
      JOIN evaluation_section_map esm ON esm.section_id = s.id
      WHERE esm.evaluation_id = ${evaluation_id}
      AND esm.created_by = ${user_id}
    `;
    return evaluations;
  } catch (error: any) {
    console.error('Error fetching evaluations sections with id ', evaluation_id, ': ', error);
    throw new Error('Failed to fetch evaluations sections.');
  }
}

export async function fetchEvaluations(student_id: string, user_id: string) {
  try {
    const evaluations = await sql`
      SELECT id, created_at
      FROM evaluations
      WHERE student_id = ${student_id}
      AND created_by = ${user_id}
    `;
    return evaluations;
  } catch (error: any) {
    console.error('Error fetching evaluations with student_id ', student_id, '.');
    throw new Error('Failed to fetch evaluations.');
  }
}

export async function fetchAveragesBySectionID(user_id: string){
  try{
    const avgs = await sql`
      SELECT 
        e.section_id, 
        AVG(score) AS avg, 
        s.short_name,
        s.total_score
      FROM 
        evaluation_section_map e
      JOIN 
        sections s 
        ON s.id = e.section_id
      WHERE 
        e.created_by = ${user_id}
      GROUP BY 
        e.section_id, s.short_name, s.total_score
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

export async function fetchTop5EvaluationSumsByStudents(user_id: string){
  try{
    const evals = await sql `
    SELECT s.name, SUM(esm.score) as total_score
    FROM evaluation_section_map esm
    JOIN evaluations e ON esm.evaluation_id = e.id
    JOIN students s ON e.student_id = s.id
    WHERE s.created_by = ${user_id}
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

export async function fetchAveragesPerSectionForGrade(grade: string, user_id: string){
  try{
    const avgs = await sql`
      SELECT 
        e.section_id, 
        AVG(e.score) AS avg, 
        s.short_name,
        s.total_score,
        stu.grade
      FROM 
        evaluation_section_map e
      JOIN 
        sections s 
        ON s.id = e.section_id
      JOIN 
        evaluations eval
        ON eval.id = e.evaluation_id
      JOIN 
        students stu
        ON stu.id = eval.student_id
      WHERE 
        e.created_by = ${user_id}
      AND
        stu.grade = ${grade}
      GROUP BY 
        e.section_id, s.short_name, s.total_score, stu.grade
      ORDER BY 
        e.section_id;
    `;
    return avgs as SectionAverage[];
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

export async function fetchGrades() {
  try{
    const grades = await sql`
      SELECT id, name
      FROM grades
      ORDER BY id
    `;
    return grades as Grade[];
  }
  catch(error: any){
    console.error('Error fetching grades: ', error);
    throw new Error('Failed to fetch grades.');
  }
}

export async function fetchAverageScoresPerStudent (user_id: string) {
  try {
    const scores = await sql`
      WITH section_scores AS (
          SELECT 
            s.name AS name, 
            s.id AS student_id,
            s.grade as grade, 
            sec.id as section_id,
            sec.total_score as total_score,
            (SUM(esm.score) * 100.0) / SUM(sec.total_score) AS section_percent_score, 
            AVG(esm.score) AS esm_score,
            s.created_by AS created_by
          FROM students s
          JOIN evaluations e on e.student_id = s.id
          JOIN evaluation_section_map esm on esm.evaluation_id = e.id
          JOIN sections sec on esm.section_id = sec.id
          WHERE s.created_by = ${user_id}
          GROUP BY s.id, s.name, s.created_by, sec.id, sec.total_score, s.grade
      )
      SELECT 
          student_id,
          name,
          grade,
          AVG(section_percent_score) AS avg_percent_score,
          SUM(esm_score) AS total_esm_score,
          created_by
      FROM section_scores
      GROUP BY student_id, name, created_by, grade
    `
    return scores as StudentAverage[];
  } catch (error: any) {
    console.error('Error fetching avg. scores: ', error);
    throw new Error('Failed to fetch avg. scores.');
  }
}

export async function fetchAverageScoresByGrade (user_id: string) {
  try {
    const scores = await sql`
      WITH section_scores AS (
          SELECT 
            s.name AS name, 
            s.id AS student_id, 
            sec.id as section_id,
            sec.total_score as total_score,
            (SUM(esm.score) * 100.0) / SUM(sec.total_score) AS section_percent_score, 
            AVG(esm.score) AS esm_score,
            s.created_by AS created_by
          FROM students s
          JOIN evaluations e on e.student_id = s.id
          JOIN evaluation_section_map esm on esm.evaluation_id = e.id
          JOIN sections sec on esm.section_id = sec.id
          WHERE s.created_by = ${user_id}
          GROUP BY s.id, s.name, s.created_by, sec.id, sec.total_score
      )
      SELECT 
          student_id,
          name,
          AVG(section_percent_score) AS avg_percent_score,
          SUM(esm_score) AS total_esm_score,
          created_by
      FROM section_scores
      GROUP BY student_id, name, created_by
    `
    return scores;
  } catch (error: any) {
    console.error('Error fetching avg. scores: ', error);
    throw new Error('Failed to fetch avg. scores.');
  }
}

export async function fetchAverageScore (student_id: string, user_id: string) {
  try {
    const scores = await sql`
      WITH section_scores AS (
          SELECT 
            s.name AS name, 
            s.id AS student_id, 
            sec.id as section_id,
            sec.total_score as total_score,
            (SUM(esm.score) * 100.0) / SUM(sec.total_score) AS section_percent_score, 
            AVG(esm.score) AS esm_score,
            s.created_by AS created_by
          FROM students s
          JOIN evaluations e on e.student_id = s.id
          JOIN evaluation_section_map esm on esm.evaluation_id = e.id
          JOIN sections sec on esm.section_id = sec.id
          WHERE s.created_by = ${user_id}
          WHERE s.id = ${student_id}
          GROUP BY s.id, s.name, s.created_by, sec.id, sec.total_score
      )
      SELECT 
          student_id,
          name,
          AVG(section_percent_score) AS avg_percent_score,
          SUM(esm_score) AS total_esm_score,
          created_by
      FROM section_scores
      GROUP BY student_id, name, created_by
    `
    return scores;
  } catch (error: any) {
    console.error('Error fetching avg. scores: ', error);
    throw new Error('Failed to fetch avg. scores.');
  }
}