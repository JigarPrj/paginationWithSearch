import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link //@ts-ignore
} from "react-router-dom";
import Home from "./component/Home";
import Information from "./component/Information";
function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/info">
            <Information />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
