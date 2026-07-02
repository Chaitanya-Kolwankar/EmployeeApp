import { Employee } from '../types';

type JPHUser = {
  id: number;
  name: string;
  email: string;
};

export async function fetchEmployees(): Promise<Employee[]> {
  // Using /users as it returns the array of users
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  const users: JPHUser[] = await response.json();
  
  return users.map((user) => ({
    id: user.id.toString(),
    name: user.name, // JSONPlaceholder already gives us the full name
    role: 'Software Engineer', // Defaulting since API doesn't provide one
    // Generating a placeholder avatar since JSONPlaceholder doesn't have one
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  }));
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch employee details');
  }

  const user: JPHUser = await response.json();
  
  return {
    id: user.id.toString(),
    name: user.name,
    role: 'Software Engineer',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  };
}
