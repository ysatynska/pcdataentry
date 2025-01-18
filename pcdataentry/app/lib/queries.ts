import { User, Section, Student, StudentSectionCourseMap, Course } from "@/app/lib/definitions";
// import { sql } from '@/db/db';
import { neon } from '@neondatabase/serverless';

export async function fetchSections() {
    const sql = neon(process.env.DATABASE_URL);
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