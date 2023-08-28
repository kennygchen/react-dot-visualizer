import "./App.css";
import { Graphviz } from "graphviz-react";
import { FileUploader } from "./FileUploader";
import { useState } from "react";

const GraphvizOptions = {
  // height: Math.floor(innerHeight * 0.7),
  // width: Math.floor(innerWidth * 0.75),
  scale: 1,
  tweenPrecision: 1,
  engine: "dot",
  keyMode: "title",
  convertEqualSidedPolygons: false,
  fade: true,
  growEnteringEdges: false,
  fit: false,
  tweenPaths: false,
  tweenShapes: false,
  useWorker: false,
  zoom: true,
};

function Output() {
  var dot = "digraph { a -> b;c; d -> c; a -> d; }";
  return (
    <div className="App-child">
      <div>Graph Visualization</div>
      <Graphviz className="graph" options={GraphvizOptions} dot={dot} />
    </div>
  );
}

function Input() {
  const [fileName, setFileName] = useState("");
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (file) => {
      const text = file.target.result;
      console.log(text);
      // alert(text);
    };
    reader.readAsText(file);
    setFileName(file.name);
  };

  return (
    <div className="App-child">
      <div>Graphviz Definition</div>
      <FileUploader handleFile={handleFile} />
      {fileName ? <p>Uploaded file: {fileName}</p> : null}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Input />
      <Output />
    </div>
  );
}

export default App;
