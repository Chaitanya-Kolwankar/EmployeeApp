import { DEPARTMENTS } from "../data/mockData";
import { Employee } from "../types";

const REAL_DEPARTMENTS = DEPARTMENTS.filter((d) => d !== "All");

const getRandomDepartment = () => {
  return REAL_DEPARTMENTS[Math.floor(Math.random() * REAL_DEPARTMENTS.length)];
};

type JPHUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export async function fetchEmployees(): Promise<Employee[]> {
  // Using /users as it returns the array of users
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const users: JPHUser[] = await response.json();

  return users.map((user) => ({
    id: user.id.toString(),
    name: user.name, // JSONPlaceholder already gives us the full name
    role: "Software Engineer", // Defaulting since API doesn't provide one
    department: getRandomDepartment(), // Assigning a random department
    email: user.email.toLowerCase(),
    phone: user.phone.split(' ')[0], // JSONPlaceholder phones are messy, grab just the first part
    // Generating a placeholder avatar since JSONPlaceholder doesn't have one
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  }));
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch employee details");
  }

  const user: JPHUser = await response.json();

  return {
    id: user.id.toString(),
    name: user.name,
    role: 'Software Engineer',
    department: getRandomDepartment(),
    email: user.email.toLowerCase(),
    phone: user.phone.split(' ')[0],
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  };
}
