import "./App.css";
// importing the getMatches component
import GetMatches from "./components/GetMatches";

function App() {
  return (
    <div className="App">
      {/* making an instance of the getMatches child component in the main app component */}
      <GetMatches />
    </div>
  );
}

export default App;
