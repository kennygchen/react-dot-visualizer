export default function GenerateSubgraph(node) {
  const subgraph = {
    nodes: [],
    links: [],
  };
  const neighborHalf = node.neighbors.length / 2;
  const linksHalf = node.links.length / 2;
  subgraph.nodes.push(...node.neighbors.slice(0, neighborHalf));
  subgraph.links.push(...node.links.slice(0, linksHalf));
  subgraph.nodes.push(node);
  return subgraph;
}
