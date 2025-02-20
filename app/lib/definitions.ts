export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

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
  age: number;
  grade: number;
  address: string;
  sex: string;
  phone_number: string;
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
  description: string;
  total_score: number;
};

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