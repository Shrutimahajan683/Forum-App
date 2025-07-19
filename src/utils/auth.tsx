export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  imgUrl: string;
}
export const users: User[] = [
  { email: 'demo@example.com', password: 'password123', name: "Theresa Webb", imgUrl: "https://www.gstatic.com/webp/gallery/2.webp", id: "demo#123" },
  { email: 'test@user.com', password: 'testpass', imgUrl: "https://www.gstatic.com/webp/gallery/1.webp", name: "John Doe", id: "test#123" },
];

export function login(email: string, password: string): boolean {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
  return false;
}

export function register(email: string, password: string): boolean {
  const exists = users.some(u => u.email === email);
  if (exists) return false;
  users.push({ email, password });
  localStorage.setItem('user', JSON.stringify({ email, password }));
  return true;
}

export function logout() {
  localStorage.removeItem('user');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('user');
}

