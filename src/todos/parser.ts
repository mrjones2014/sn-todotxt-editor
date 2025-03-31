import { TodoItem } from "./types";

/**
 * Parse a todo.txt file content into structured TodoItem objects
 */
export const deserializeFile = (fileContent: string): TodoItem[] => {
  const lines = fileContent.split("\n").filter((line) => line.trim().length > 0);
  return lines.map(deserializeLine);
};

/**
 * Parse a single line from a todo.txt file
 */
export const deserializeLine = (line: string): TodoItem => {
  // Initial state
  let remaining = line;
  let completed = false;
  let completionDate: Date | undefined;
  let priority: string | undefined;
  let creationDate: Date | undefined;
  let description = "";

  // Check if task is completed
  if (remaining.startsWith("x ")) {
    completed = true;
    remaining = remaining.substring(2);

    // Extract completion date if present
    const dateMatch = remaining.match(/^(\d{4}-\d{2}-\d{2})\s+/);
    if (dateMatch) {
      completionDate = new Date(dateMatch[1]);
      remaining = remaining.substring(dateMatch[0].length);
    }
  }

  // Extract priority if present
  const priorityMatch = remaining.match(/^\(([A-Z])\)\s+/);
  if (priorityMatch) {
    priority = priorityMatch[1];
    remaining = remaining.substring(priorityMatch[0].length);
  }

  // Extract creation date if present
  const creationDateMatch = remaining.match(/^(\d{4}-\d{2}-\d{2})\s+/);
  if (creationDateMatch) {
    creationDate = new Date(creationDateMatch[1]);
    remaining = remaining.substring(creationDateMatch[0].length);
  }

  // At this point, 'remaining' contains the description and any tags/metadata
  description = remaining;

  // Extract projects, contexts, and metadata
  const projects = extractProjects(remaining);
  const contexts = extractContexts(remaining);
  const metadata = extractMetadata(remaining);

  // Clean up the description by removing projects, contexts, and metadata
  let cleanDescription = description;

  // Remove projects
  projects.forEach((project) => {
    cleanDescription = cleanDescription.replace(new RegExp(`\\s\\+${project}\\b`, "g"), "");
  });

  // Remove contexts
  contexts.forEach((context) => {
    cleanDescription = cleanDescription.replace(new RegExp(`\\s@${context}\\b`, "g"), "");
  });

  // Remove metadata
  Object.entries(metadata).forEach(([key, value]) => {
    cleanDescription = cleanDescription.replace(new RegExp(`\\s${key}:${value}\\b`, "g"), "");
  });

  // Trim any extra whitespace
  cleanDescription = cleanDescription.trim();

  return {
    raw: line,
    completed,
    completionDate,
    priority,
    creationDate,
    description: cleanDescription, // Use the cleaned description
    projects,
    contexts,
    metadata,
  };
};

/**
 * Extract projects from a todo.txt line
 */
const extractProjects = (line: string): string[] => {
  const projectMatches = line.match(/\s\+([^\s]+)/g);
  return projectMatches ? projectMatches.map((p) => p.trim().substring(1)) : [];
};

/**
 * Extract contexts from a todo.txt line
 */
const extractContexts = (line: string): string[] => {
  const contextMatches = line.match(/\s@([^\s]+)/g);
  return contextMatches ? contextMatches.map((c) => c.trim().substring(1)) : [];
};

/**
 * Extract metadata from a todo.txt line
 */
const extractMetadata = (line: string): Record<string, string> => {
  const metadataMatches = line.match(/\s([^\s:]+):([^\s:]+)/g);
  if (!metadataMatches) return {};

  return metadataMatches.reduce((acc, meta) => {
    const [key, value] = meta.trim().split(":");
    return { ...acc, [key]: value };
  }, {});
};

/**
 * Format a date to YYYY-MM-DD
 */
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Convert a TodoItem back to a todo.txt line format
 */
export const serializeLine = (item: TodoItem): string => {
  const parts: string[] = [];

  // Add completion marker and date
  if (item.completed) {
    parts.push("x");
    if (item.completionDate) {
      parts.push(formatDate(item.completionDate));
    }
  }

  // Add priority
  if (!item.completed && item.priority) {
    parts.push(`(${item.priority})`);
  }

  // Add creation date
  if (item.creationDate) {
    parts.push(formatDate(item.creationDate));
  }

  // Add description (without projects, contexts, metadata)
  let description = item.description;

  // Remove projects, contexts, and metadata from description
  item.projects.forEach((project) => {
    description = description.replace(` +${project}`, "");
  });

  item.contexts.forEach((context) => {
    description = description.replace(` @${context}`, "");
  });

  Object.entries(item.metadata).forEach(([key, value]) => {
    description = description.replace(` ${key}:${value}`, "");
  });

  parts.push(description.trim());

  // Add projects, contexts, and metadata
  const additions: string[] = [
    ...item.projects.map((project) => `+${project}`),
    ...item.contexts.map((context) => `@${context}`),
    ...Object.entries(item.metadata).map(([key, value]) => `${key}:${value}`),
  ];

  return [...parts, ...additions].join(" ");
};

export const serializeFile = (todos: TodoItem[]): string => {
  return todos.map(serializeLine).join("\n");
};
