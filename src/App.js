import "./App.css";
import { Graphviz } from "graphviz-react";

function Output() {
  const dot = "digraph {a -> b}";

  return (
    <div className="App-child">
      <div>Graph Visualization</div>
      <Graphviz dot={`digraph {a -> b; c; d -> c; a -> d;}`} />
    </div>
  );
}

function Input() {
  return (
    <form className="App-child">
      <div>Graphviz Definition</div>
      <textarea></textarea>
      <button>Submit</button>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <Input />
      <Output />
    </div>
  );
}

export default App;
