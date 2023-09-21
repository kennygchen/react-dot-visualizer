export default function OverlayInfo(clicked) {
  if (!clicked.clicked) {
    return (
      <div className="overlay-container">
        <div>Left-click: view node/link info</div>
        <div>Reft-click: focus on node</div>
      </div>
    );
  } else if (clicked.clicked.source) {
    return (
      <div className="overlay-container">
        <div>Key: {clicked.clicked ? clicked.clicked.key : "null"}</div>
        <div>Source: {clicked.clicked ? clicked.clicked.source.key : "null"}</div>
        <div>Target: {clicked.clicked ? clicked.clicked.target.key : "null"}</div>
        <div>Weight: {clicked.clicked ? clicked.clicked.attributes.weight : "null"}</div>
      </div>
    );
  } else {
    return (
      <div className="overlay-container">
        <div>Key: {clicked.clicked ? clicked.clicked.key : "null"}</div>
        <div>
          Modularity class: {clicked.clicked ? clicked.clicked.attributes.modularity_class : "null"}
        </div>
        <div>
          Memory Object: {clicked.clicked ? clicked.clicked.attributes.MemoryObject : "null"}
        </div>
        <div>Offset: {clicked.clicked ? clicked.clicked.attributes.Offset : "null"}</div>
      </div>
    );
  }
}
