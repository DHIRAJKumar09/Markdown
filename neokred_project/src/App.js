import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState(""); 
  const [htmlPreview, setHtmlPreview] = useState("");

 
  const handleMarkdownChange = async (e) => {
    const input = e.target.value;
    setMarkdown(input);

    try {
     
      const response = await axios.post("http://localhost:5000/convert", {
        markdown: input,
      });
      setHtmlPreview(response.data.html);
    } catch (error) {
      console.error("Error converting Markdown:", error);
    }
  };

  return (
    <div className="app">

      <header className="header">
        <h1>Markdown Live Preview Editor</h1>
      </header>


      <main className="main-content">
      
        <div className="editor-pane">
          <h2>Markdown Input</h2>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            className="textarea"
            placeholder="Type your Markdown here..."
          ></textarea>
        </div>

       
        <div className="preview-pane">
          <h2>HTML Preview</h2>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          ></div>
        </div>
      </main>

     
      <footer className="footer">
        <p>
          Built with React and Node.js |{" "}
         
        </p>
      </footer>
    </div>
  );
}

export default App;
