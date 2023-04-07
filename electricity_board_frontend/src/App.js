import {
  Route,
  Redirect,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavBar } from "./components/NavBar";

import { Home } from "./pages/Home";
import { Analytics } from "./pages/Analytics";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Container className="mt-4">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard" component={Home}  exact/>
            <Route path="/analytics" component={Analytics} exact/>
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
