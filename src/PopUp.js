import { ForceGraph3D } from "react-force-graph";
import genRandomTree from "./dataset/random-data";

const PopUp = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <p onClick={onClose} className="clossBtn">
        X
      </p>
      <ForceGraph3D
        graphData={genRandomTree(10)}
        backgroundColor="#090c33"
        width={1100}
        height={600}
      />
    </div>
  );
};

export default PopUp;
