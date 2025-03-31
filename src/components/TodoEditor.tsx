import React, { useEffect, useMemo, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { deserializeFile, serializeFile, serializeLine } from "todos/parser";
import { TodoItem } from "todos/types";
import {
  MenuButton,
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
  HamburgerIcon,
  IconButton,
  MainContent,
  MetadataTag,
  PriorityTag,
  ProjectTag,
  Sidebar,
  TodoContent,
  TodoDescription,
  TodoItemContainer,
  TodoList,
  TodoMeta,
  SidebarContent,
  Overlay,
  MainControlsContainer,
} from "./StyledComponents";
import NewTodoModal from "./NewTodoModal";
import Fuse from "fuse.js";
import SearchBar from "./SearchBar";

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
  fileContents: string;
  onFileChanged: (fileContents: string) => void;
  editingDisabled: boolean;
}

const TodoEditor = ({ fileContents, onFileChanged, editingDisabled }: TodoEditorProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [todos, setTodos] = useState<TodoItem[]>(deserializeFile(fileContents));
  const [filter, setFilter] = useState<"all" | "active" | "completed">("active");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTodoIndex, setEditingTodoIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    onFileChanged(serializeFile(todos));
  }, [todos]);

  const handleOverlayClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      fuse = new Fuse(todos, { keys: ["raw"] });
      filtered = fuse.search(searchText).map((result) => result.item);
    }
    return filtered.filter((todo) => {
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;

      if (activeProject && !todo.projects.includes(activeProject)) return false;

      if (activeContext && !todo.contexts.includes(activeContext)) return false;

      return true;
    });
  }, [todos, searchText, filter, activeProject, activeContext]);

  const toggleTodoCompletion = (index: number) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);

    if (todoIndex !== -1) {
      const todo = { ...newTodos[todoIndex] };
      todo.completed = !todo.completed;

      if (todo.completed) {
        todo.completionDate = new Date();
      } else {
        todo.completionDate = undefined;
      }

      todo.raw = serializeLine(todo);

      newTodos[todoIndex] = todo;
      setTodos(newTodos);
    }
  };

  const openAddTaskModal = () => {
    setEditingTodoIndex(null);
    setShowModal(true);
  };

  const openEditTaskModal = (index: number) => {
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);
    if (todoIndex !== -1) {
      setEditingTodoIndex(todoIndex);
      setShowModal(true);
    }
  };

  const deleteTask = (index: number) => {
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);
    if (todoIndex !== -1) {
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <GlobalStyle />

      <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        <HamburgerIcon />
      </MenuButton>

      <AppContainer sidebarOpen={sidebarOpen}>
        <Sidebar isOpen={sidebarOpen}>
          <SidebarContent>
            <FilterSection>
              <FilterTitle>Filters</FilterTitle>
              <FilterItem
                active={filter === "active"}
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
                active={filter === "completed"}
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
                active={filter === "all"}
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
                    }}
                  >
                    @{context}
                    <Badge>{todos.filter((t) => t.contexts.includes(context)).length}</Badge>
                  </FilterItem>
                ))}
              </FilterSection>
            )}
          </SidebarContent>
        </Sidebar>
        <Overlay isOpen={sidebarOpen && window.innerWidth <= 768} onClick={handleOverlayClick} />

        <MainContent>
          <MainControlsContainer>
            <SearchBar value={searchText} onChange={setSearchText} />
            {!editingDisabled && (
              <AddTaskButton onClick={openAddTaskModal}>
                <span>+ Add Task</span>
              </AddTaskButton>
            )}
          </MainControlsContainer>

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
                    setSearchText("");
                  }}
                >
                  Clear filters
                </Button>
              </EmptyState>
            ) : (
              filteredTodos.map((todo, index) => (
                <TodoItemContainer key={index} completed={todo.completed}>
                  {!editingDisabled && <Checkbox type="checkbox" checked={todo.completed} onChange={() => toggleTodoCompletion(index)} />}
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
                  {!editingDisabled && (
                    <ActionButtons>
                      <IconButton onClick={() => openEditTaskModal(index)}>✏️</IconButton>
                      <IconButton onClick={() => deleteTask(index)}>🗑️</IconButton>
                    </ActionButtons>
                  )}
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
