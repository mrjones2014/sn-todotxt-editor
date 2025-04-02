import { useEffect, useState } from "react";
import snApi from "sn-extension-api";
import TodoEditor from "./TodoEditor";
import { FilterFields } from "./Filters";

const StandardNotesTodoTxtEditor = () => {
  const [file, setFile] = useState(snApi.text);
  const [filters, setFilters] = useState<FilterFields>(snApi.meta?.lastUsedFilters ?? {});

  useEffect(() => {
    snApi.text = file;
  }, [file]);

  useEffect(() => {
    snApi.meta = { ...(snApi.meta ?? {}), lastUsedFilters: filters };
  }, [filters]);

  return (
    <TodoEditor
      fileContents={file}
      onFileChanged={setFile}
      editingDisabled={snApi.locked}
      isMobile={snApi.isRunningInMobileApplication}
      initialFilters={filters}
      onFiltered={setFilters}
    />
  );
};

export default StandardNotesTodoTxtEditor;
