// task that is UI friendly
export interface Task {
  id: number;
  text: string;
  createdAt: string; // Use formatted date string for display
  status: string; // Directly use status value as string
  category?: string | null; // Optional field, can be null
  priority?: string | null; // Optional field, can be null
}
