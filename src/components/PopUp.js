import { ForceGraph3D } from "react-force-graph";

function PopUp({ trigger, onClose, data }) {
  return trigger ? (
    <div className="pop-up-container">
      <p onClick={onClose} className="close-btn">
        +
      </p>
      <div className="pop-up-graph">
        <ForceGraph3D
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
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;
