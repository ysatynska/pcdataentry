export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Student = {
    id: string;
    name: string;
    age: string;
    grade: string;
    address: string;
    sex: string;
    phone_number: string;
};

export type Section = {
    id: string;
    name: string;
    description: string;
    total_score: string;
};

export type StudentSectionCourseMap = {
    section_id: string;
    student_id: string;
    course_id: string;
};

export type Course = {
    id: string;
    name: string;
    teacher: string;
    location: string;
};

export type DropdownItem = {
    label: string;
    href: string;
    key: string;
}

export type NavItem = {
    key: string;
    label: string;
    href: string;
    dropdownItems: DropdownItem[];
}

export type TableItem = any