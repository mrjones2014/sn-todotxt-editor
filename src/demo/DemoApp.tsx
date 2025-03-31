import React, { useRef, useState } from "react";
import { TEST_DATA } from "./test-data";
import { MockStandardNotes } from "./mock-notes";

const mock = new MockStandardNotes(TEST_DATA, () => {
  const el = document.getElementById("last-saved");
  if (el) {
    el.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
  }
});

const DemoApp = () => {
  const iframeRef = useRef<HTMLIFrameElement>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [theme, setTheme] = useState("light");

  const onToggleDisabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(e.target.checked);
    mock.toggleLock(e.target.checked);
  };

  const onChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
    mock.toggleTheme(e.target.checked);
  };

  const onFrameLoad = () => {
    mock.onReady(iframeRef.current.contentWindow);
  };
  return (
    <div className="demo">
      <div className="content">
        <div className="content-header">
          <div>
            <input id="editingDisabled" type="checkbox" checked={disabled} onChange={onToggleDisabled}></input>
            <label htmlFor="editingDisabled"> Editing Disabled</label>
          </div>
          <div>
            <input id="isDark" type="checkbox" checked={theme === "dark"} onChange={onChangeTheme}></input>
            <label htmlFor="isDark"> Dark Theme</label>
          </div>
          <div id="last-saved"></div>
        </div>
        <iframe ref={iframeRef} src="index.html" onLoad={onFrameLoad} />
      </div>
    </div>
  );
};

export default DemoApp;
