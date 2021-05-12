import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Landing from "./LandingPage/Landing";
import ChartsHome from "./Charts/ChartsHome";
import Restaurant from "./RestaurantPage/Restaurant";

function App() {
  return (
    <HashRouter className="App">
      <Navbar />
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/landing/:id" component={Landing} />
        <Route path="/restaurants/:id" component={Restaurant} />
        <Route path="/charts/:zip" component={ChartsHome} />
      </div>
    </HashRouter>
  );
}

export default App;
