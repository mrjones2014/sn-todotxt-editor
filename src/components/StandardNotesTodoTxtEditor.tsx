import { useEffect, useState } from "react";
import snApi from "sn-extension-api";
import TodoEditor from "./TodoEditor";

const StandardNotesTodoTxtEditor = () => {
  const [file, setFile] = useState(snApi.text);
  useEffect(() => {
    snApi.text = file;
  }, [file]);

  return <TodoEditor fileContents={file} onFileChanged={setFile} />;
};

export default StandardNotesTodoTxtEditor;
