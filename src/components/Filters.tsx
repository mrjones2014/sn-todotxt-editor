import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { TodoItem } from "todos/types";
import { Badge, FilterItem, FilterSection, FilterTitle } from "./StyledComponents";
import Fuse from "fuse.js";

export type FilterFields = Partial<Pick<TodoItem, "projects" | "contexts"> & { state: "active" | "completed" }>;

export interface FiltersComponent {
  clearFilters: () => void;
}

const toggle = (value: string, values: string[] | undefined) => {
  values = values ?? [];
  const index = values.indexOf(value);
  if (index === -1) {
    return [...values, value];
  }

  values.splice(index, 1);
  return values;
};

const matches = (inputs: string[], queries?: string[]) => {
  if (queries == null || queries.length == 0) {
    return true;
  }

  return queries.every((q) => inputs.includes(q));
};

interface FiltersProps {
  todos: TodoItem[];
  searchText: string;
  onFiltered: (filteredTodos: TodoItem[]) => void;
}

const Filters = forwardRef<FiltersComponent, FiltersProps>(({ todos, searchText, onFiltered }, ref) => {
  const [filters, setFilters] = useState<FilterFields>({ state: "active" });

  useImperativeHandle(ref, () => ({
    clearFilters: () => setFilters({}),
  }));

  const projects = useMemo(() => {
    const projectSet = new Set<string>();
    todos.forEach((todo) => {
      todo.projects.forEach((project) => projectSet.add(project));
    });
    return Array.from(projectSet);
  }, [todos]);

  const contexts = useMemo(() => {
    const contextSet = new Set<string>();
    todos.forEach((todo) => {
      todo.contexts.forEach((context) => contextSet.add(context));
    });
    return Array.from(contextSet);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    let fuse: Fuse<TodoItem>;
    if (searchText != "") {
      // TODO turn on extendedSearch with a button
      fuse = new Fuse(todos, { keys: ["raw"], shouldSort: true });
      filtered = fuse.search(searchText).map((result) => result.item);
    }
    return filtered.filter((todo) => {
      if (filters.state === "active" && todo.completed) return false;
      if (filters.state === "completed" && !todo.completed) return false;
      if (!matches(todo.projects, filters.projects)) return false;
      if (!matches(todo.contexts, filters.contexts)) return false;

      return true;
    });
  }, [todos, searchText, filters]);

  useEffect(() => {
    onFiltered(filteredTodos);
  }, [filteredTodos, onFiltered]);

  console.log(filters);

  return (
    <>
      <FilterSection>
        <FilterTitle>Filters</FilterTitle>
        <FilterItem
          active={filters.state === "active"}
          onClick={() => {
            setFilters((filters) => {
              return { ...filters, state: filters.state === "active" ? undefined : "active" };
            });
          }}
        >
          Active
          <Badge>{todos.filter((t) => !t.completed).length}</Badge>
        </FilterItem>
        <FilterItem
          active={filters.state === "completed"}
          onClick={() => {
            setFilters((filters) => {
              return { ...filters, state: filters.state === "completed" ? undefined : "completed" };
            });
          }}
        >
          Completed
          <Badge>{todos.filter((t) => t.completed).length}</Badge>
        </FilterItem>
        <FilterItem
          active={filters.state == null}
          onClick={() => {
            setFilters((filters) => {
              const newFilters = { ...filters };
              newFilters.state = undefined;
              return newFilters;
            });
          }}
        >
          All Tasks
          <Badge>{todos.length}</Badge>
        </FilterItem>
      </FilterSection>
      {projects.length > 0 && (
        <FilterSection>
          <FilterTitle>Projects</FilterTitle>
          {projects.map((project) => (
            <FilterItem
              key={project}
              active={filters.projects?.includes(project)}
              onClick={() => {
                console.log("ayo???", project);
                setFilters((filters) => {
                  return { ...filters, projects: toggle(project, filters.projects) };
                });
              }}
            >
              +{project}
              <Badge>{todos.filter((t) => t.projects.includes(project)).length}</Badge>
            </FilterItem>
          ))}
        </FilterSection>
      )}

      {contexts.length > 0 && (
        <FilterSection>
          <FilterTitle>Contexts</FilterTitle>
          {contexts.map((context) => (
            <FilterItem
              key={context}
              active={filters.contexts?.includes(context)}
              onClick={() => {
                setFilters((filters) => {
                  filters.contexts = toggle(context, filters.contexts);
                  return filters;
                });
              }}
            >
              @{context}
              <Badge>{todos.filter((t) => t.contexts.includes(context)).length}</Badge>
            </FilterItem>
          ))}
        </FilterSection>
      )}
    </>
  );
});

export default Filters;
