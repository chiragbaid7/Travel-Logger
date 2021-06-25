import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import LogMap from "./components/Map";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Signin">
          <Signin />
        </Route>
        <Route path="/TravelLog">
          <LogMap />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
