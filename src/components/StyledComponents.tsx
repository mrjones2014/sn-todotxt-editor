import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: var(--sn-stylekit-foreground-color);
`;

export const Button = styled.button`
  background-color: var(--sn-stylekit-info-color);
  color: var(--sn-stylekit-info-contrast-color);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: var(--sn-stylekit-info-color-darkened);
  }

  &:disabled {
    background-color: var(--sn-stylekit-passive-color-3);
    color: var(--sn-stylekit-passive-color-1);
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: var(--sn-stylekit-contrast-background-color);
  color: var(--sn-stylekit-foreground-color);

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  margin-top: 20px;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  width: 220px;
  padding-right: 20px;
  overflow-y: auto;
`;

export const TodoList = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--sn-stylekit-editor-background-color);
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
`;

export const FilterSection = styled.div`
  margin-bottom: 24px;
`;

export const FilterTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--sn-stylekit-passive-color-1);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${(props) => (props.active ? "var(--sn-stylekit-contrast-background-color)" : "transparent")};
  color: ${(props) => (props.active ? "var(--sn-stylekit-info-color)" : "var(--sn-stylekit-foreground-color)")};
  font-weight: ${(props) => (props.active ? "500" : "normal")};

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`;

export const Badge = styled.span`
  background-color: var(--sn-stylekit-passive-color-4);
  color: var(--sn-stylekit-passive-color-1);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: auto;
`;

export const TodoItemContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  opacity: ${(props) => (props.completed ? 0.6 : 1)};

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`;

export const Checkbox = styled.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const TodoContent = styled.div`
  flex: 1;
`;

export const TodoDescription = styled.div<{ completed: boolean }>`
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--sn-stylekit-foreground-color);
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

export const TodoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
`;

export const PriorityTag = styled.span<{ priority: string }>`
  background-color: ${(props) => {
    switch (props.priority) {
      case "A":
        return "var(--sn-stylekit-danger-color)";
      case "B":
        return "var(--sn-stylekit-warning-color)";
      case "C":
        return "var(--sn-stylekit-info-color)";
      default:
        return "var(--sn-stylekit-passive-color-3)";
    }
  }};
  color: ${(props) => (props.priority === "A" ? "white" : "black")};
  border-radius: 3px;
  padding: 2px 6px;
  font-weight: 500;
`;

export const ProjectTag = styled.span`
  background-color: var(--sn-stylekit-accessory-tint-color-5);
  color: white;
  border-radius: 3px;
  padding: 2px 6px;
`;

export const ContextTag = styled.span`
  background-color: var(--sn-stylekit-accessory-tint-color-4);
  color: white;
  border-radius: 3px;
  padding: 2px 6px;
`;

export const MetadataTag = styled.span`
  background-color: var(--sn-stylekit-passive-color-4);
  color: var(--sn-stylekit-passive-color-0);
  border-radius: 3px;
  padding: 2px 6px;
`;

export const DateTag = styled.span`
  color: var(--sn-stylekit-passive-color-1);
  font-size: 12px;
`;

export const AddTaskButton = styled(Button)`
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: var(--sn-stylekit-passive-color-1);
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--sn-stylekit-passive-color-3);
`;

export const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--sn-stylekit-background-color);
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--sn-stylekit-passive-color-1);

  &:hover {
    color: var(--sn-stylekit-foreground-color);
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--sn-stylekit-foreground-color);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const TagInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const TagInputField = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`;

export const AddButton = styled.button`
  background-color: var(--sn-stylekit-contrast-background-color);
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: var(--sn-stylekit-contrast-background-color);
  border-radius: 4px;
  font-size: 14px;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--sn-stylekit-passive-color-1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;

  &:hover {
    color: var(--sn-stylekit-danger-color);
  }
`;

export const MetadataInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`;

export const MetadataKeyInput = styled.input`
  min-width: 0; /* Critical to prevent overflow */
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`;

export const MetadataValueInput = styled.input`
  min-width: 0; /* Critical to prevent overflow */
  padding: 8px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--sn-stylekit-passive-color-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
    color: var(--sn-stylekit-foreground-color);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--sn-stylekit-background-color);
  color: var(--sn-stylekit-foreground-color);
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2372767e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 30px;

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color);
  }

  option {
    background-color: var(--sn-stylekit-background-color);
    color: var(--sn-stylekit-foreground-color);
  }

  /* For Firefox */
  @-moz-document url-prefix() {
    color: var(--sn-stylekit-foreground-color);
    background-color: var(--sn-stylekit-background-color);
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%; /* Full width */
  margin: 16px 0; /* Adjusted margins */
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  background-color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  color: var(--sn-stylekit-foreground-color, #ffffff);
  border: 1px solid var(--sn-stylekit-border-color, #3a3a3a);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: var(--sn-stylekit-info-color, #4a90e2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::placeholder {
    color: var(--sn-stylekit-foreground-color, #888888);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: var(--sn-stylekit-foreground-color, #888888);
  pointer-events: none;
  transition: color 0.2s ease;
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: "flex";
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--sn-stylekit-foreground-color, #888888);
  color: var(--sn-stylekit-contrast-background-color, #2a2a2a);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--sn-stylekit-contrast-foreground-color, #ffffff);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--sn-stylekit-info-color, #4a90e2);
  }
`;
