//import './App.css';
import LoadButton from "./components/LoadButton"
import store from "./store"

function App() {
  return (
    <div className="App">
      <LoadButton store={store} />
    </div>
  );
}

export default App;
