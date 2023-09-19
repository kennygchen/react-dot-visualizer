export default function GenerateSubgraph(node) {
  const subgraph = {
    nodes: [],
    links: [],
  };
  const parentNode = {
    key: node.key,
    color: node.color,
    attributes: {
      label: node.attributes.label,
      modularity_class: node.attributes.modularity_class,
      MemoryObject: node.attributes.MemoryObject,
      Offset: node.attributes.Offset,
    },
  };
  subgraph.nodes.push(parentNode);

  const neighborsSet = new Set(node.neighbors);
  const linksSet = new Set(node.links);

  for (const neighbor of neighborsSet) {
    console.log(neighbor);
    const nodeCopy = {
      key: neighbor.key,
      color: neighbor.color,
      attributes: {
        label: neighbor.attributes.label,
        modularity_class: neighbor.attributes.modularity_class,
        MemoryObject: neighbor.attributes.MemoryObject,
        Offset: neighbor.attributes.Offset,
      },
    };
    subgraph.nodes.push(nodeCopy);
  }

  for (const link of linksSet) {
    const linkCopy = {
      source: link.source.key,
      target: link.target.key,
      color: link.color,
      attributes: {
        weight: link.attributes.weight,
      },
    };
    subgraph.links.push(linkCopy);
  }
  return subgraph;
}
