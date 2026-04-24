import { useState } from "react";

export default function TextEditor() {
  const [content, setContent] = useState("");

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing here..."
        rows={10}
        style={{ width: "100%" }}
      />

      {/* Preview */}
      <h3>Output HTML:</h3>
      <textarea value={content} readOnly rows={6} style={{ width: "100%" }} />
    </div>
  );
}
