import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { TodoItem } from "todos/types";
import { Badge, FilterItem, FilterSection, FilterTitle } from "./StyledComponents";
import Fuse from "fuse.js";
import { differenceInDays, parse as parseDate, startOfDay } from "date-fns";

const DATE_FMT = "yyyy-MM-dd";

type DateFilters = {
  overdue: boolean;
  dueSoon: boolean;
  dueToday: boolean;
};

type DateCounts = Record<keyof DateFilters, number>;

export type FilterFields = DateFilters & {
  state?: "active" | "completed";
  project?: string;
  context?: string;
};

const computeDateFilters = (now: Date, dueDateStr: string): DateFilters | undefined => {
  try {
    // Parse the due date
    const dueDate = parseDate(dueDateStr, DATE_FMT, now);

    // Create date-only versions (no time component) to compare just the dates
    const startOfToday = startOfDay(now);
    const startOfDueDate = startOfDay(dueDate);

    const difference = differenceInDays(startOfDueDate, startOfToday);

    return {
      overdue: difference < 0,
      dueSoon: difference > 0 && difference <= 7,
      dueToday: difference === 0,
    };
  } catch {
    return undefined;
  }
};

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

interface FiltersProps {
  initialFilters: FilterFields | undefined;
  todos: TodoItem[];
  searchText: string;
  onFiltered: (filteredTodos: TodoItem[], filters: FilterFields) => void;
}

export const DEFAULT_FILTERS: FilterFields = {
  state: "active",
  dueSoon: false,
  dueToday: false,
  overdue: false,
};

const Filters = forwardRef<FiltersComponent, FiltersProps>(({ todos, searchText, onFiltered, initialFilters }, ref) => {
  const [filters, setFilters] = useState<FilterFields>(initialFilters ?? DEFAULT_FILTERS);

  useImperativeHandle(ref, () => ({
    clearFilters: () => setFilters(DEFAULT_FILTERS),
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

  const dateFilterCounts = useMemo(() => {
    const now = new Date();
    const statuses: (DateFilters | undefined)[] = todos.map((todo) => computeDateFilters(now, todo.metadata.due ?? ""));
    const counts: DateCounts = statuses.reduce(
      (acc, current) => {
        if (current == null) return acc;
        acc.overdue += current.overdue ? 1 : 0;
        acc.dueSoon += current.dueSoon ? 1 : 0;
        acc.dueToday += current.dueToday ? 1 : 0;
        return acc;
      },
      { overdue: 0, dueSoon: 0, dueToday: 0 },
    );
    return counts;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    let fuse: Fuse<TodoItem>;
    if (searchText != "") {
      // TODO turn on extendedSearch with a button
      fuse = new Fuse(todos, { keys: ["raw"], shouldSort: true });
      filtered = fuse.search(searchText).map((result) => result.item);
    }
    const now = new Date();
    return filtered.filter((todo) => {
      if (filters.state === "active" && todo.completed) return false;
      if (filters.state === "completed" && !todo.completed) return false;
      if (filters.project != null && !todo.projects.includes(filters.project)) return false;
      if (filters.context != null && !todo.contexts.includes(filters.context)) return false;

      if (filters.overdue || filters.dueSoon || filters.dueToday) {
        const status = computeDateFilters(now, todo.metadata.due);
        if (status == null) return false;
        if (filters.overdue && !status.overdue) return false;
        if (filters.dueSoon && !status.dueSoon) return false;
        if (filters.dueToday && !status.dueToday) return false;
      }

      return true;
    });
  }, [todos, searchText, filters]);

  useEffect(() => {
    onFiltered(filteredTodos, filters);
  }, [filteredTodos, onFiltered, filters]);

  console.log(filters);

  return (
    <>
      <FilterSection>
        <FilterTitle>State</FilterTitle>
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

      {(dateFilterCounts.overdue > 0 || dateFilterCounts.dueSoon > 0 || dateFilterCounts.dueToday > 0) && (
        <FilterSection>
          <FilterTitle>Due</FilterTitle>
          {dateFilterCounts.overdue > 0 && (
            <FilterItem
              active={filters.overdue === true}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = { ...filters, overdue: !filters.overdue };
                  if (newFilters.overdue) {
                    newFilters.dueSoon = false;
                    newFilters.dueToday = false;
                  }
                  return newFilters;
                });
              }}
            >
              Overdue
              <Badge>{dateFilterCounts.overdue}</Badge>
            </FilterItem>
          )}
          {dateFilterCounts.dueToday > 0 && (
            <FilterItem
              active={filters.dueToday === true}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = { ...filters, dueToday: !filters.dueToday };
                  if (newFilters.dueToday) {
                    newFilters.overdue = false;
                    newFilters.dueSoon = false;
                  }
                  return newFilters;
                });
              }}
            >
              Due Today
              <Badge>{dateFilterCounts.dueToday}</Badge>
            </FilterItem>
          )}
          {dateFilterCounts.dueSoon > 0 && (
            <FilterItem
              active={filters.dueSoon === true}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = { ...filters, dueSoon: !filters.dueSoon };
                  if (newFilters.dueSoon) {
                    newFilters.overdue = false;
                    newFilters.dueToday = false;
                  }
                  return newFilters;
                });
              }}
            >
              Due Soon
              <Badge>{dateFilterCounts.dueSoon}</Badge>
            </FilterItem>
          )}
        </FilterSection>
      )}

      {projects.length > 0 && (
        <FilterSection>
          <FilterTitle>Projects</FilterTitle>
          {projects.map((project) => (
            <FilterItem
              key={project}
              active={filters.project === project}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = { ...filters };
                  if (newFilters.project === project) {
                    newFilters.project = undefined;
                  } else {
                    newFilters.project = project;
                  }
                  return newFilters;
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
              active={filters.context === context}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = { ...filters };
                  if (newFilters.context === context) {
                    newFilters.context = undefined;
                  } else {
                    newFilters.context = context;
                  }
                  return newFilters;
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
