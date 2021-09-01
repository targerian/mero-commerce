import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter,
  BrowserRouter as Link,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
