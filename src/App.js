import "./App.css";
// import FileUploader from "./components/FileUploader";
import PopUp from "./components/PopUp";
import GenerateSubgraph from "./components/GenerateSubgraph";
import OverlayInfo from "./components/OverlayInfo";
import { useMemo, useState, useRef, useCallback } from "react";
import { ForceGraph3D } from "react-force-graph";
import gdot from "./datasets/gdot.json";
import * as THREE from "three";

function Output({ input }) {
  const fgRef = useRef();
  const NODE_R = 6;
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const [hoverLink, setHoverLink] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [subgraphNode, setSubgraphNode] = useState();

  const data = useMemo(() => {
    const gData = input;

    // cross-link node objects
    gData.links.forEach((link) => {
      const source = gData.nodes.find((node) => node.key === link.source);
      const target = gData.nodes.find((node) => node.key === link.target);

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
  }, [input]);

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
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }
    setHoverLink(link || null);
    updateHighlight();
  };

  const handleNodeClick = (node) => {
    setClicked(node);
    if (node.attributes.MemoryObject !== "null") {
      setSubgraphNode(node);
      setPopUp(true);
      fgRef.current.pauseAnimation();
    }
  };

  const handleNodeRightClick = useCallback(
    (node) => {
      setClicked(node);
      const distance = 300;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000 // ms transition duration
      );
    },
    [fgRef]
  );

  const handleOnClose = () => {
    setPopUp(false);
    fgRef.current.resumeAnimation();
  };

  return (
    <div className="container">
      <OverlayInfo clicked={clicked} />
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeId="key"
        nodeLabel={(node) => node.attributes.label}
        nodeRelSize={NODE_R}
        nodeAutoColorBy={(node) => node.attributes.modularity_class}
        nodeThreeObject={(node) =>
          node === hoverNode && node.attributes.MemoryObject !== "null"
            ? new THREE.Mesh(
                new THREE.BoxGeometry(15, 15, 15),
                new THREE.MeshLambertMaterial({
                  color: node.color,
                  transparent: false,
                  // opacity: 0.75,
                  emissive: "#ababab",
                })
              )
            : highlightNodes.has(node) && node.attributes.MemoryObject !== "null"
            ? new THREE.Mesh(
                new THREE.BoxGeometry(15, 15, 15),
                new THREE.MeshLambertMaterial({
                  color: node.color,
                  transparent: false,
                  // opacity: 0.75,
                  emissive: "#ababab",
                })
              )
            : node === hoverNode
            ? new THREE.Mesh(
                new THREE.SphereGeometry(6, 8, 8),
                new THREE.MeshLambertMaterial({
                  color: node.color,
                  transparent: false,
                  // opacity: 0.75,
                  emissive: "#ababab",
                })
              )
            : node.attributes.MemoryObject !== "null"
            ? new THREE.Mesh(
                new THREE.BoxGeometry(15, 15, 15),
                new THREE.MeshLambertMaterial({
                  color: node.color,
                  transparent: true,
                  opacity: 0.75,
                  emissive: "#a1a1a1",
                })
              )
            : highlightNodes.has(node)
            ? new THREE.Mesh(
                new THREE.SphereGeometry(6, 8, 8),
                new THREE.MeshLambertMaterial({
                  color: node.color,
                  transparent: false,
                  // opacity: 0.75,
                  emissive: "#ababab",
                })
              )
            : false
        }
        linkSource="source"
        linkTarget="target"
        linkColor={(link) => link.source.color}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) => (highlightLinks.has(link) ? 2 : 0)}
        linkWidth={(link) => (highlightLinks.has(link) ? 4 : 1.5)}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onLinkClick={(link) => setClicked(link)}
        onNodeClick={handleNodeClick}
        onNodeRightClick={handleNodeRightClick}
      />
      <PopUp
        trigger={popUp}
        onClose={handleOnClose}
        node={subgraphNode}
        onClick={setClicked}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        highlightLinks={highlightLinks}
        highlightNodes={highlightNodes}
        hoverNode={hoverNode}
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
