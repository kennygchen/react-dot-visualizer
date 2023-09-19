import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "../datasets/random-data";
import GenerateSubgraph from "./GenerateSubgraph";

export default function PopUp({ trigger, onClose, node }) {
  console.log(node);
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
          nodeAutoColorBy={(node) => node.attributes.modularity_class}
          linkSource="source"
          linkTarget="target"
          linkWidth={1}
          linkAutoColorBy={(link) => link.source}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={1}
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
