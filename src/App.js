import "./App.css";
import { Graphviz } from "graphviz-react";
import { FileUploader } from "./FileUploader";
import { useMemo, useState, useCallback } from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import miserables from "./dataset/miserables.json";
import gdot from "./dataset/gdot new.json";
import { color } from "d3";

function Output({ input }) {
  const NODE_R = 6;
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const data = useMemo(() => {
    const gData = input;

    // cross-link node objects
    gData.links.forEach((link) => {
      const source = gData.nodes.find((node) => node.key == link.source);
      const target = gData.nodes.find((node) => node.key == link.target);

      !source.neighbors && (source.neighbors = []);
      !target.neighbors && (target.neighbors = []);
      source.neighbors.push(target);
      target.neighbors.push(source);
      !source.links && (source.links = []);
      !target.links && (target.links = []);
      source.links.push(link);
      target.links.push(link);
    });

    return gData;
  }, []);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
      node.links.forEach((link) => highlightLinks.add(link));
    }
    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link) => {
    // console.log(link);
  };

  return (
    <div className="App-output">
      <div>Graph Visualization</div>
      <ForceGraph3D
        className="graph"
        graphData={data}
        nodeId="key"
        nodeLabel={(d) => d.attributes.label}
        nodeRelSize={NODE_R}
        linkSource="source"
        linkTarget="target"
        nodeAutoColorBy={(d) => d.attributes.modularity_class}
        linkAutoColorBy={(d) => d.source}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 2 : 0
        }
        linkWidth={(link) => (highlightLinks.has(link) ? 3 : 1)}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
      />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(gdot);
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (file) => {
      const text = file.target.result;
      var json = JSON.parse(text);
      console.log(json);
      setData(json);
      // alert(text);
    };
    reader.readAsText(file);
    setFileName(file.name);
  };

  return (
    <div className="App">
      <div className="App-input">
        <div>Definition</div>
        <FileUploader handleFile={handleFile} />
        {fileName ? <p>Uploaded file: {fileName}</p> : null}
      </div>
      <Output input={data} />
    </div>
  );
}
