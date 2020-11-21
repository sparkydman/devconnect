import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

const App = () => (
  <Router>
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
    </>
  </Router>
);

export default App;
