import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./component/LogIn/LogIn";
import Map from "./component/Map/Map";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <LogIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
