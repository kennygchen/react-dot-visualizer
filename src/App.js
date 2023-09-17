import "./App.css";
import FileUploader from "./FileUploader";
import PopUp from "./PopUp";
import { useMemo, useState, useCallback, useRef } from "react";
import { ForceGraph3D } from "react-force-graph";
import miserables from "./dataset/miserables.json";
import gdot from "./dataset/gdot new.json";
import * as THREE from "three";

function Output({ input }) {
  const NODE_R = 6;
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const [popUp, setPopUp] = useState(false);

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

  const handleLinkHover = (link) => {};

  const handleNodeClick = (node) => {
    setPopUp(true);
  };

  return (
    <div className="container">
      <ForceGraph3D
        graphData={data}
        nodeId="key"
        nodeLabel={(node) => node.attributes.label}
        nodeRelSize={NODE_R}
        nodeAutoColorBy={(node) => node.attributes.modularity_class}
        nodeThreeObject={(node) =>
          node.attributes.MemoryObject != "null"
            ? new THREE.Mesh(
                new THREE.BoxGeometry(15, 15, 15),
                new THREE.MeshStandardMaterial({
                  color: node.color,
                  transparent: true,
                  opacity: 0.75,
                  emissive: "#a1a1a1",
                })
              )
            : false
        }
        linkSource="source"
        linkTarget="target"
        linkAutoColorBy={(link) => link.source}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 2 : 0
        }
        linkWidth={(link) => (highlightLinks.has(link) ? 3 : 1)}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onNodeClick={handleNodeClick}
      />
      <PopUp className="overlay" open={popUp} onClose={() => setPopUp(false)} />
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
    <div>
      {/* <div className="App-input">
        <div>Definition</div>
        <FileUploader handleFile={handleFile} />
        {fileName ? <p>Uploaded file: {fileName}</p> : null}
      </div> */}
      <Output input={data} />
    </div>
  );
}
