import { useMemo } from "react";

export default function GenerateSubgraph(node) {
  const subgraph = useMemo(() => {
    const graph = {
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
    graph.nodes.push(parentNode);

    const neighborsSet = new Set(node.neighbors);
    const linksSet = new Set(node.links);

    for (const neighbor of neighborsSet) {
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
      graph.nodes.push(nodeCopy);
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
      graph.links.push(linkCopy);
    }
    return graph;
  }, [node]);
  return subgraph;
}
