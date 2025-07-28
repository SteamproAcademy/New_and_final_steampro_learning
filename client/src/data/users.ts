export interface User {
  email: string;
  password: string;
  department: "sales" | "ops" | "marketing" | "finance" | "manufacturing";
  name: string;
}

export const users: User[] = [
  {
    email: "yuvraj.kumar@steampro.in",
    password: "12345",
    department: "sales",
    name: "Yuvraj Kumar"
  },
  {
    email: "rahul.sharma@steampro.in",
    password: "abcd1234",
    department: "ops",
    name: "Rahul Sharma"
  },
  {
    email: "anita.verma@steampro.in",
    password: "pass5678",
    department: "marketing",
    name: "Anita Verma"
  }
];
