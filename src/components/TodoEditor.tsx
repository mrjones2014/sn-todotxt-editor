import React, { useEffect, useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { deserializeFile, serializeFile, serializeLine } from "../todos/parser";
import type { TodoItem } from "../todos/types";
import {
  MenuButton,
  ActionButtons,
  AddTaskButton,
  AppContainer,
  Button,
  Checkbox,
  ContextTag,
  DateTag,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  HamburgerIcon,
  TrashIcon,
  PencilIcon,
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
import SearchBar from "./SearchBar";
import Filters, { FilterFields, FiltersComponent } from "./Filters";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

interface TodoEditorProps {
  fileContents: string;
  onFileChanged: (fileContents: string) => void;
  editingDisabled: boolean;
  isMobile: boolean;
  initialFilters: FilterFields | undefined;
  onFiltered: (fields: FilterFields) => void;
}

const TodoEditor = ({ fileContents, onFileChanged, editingDisabled, isMobile, initialFilters, onFiltered }: TodoEditorProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(isMobile || window.innerWidth > 768);
  const [todos, setTodos] = useState<TodoItem[]>(deserializeFile(fileContents));
  const [showModal, setShowModal] = useState(false);
  const [editingTodoIndex, setEditingTodoIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const filtersRef = useRef<FiltersComponent>(null);

  useEffect(() => {
    onFileChanged(serializeFile(todos));
  }, [onFileChanged, todos]);

  const handleOverlayClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const onSave = (todo: TodoItem, index?: number) => {
    if (index != null) {
      const newTodos = [...todos];
      newTodos[index] = todo;
      setTodos(newTodos);
    } else {
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
    }

    setShowModal(false);
  };

  const onCancel = () => {
    setEditingTodoIndex(null);
    setShowModal(false);
  };

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

  const handleOnFiltered = (items: TodoItem[], filters: FilterFields) => {
    setFilteredTodos(items);
    onFiltered(filters);
  };

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        <Sidebar isOpen={sidebarOpen}>
          <SidebarContent>
            <Filters todos={todos} onFiltered={handleOnFiltered} searchText={searchText} initialFilters={initialFilters} ref={filtersRef} />
          </SidebarContent>
        </Sidebar>
        <Overlay isOpen={sidebarOpen && window.innerWidth <= 768} onClick={handleOverlayClick} />

        <MainContent>
          <MainControlsContainer>
            <MenuButton
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <HamburgerIcon />
            </MenuButton>
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
                    filtersRef.current?.clearFilters();
                    setSearchText("");
                  }}
                >
                  Clear filters
                </Button>
              </EmptyState>
            ) : (
              filteredTodos.map((todo, index) => (
                <TodoItemContainer key={index} completed={todo.completed}>
                  {!editingDisabled && (
                    <Checkbox
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => {
                        toggleTodoCompletion(index);
                      }}
                    />
                  )}
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
                      <IconButton
                        color="warning"
                        onClick={() => {
                          openEditTaskModal(index);
                        }}
                      >
                        <PencilIcon />
                      </IconButton>
                      <IconButton
                        color="danger"
                        onClick={() => {
                          deleteTask(index);
                        }}
                      >
                        <TrashIcon />
                      </IconButton>
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
