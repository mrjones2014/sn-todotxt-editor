import { useState } from "react";
import { TodoItem } from "todos/types";
import {
  MetadataKeyInput,
  AddButton,
  CloseButton,
  FormGroup,
  Input,
  Label,
  MetadataInputGroup,
  MetadataValueInput,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  RemoveTagButton,
  Select,
  Tag,
  TagInput,
  TagInputField,
  TagsContainer,
  SecondaryButton,
  Button,
} from "./StyledComponents";
import { serializeLine } from "todos/parser";

interface EditContext {
  index: number;
  item: TodoItem;
}

interface NewTodoModalProps {
  editContext?: EditContext;
  onSave: (todo: TodoItem, existingIndex?: number) => void;
  onCancel: () => void;
}

const NewTodoModal = ({ onSave, onCancel, editContext }: NewTodoModalProps) => {
  const [taskDescription, setTaskDescription] = useState(editContext?.item.description ?? "");
  const [taskPriority, setTaskPriority] = useState(editContext?.item.priority ?? "");
  const [taskProjects, setTaskProjects] = useState<string[]>(editContext?.item.projects ?? []);
  const [taskContexts, setTaskContexts] = useState<string[]>(editContext?.item.contexts ?? []);
  const [taskMetadata, setTaskMetadata] = useState<Record<string, string>>(editContext?.item.metadata ?? {});
  const [newProject, setNewProject] = useState("");
  const [newContext, setNewContext] = useState("");
  const [newMetadataKey, setNewMetadataKey] = useState("");
  const [newMetadataValue, setNewMetadataValue] = useState("");

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

  const removeMetadata = (key: string) => {
    const newMetadata = { ...taskMetadata };
    delete newMetadata[key];
    setTaskMetadata(newMetadata);
  };

  const saveTask = () => {
    if (!taskDescription.trim()) return;

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

    newTodo.raw = serializeLine(newTodo);

    onSave(newTodo, editContext?.index);
  };

  const addProject = () => {
    if (newProject.trim() && !taskProjects.includes(newProject.trim())) {
      setTaskProjects([...taskProjects, newProject.trim()]);
      setNewProject("");
    }
  };

  const addContext = () => {
    if (newContext.trim() && !taskContexts.includes(newContext.trim())) {
      setTaskContexts([...taskContexts, newContext.trim()]);
      setNewContext("");
    }
  };

  const removeProject = (project: string) => {
    setTaskProjects(taskProjects.filter((p) => p !== project));
  };

  const removeContext = (context: string) => {
    setTaskContexts(taskContexts.filter((c) => c !== context));
  };

  const onSaveDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let meta = taskMetadata;
    taskMetadata.due = e.target.value;
    setTaskMetadata(meta);
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{!!editContext ? "Edit Task" : "Add New Task"}</ModalTitle>
          <CloseButton onClick={onCancel}>×</CloseButton>
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
            <Label>Due Date</Label>
            <Input type="date" onChange={onSaveDueDate} value={taskMetadata.due} />
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
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <Button onClick={saveTask} disabled={taskDescription == ""}>
            {!!editContext ? "Update Task" : "Add Task"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTodoModal;
