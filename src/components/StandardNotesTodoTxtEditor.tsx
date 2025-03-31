import { useEffect, useState } from "react";
import snApi from "sn-extension-api";
import { deserializeFile, serializeFile } from "todos/parser";
import TodoEditor from "./TodoEditor";

const StandardNotesTodoTxtEditor = () => {
  const [todos, setTodos] = useState(deserializeFile(snApi.text));
  useEffect(() => {
    snApi.text = serializeFile(todos);
  }, [todos]);

  return <TodoEditor todos={todos} onTodosChanged={setTodos} />;
};

export default StandardNotesTodoTxtEditor;
