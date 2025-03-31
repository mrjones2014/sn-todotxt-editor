export interface TodoItem {
  raw: string;
  completed: boolean;
  completionDate?: Date;
  priority?: string;
  creationDate?: Date;
  description: string;
  projects: string[];
  contexts: string[];
  metadata: Record<string, string>;
}
