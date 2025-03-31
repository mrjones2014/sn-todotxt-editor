import React from "react";

import "./index.scss";
import { createRoot } from "react-dom/client";
import snApi from "sn-extension-api";
import StandardNotesTodoTxtEditor from "components/StandardNotesTodoTxtEditor";

const root = createRoot(document.getElementById("root"));

export const rerenderRoot = () => {
  root.render(
    <React.StrictMode>
      <StandardNotesTodoTxtEditor />
    </React.StrictMode>,
  );
};

snApi.initialize({
  debounceSave: 400,
});

snApi.subscribe(() => {
  rerenderRoot();
});
