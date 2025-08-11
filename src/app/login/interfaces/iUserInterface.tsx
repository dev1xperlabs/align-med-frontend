export interface iUser {
  id: number;
  first_name: string; // Changed from 'name' to match API response
  last_name: string; // Added to match API response
  email: string;
  created_at: string;
  updated_at: string;
  role_id: number | null; // Assuming role_id is a number, adjust if it's a string
  role: string;
  // Add computed property for display name
  name?: string;
}

export interface iLoginBody {
  email: string;
  password: string;
}
