export default function OverlayInfo(node) {
  console.log(node.node);
  return (
    <div className="overlay-container">
      <div>Key: {node.node ? node.node.key : "null"}</div>
      <div>Modularity class: {node.node ? node.node.attributes.modularity_class : "null"}</div>
      <div>Memory Object: {node.node ? node.node.attributes.MemoryObject : "null"}</div>
      <div>Offset: {node.node ? node.node.attributes.Offset : "null"}</div>
    </div>
  );
}
