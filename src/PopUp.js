import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "./dataset/random-data";
import { useRef } from "react";

const PopUp = ({ open, onClose, data }) => {
  console.log(data);
  // const random = genRandomTree(10);
  const fgRef = useRef();
  // console.log(random);

  const handleNodeClick = (node) => {
    // fgRef.current.pauseAnimation();
  };

  if (!open) {
    return null;
  } else {
    return (
      <div className="pop-up-container">
        <p onClick={onClose} className="close-btn">
          +
        </p>
        <div className="pop-up-graph">
          <ForceGraph3D
            ref={fgRef}
            graphData={data}
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
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>
    );
  }
};

export default PopUp;
