export interface iUser {
  id: number;
  first_name: string; // Changed from 'name' to match API response
  last_name: string; // Added to match API response
  email: string;
  created_at: string;
  updated_at: string;
  // Add computed property for display name
  name?: string;
}

export interface iLoginBody {
  email: string;
  password: string;
}
