import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "../datasets/random-data";
import GenerateSubgraph from "./GenerateSubgraph";
import * as THREE from "three";
import { useCallback, useMemo } from "react";

export default function PopUp({ trigger, onClose, node, onNodeClick }) {
  return trigger ? (
    <div className="pop-up-container">
      <p onClick={onClose} className="close-btn">
        +
      </p>
      <div className="pop-up-graph">
        <ForceGraph3D
          graphData={GenerateSubgraph(node)}
          nodeId="key"
          nodeLabel={(node) => node.attributes.label}
          nodeThreeObject={(node) =>
            node.attributes.MemoryObject !== "null"
              ? new THREE.Mesh(
                  new THREE.BoxGeometry(10, 10, 10),
                  new THREE.MeshLambertMaterial({
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
          linkWidth={1}
          linkAutoColorBy={(link) => link.source}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={1}
          linkDirectionalParticleSpeed={0.0025}
          onNodeClick={(node) => onNodeClick(node)}
          width={1250}
          height={750}
          showNavInfo={false}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
