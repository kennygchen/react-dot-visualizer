function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ key: i })),
    links: [...Array(N).keys()]
      .filter((key) => key)
      .map((key) => ({
        [reverse ? "target" : "source"]: key,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (key - 1)),
      })),
  };
}

export default genRandomTree;
