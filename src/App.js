import "./App.css";
import { Graphviz } from "graphviz-react";
import { FileUploader } from "./FileUploader";
import { useMemo, useState, useCallback, useRef } from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import miserables from "./dataset/miserables.json";
import gdot from "./dataset/gdot new.json";
import { color } from "d3";
import * as THREE from "three";

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

  const handleNodeClick = (node) => {};

  return (
    <div className="App-output">
      <div>Graph Visualization</div>
      <ForceGraph3D
        className="graph"
        graphData={data}
        nodeId="key"
        nodeLabel={(node) => node.attributes.label}
        nodeRelSize={NODE_R}
        nodeAutoColorBy={(node) => node.attributes.modularity_class}
        nodeThreeObject={(node) =>
          node.attributes.MemoryObject != "null"
            ? new THREE.Mesh(
                new THREE.BoxGeometry(0.7 * 20, 0.7 * 20, 0.7 * 20),
                new THREE.MeshLambertMaterial({
                  color: "#16A0D4",
                  transparent: true,
                  opacity: 0.75,
                })
              )
            : console.log("hi")
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
    </div>
  );
}

// <ForceGraphVR
//   graphData={genRandomTree(100)}
//   nodeThreeObject={({ id }) =>
//     new THREE.Mesh(
//       [
//         new THREE.BoxGeometry(
//           Math.random() * 20,
//           Math.random() * 20,
//           Math.random() * 20
//         ),
//         new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
//         new THREE.CylinderGeometry(
//           Math.random() * 10,
//           Math.random() * 10,
//           Math.random() * 20
//         ),
//         new THREE.DodecahedronGeometry(Math.random() * 10),
//         new THREE.SphereGeometry(Math.random() * 10),
//         new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
//         new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2),
//       ][id % 7],
//       new THREE.MeshLambertMaterial({
//         color: Math.round(Math.random() * Math.pow(2, 24)),
//         transparent: true,
//         opacity: 0.75,
//       })
//     )
//   }
// />;

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
