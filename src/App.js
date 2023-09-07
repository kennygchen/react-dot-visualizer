import "./App.css";
import { Graphviz } from "graphviz-react";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import miserables from "./dataset/miserables.json";

const GraphvizOptions = {
  // height: Math.floor(innerHeight * 0.7),
  width: 1200,
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

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}

function Output({ data }) {
  return (
    <div className="App-output">
      <div>Graph Visualization</div>
      <ForceGraph3D className="graph" graphData={data} />
      {/* <Graphviz className="graph" options={GraphvizOptions} dot={dot} /> */}
    </div>
  );
}

export default function App() {
  // const [myData, setMyData] = useState(data);
  const [data, setData] = useState(genRandomTree());
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (file) => {
      const text = file.target.result;
      console.log(text);
      setData(text);
      // alert(text);
    };
    reader.readAsText(file);
    setFileName(file.name);
  };

  return (
    <div className="App">
      <div className="App-input">
        <div>Graphviz Definition</div>
        <FileUploader handleFile={handleFile} />
        {fileName ? <p>Uploaded file: {fileName}</p> : null}
      </div>
      <Output data={data} />
    </div>
  );
}
