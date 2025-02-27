export type User = {
  id: string;
  email: string;
  name: string;
}

export type Grade = {
  id: string,
  name: string,
}

export type Evaluation = {
  id: string,
  created_at: string,
}

export type StudentAverage = {
  grade: string;
  avg_percent_score: string;
  student_id: string,
  name: string,
  total_esm_score: number,
  created_by: string,
}

export type SectionAverage = {
  section_id: string;
  average_score: number; 
  avg: number, 
  short_name: string,
  total_score: number,
  grade: number,
}

export const columnsUser = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
];

export type Student = {
  id: string;
  name: string;
  grade: number;
  sex: string;
};

export type StudentWithAverage = {
  id: string;
  name: string;
  grade: number;
  sex: string;
  avg_percent_score: number;
};

export const columnsStudent = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "sex",
    label: "Sex",
  },
  {
    key: "grade",
    label: "Grade",
  },
  {
    key: "avg_percent_score",
    label: "Average (%)"
  }
];

export type Section = {
  id: string;
  name: string;
  total_score: number;
  description: string,
};

export type SectionByEvalId = {
  id: string;
  name: string;
  description: string;
  total_score: number;
  score: number;
};

export type EvaluationWithSections = {
  id: string;
  created_at: string;
  sections: Section[]; // Ideally, replace `any[]` with a more specific type if possible
}

export const columnsSection = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "total_score",
    label: "Total Score",
  }
];

export type StudentSectionCourseMap = {
  section_id: string;
  student_id: string;
  course_id: string;
};

export const columnsStudentSectionCourse = [
  {
    key: "student_name",
    label: "Student Name",
  },
  {
    key: "section",
    label: "Section Name",
  },
  {
    key: "score",
    label: "Score",
  },
  {
    key: "percent_score",
    label: "Percent Score",
  }
];

export type Course = {
  id: string;
  name: string;
  teacher: string;
  location: string;
};

export const columnsCourse = [
  {
    key: "name",
    label: "Course Name",
  },
  {
    key: "teacher",
    label: "Teacher Name",
  },
  {
    key: "location",
    label: "Location",
  },
];

export type DropdownItem = {
  label: string;
  href: string;
  key: string;
};

export type NavItem = {
  key: string;
  label: string;
  href: string;
  dropdownItems: DropdownItem[];
};