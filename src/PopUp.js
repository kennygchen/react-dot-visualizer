import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "./dataset/random-data";

const PopUp = ({ open, onClose, data }) => {
  if (!open) return null;
  // console.log(data);
  return (
    <div className="pop-up-container">
      <p onClick={onClose} className="close-btn">
        +
      </p>
      <div className="pop-up-graph">
        <ForceGraph3D
          graphData={data}
          nodeId="key"
          nodeLabel={(node) => node.attributes.label}
          linkSource="source"
          linkTarget="target"
          linkWidth={1}
          width={1250}
          height={750}
          showNavInfo={false}
        />
      </div>
    </div>
  );
};

export default PopUp;
