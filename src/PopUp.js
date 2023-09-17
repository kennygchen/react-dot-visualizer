import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "./dataset/random-data";

const PopUp = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="pop-up-container">
      <p onClick={onClose} className="close-btn">
        +
      </p>
      <div className="pop-up-graph">
        <ForceGraph3D
          graphData={genRandomTree(10)}
          width={1250}
          height={750}
          showNavInfo={false}
        />
      </div>
    </div>
  );
};

export default PopUp;
