import React, { useEffect, useMemo, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { serializeFile, serializeLine } from "todos/parser";
import { TodoItem } from "todos/types";
import {
  ActionButtons,
  AddTaskButton,
  AppContainer,
  Badge,
  Button,
  Checkbox,
  ContextTag,
  DateTag,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  FilterItem,
  FilterSection,
  FilterTitle,
  Header,
  IconButton,
  MainContent,
  MetadataTag,
  PriorityTag,
  ProjectTag,
  Sidebar,
  Title,
  TodoContent,
  TodoDescription,
  TodoItemContainer,
  TodoList,
  TodoMeta,
} from "./StyledComponents";
import NewTodoModal from "./NewTodoModal";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: var(--sn-stylekit-background-color);
    color: var(--sn-stylekit-foreground-color);
  }
`;

interface TodoEditorProps {
  todos: TodoItem[];
  onTodosChanged: (todos: TodoItem[]) => void;
}

const TodoEditor = (props: TodoEditorProps) => {
  const [todos, setTodos] = useState<TodoItem[]>(props.todos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("active");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTodoIndex, setEditingTodoIndex] = useState<number | null>(null);

  useEffect(() => {
    props.onTodosChanged(todos);
  }, [todos]);

  const onSave = (todo: TodoItem, index?: number) => {
    if (index != null) {
      let newTodos = [...todos];
      newTodos[index] = todo;
      setTodos(newTodos);
    } else {
      let newTodos = [todo, ...todos];
      setTodos(newTodos);
    }

    setShowModal(false);
  };

  const onCancel = () => {
    setEditingTodoIndex(null);
    setShowModal(false);
  };

  // Get all unique projects
  const projects = useMemo(() => {
    const projectSet = new Set<string>();
    todos.forEach((todo) => {
      todo.projects.forEach((project) => projectSet.add(project));
    });
    return Array.from(projectSet);
  }, [todos]);

  // Get all unique contexts
  const contexts = useMemo(() => {
    const contextSet = new Set<string>();
    todos.forEach((todo) => {
      todo.contexts.forEach((context) => contextSet.add(context));
    });
    return Array.from(contextSet);
  }, [todos]);

  // Filter todos based on current filters
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Filter by completion status
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;

      // Filter by project
      if (activeProject && !todo.projects.includes(activeProject)) return false;

      // Filter by context
      if (activeContext && !todo.contexts.includes(activeContext)) return false;

      return true;
    });
  }, [todos, filter, activeProject, activeContext]);

  // Toggle todo completion status
  const toggleTodoCompletion = (index: number) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);

    if (todoIndex !== -1) {
      const todo = { ...newTodos[todoIndex] };
      todo.completed = !todo.completed;

      // Add or remove completion date
      if (todo.completed) {
        todo.completionDate = new Date();
      } else {
        todo.completionDate = undefined;
      }

      // Update raw string
      todo.raw = serializeLine(todo);

      newTodos[todoIndex] = todo;
      setTodos(newTodos);
    }
  };

  // Open modal to add new task
  const openAddTaskModal = () => {
    setEditingTodoIndex(null);
    setShowModal(true);
  };

  // Open modal to edit task
  const openEditTaskModal = (index: number) => {
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);
    if (todoIndex !== -1) {
      setEditingTodoIndex(todoIndex);
      setShowModal(true);
    }
  };

  // Delete task
  const deleteTask = (index: number) => {
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);
    if (todoIndex !== -1) {
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    }
  };

  // Export todos to todo.txt format
  const exportTodoTxt = () => {
    const content = serializeFile(todos);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todo.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        <Header>
          <Title>Todo.txt Editor</Title>
          <Button onClick={exportTodoTxt}>
            <span>Export todo.txt</span>
          </Button>
        </Header>

        <MainContent>
          <Sidebar>
            <AddTaskButton onClick={openAddTaskModal}>
              <span>+ Add Task</span>
            </AddTaskButton>

            <FilterSection>
              <FilterTitle>Filters</FilterTitle>
              <FilterItem
                active={filter === "active" && !activeProject && !activeContext}
                onClick={() => {
                  setFilter("active");
                  setActiveProject(null);
                  setActiveContext(null);
                }}
              >
                Active
                <Badge>{todos.filter((t) => !t.completed).length}</Badge>
              </FilterItem>
              <FilterItem
                active={filter === "completed" && !activeProject && !activeContext}
                onClick={() => {
                  setFilter("completed");
                  setActiveProject(null);
                  setActiveContext(null);
                }}
              >
                Completed
                <Badge>{todos.filter((t) => t.completed).length}</Badge>
              </FilterItem>
              <FilterItem
                active={filter === "all" && !activeProject && !activeContext}
                onClick={() => {
                  setFilter("all");
                  setActiveProject(null);
                  setActiveContext(null);
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
                    active={activeProject === project}
                    onClick={() => {
                      setActiveProject(activeProject === project ? null : project);
                      setActiveContext(null);
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
                    active={activeContext === context}
                    onClick={() => {
                      setActiveContext(activeContext === context ? null : context);
                      setActiveProject(null);
                    }}
                  >
                    @{context}
                    <Badge>{todos.filter((t) => t.contexts.includes(context)).length}</Badge>
                  </FilterItem>
                ))}
              </FilterSection>
            )}
          </Sidebar>

          <TodoList>
            {filteredTodos.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>📝</EmptyStateIcon>
                <EmptyStateText>No tasks match your current filters</EmptyStateText>
                <Button
                  onClick={() => {
                    setFilter("all");
                    setActiveProject(null);
                    setActiveContext(null);
                  }}
                >
                  Clear filters
                </Button>
              </EmptyState>
            ) : (
              filteredTodos.map((todo, index) => (
                <TodoItemContainer key={index} completed={todo.completed}>
                  <Checkbox type="checkbox" checked={todo.completed} onChange={() => toggleTodoCompletion(index)} />
                  <TodoContent>
                    <TodoDescription completed={todo.completed}>{todo.description}</TodoDescription>
                    <TodoMeta>
                      {todo.priority && <PriorityTag priority={todo.priority}>Priority {todo.priority}</PriorityTag>}

                      {todo.completionDate && <DateTag>Completed: {formatDate(todo.completionDate)}</DateTag>}

                      {todo.projects.map((project) => (
                        <ProjectTag key={project}>+{project}</ProjectTag>
                      ))}

                      {todo.contexts.map((context) => (
                        <ContextTag key={context}>@{context}</ContextTag>
                      ))}

                      {Object.entries(todo.metadata).map(([key, value]) => (
                        <MetadataTag key={key}>
                          {key}:{value}
                        </MetadataTag>
                      ))}

                      {todo.creationDate && <DateTag>Created: {formatDate(todo.creationDate)}</DateTag>}
                    </TodoMeta>
                  </TodoContent>
                  <ActionButtons>
                    <IconButton onClick={() => openEditTaskModal(index)}>✏️</IconButton>
                    <IconButton onClick={() => deleteTask(index)}>🗑️</IconButton>
                  </ActionButtons>
                </TodoItemContainer>
              ))
            )}
          </TodoList>
        </MainContent>
      </AppContainer>

      {/* Task Modal */}
      {showModal && (
        <NewTodoModal
          onSave={onSave}
          onCancel={onCancel}
          editContext={editingTodoIndex != null ? { index: editingTodoIndex, item: todos[editingTodoIndex] } : undefined}
        />
      )}
    </>
  );
};

export default TodoEditor;
