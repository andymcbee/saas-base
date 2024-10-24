// task that is UI friendly
export interface Task {
  id: number;
  text: string;
  createdAt: string; // Use formatted date string for display
  status: string; // Directly use status value as string
  category?: string | null; // Optional field, can be null
  priority?: string | null; // Optional field, can be null
}

// for data-table. move to its own type def file.

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface DataTableFilterField<TData> {
  id: keyof TData;
  label: string;
  placeholder?: string;
  options?: Option[];
}
