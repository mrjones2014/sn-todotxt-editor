import React, { useEffect, useMemo, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { serializeFile, serializeLine } from "todos/parser";
import { TodoItem } from "todos/types";
import {
  MetadataKeyInput,
  ActionButtons,
  AddTaskButton,
  AppContainer,
  Badge,
  Button,
  Checkbox,
  CloseButton,
  ContextTag,
  DateTag,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  FilterItem,
  FilterSection,
  FilterTitle,
  FormGroup,
  Header,
  IconButton,
  Input,
  Label,
  MainContent,
  MetadataTag,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  PriorityTag,
  ProjectTag,
  SecondaryButton,
  Sidebar,
  Title,
  TodoContent,
  TodoDescription,
  TodoItemContainer,
  TodoList,
  TodoMeta,
  Select,
  TagsContainer,
  Tag,
  RemoveTagButton,
  TagInput,
  TagInputField,
  AddButton,
  MetadataInputGroup,
  MetadataValueInput,
} from "./StyledComponents";

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

  // Form state
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskProjects, setTaskProjects] = useState<string[]>([]);
  const [taskContexts, setTaskContexts] = useState<string[]>([]);
  const [taskMetadata, setTaskMetadata] = useState<Record<string, string>>({});
  const [newProject, setNewProject] = useState("");
  const [newContext, setNewContext] = useState("");
  const [newMetadataKey, setNewMetadataKey] = useState("");
  const [newMetadataValue, setNewMetadataValue] = useState("");

  useEffect(() => {
    props.onTodosChanged(todos);
  }, [todos]);

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
    setTaskDescription("");
    setTaskPriority("");
    setTaskProjects([]);
    setTaskContexts([]);
    setTaskMetadata({});
    setShowModal(true);
  };

  // Open modal to edit task
  const openEditTaskModal = (index: number) => {
    const todoIndex = todos.findIndex((t) => t === filteredTodos[index]);
    if (todoIndex !== -1) {
      const todo = todos[todoIndex];
      setEditingTodoIndex(todoIndex);
      setTaskDescription(todo.description);
      setTaskPriority(todo.priority || "");
      setTaskProjects([...todo.projects]);
      setTaskContexts([...todo.contexts]);
      setTaskMetadata({ ...todo.metadata });
      setShowModal(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Add project to task
  const addProject = () => {
    if (newProject.trim() && !taskProjects.includes(newProject.trim())) {
      setTaskProjects([...taskProjects, newProject.trim()]);
      setNewProject("");
    }
  };

  // Remove project from task
  const removeProject = (project: string) => {
    setTaskProjects(taskProjects.filter((p) => p !== project));
  };

  // Add context to task
  const addContext = () => {
    if (newContext.trim() && !taskContexts.includes(newContext.trim())) {
      setTaskContexts([...taskContexts, newContext.trim()]);
      setNewContext("");
    }
  };

  // Remove context from task
  const removeContext = (context: string) => {
    setTaskContexts(taskContexts.filter((c) => c !== context));
  };

  // Add metadata to task
  const addMetadata = () => {
    if (newMetadataKey.trim() && newMetadataValue.trim()) {
      setTaskMetadata({
        ...taskMetadata,
        [newMetadataKey.trim()]: newMetadataValue.trim(),
      });
      setNewMetadataKey("");
      setNewMetadataValue("");
    }
  };

  // Remove metadata from task
  const removeMetadata = (key: string) => {
    const newMetadata = { ...taskMetadata };
    delete newMetadata[key];
    setTaskMetadata(newMetadata);
  };

  // Save task
  const saveTask = () => {
    if (!taskDescription.trim()) return;

    // Create new todo item
    const newTodo: TodoItem = {
      raw: "",
      completed: false,
      description: taskDescription.trim(),
      priority: taskPriority || undefined,
      creationDate: new Date(),
      projects: taskProjects,
      contexts: taskContexts,
      metadata: taskMetadata,
    };

    // Update raw string
    newTodo.raw = serializeLine(newTodo);

    if (editingTodoIndex !== null) {
      // Update existing todo
      const newTodos = [...todos];
      newTodos[editingTodoIndex] = newTodo;
      setTodos(newTodos);
    } else {
      // Add new todo
      setTodos([...todos, newTodo]);
    }

    closeModal();
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
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{editingTodoIndex !== null ? "Edit Task" : "Add New Task"}</ModalTitle>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Task Description</Label>
                <Input
                  value={taskDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskDescription(e.target.value)}
                  placeholder="What needs to be done?"
                  autoFocus
                />
              </FormGroup>

              <FormGroup>
                <Label>Priority</Label>
                <Select value={taskPriority} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTaskPriority(e.target.value)}>
                  <option value="">No Priority</option>
                  {["A", "B", "C", "D", "E"].map((priority) => (
                    <option key={priority} value={priority}>
                      Priority {priority}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Projects</Label>
                <TagsContainer>
                  {taskProjects.map((project) => (
                    <Tag key={project}>
                      +{project}
                      <RemoveTagButton onClick={() => removeProject(project)}>×</RemoveTagButton>
                    </Tag>
                  ))}
                </TagsContainer>
                <TagInput>
                  <TagInputField
                    value={newProject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProject(e.target.value)}
                    placeholder="Add project..."
                    onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && addProject()}
                  />
                  <AddButton onClick={addProject}>Add</AddButton>
                </TagInput>
              </FormGroup>

              <FormGroup>
                <Label>Contexts</Label>
                <TagsContainer>
                  {taskContexts.map((context) => (
                    <Tag key={context}>
                      @{context}
                      <RemoveTagButton onClick={() => removeContext(context)}>×</RemoveTagButton>
                    </Tag>
                  ))}
                </TagsContainer>
                <TagInput>
                  <TagInputField
                    value={newContext}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContext(e.target.value)}
                    placeholder="Add context..."
                    onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && addContext()}
                  />
                  <AddButton onClick={addContext}>Add</AddButton>
                </TagInput>
              </FormGroup>

              <FormGroup>
                <Label>Metadata</Label>
                <TagsContainer>
                  {Object.entries(taskMetadata).map(([key, value]) => (
                    <Tag key={key}>
                      {key}:{value}
                      <RemoveTagButton onClick={() => removeMetadata(key)}>×</RemoveTagButton>
                    </Tag>
                  ))}
                </TagsContainer>
                <MetadataInputGroup>
                  <MetadataKeyInput value={newMetadataKey} onChange={(e) => setNewMetadataKey(e.target.value)} placeholder="Key" />
                  <MetadataValueInput
                    value={newMetadataValue}
                    onChange={(e) => setNewMetadataValue(e.target.value)}
                    placeholder="Value"
                    onKeyDown={(e) => e.key === "Enter" && addMetadata()}
                  />
                  <AddButton onClick={addMetadata}>Add</AddButton>
                </MetadataInputGroup>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
              <Button onClick={saveTask}>{editingTodoIndex !== null ? "Update Task" : "Add Task"}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TodoEditor;
