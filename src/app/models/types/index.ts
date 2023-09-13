export interface TaskProps {
  title: string;
  category: string;
  id: number;
  isCompleted: boolean;
}

export type FilterProps = "all" | "completed" | "incomplete";
