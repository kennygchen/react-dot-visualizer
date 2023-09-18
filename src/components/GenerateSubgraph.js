function GenerateSubgraph(gData, memoryObjects) {
  for (let k in memoryObjects) {
    var parentNode = gData.nodes.find((node) => node.key === k);
    if (!parentNode) {
      parentNode = {
        key: k,
        attributes: {
          label: k,
          modularity_class: 0,
          MemoryObject: "null",
          Offset: "null",
        },
      };
    }
    var subgraph = {
      nodes: [parentNode],
      links: [],
    };
    for (let i in memoryObjects[k]) {
      var childNode = {
        key: memoryObjects[k][i].key,
        attributes: {
          label: memoryObjects[k][i].attributes.label,
          modularity_class: memoryObjects[k][i].attributes.modularity_class,
          MemoryObject: memoryObjects[k][i].attributes.MemoryObject,
          Offset: memoryObjects[k][i].attributes.Offset,
        },
      };
      var childLink = {
        key: memoryObjects[k][i].key,
        source: parentNode.key,
        target: memoryObjects[k][i].key,
        attributes: {
          weight: 1.0,
        },
      };
      subgraph.nodes.push(childNode);
      subgraph.links.push(childLink);
      memoryObjects[k][i].subgraph = subgraph;
    }
  }
}

export default GenerateSubgraph;
