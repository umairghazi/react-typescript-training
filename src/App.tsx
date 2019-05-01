import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Demos from "./Demos";
import PayeesManager from "./payees/PayeesManager";

const App: React.FC = () => {
  return (
    <Router>
      <main className="container">
        <header>
          <h1>The esri Personal Banking System</h1>
          <p>Serving the community since Monday morning</p>
          <small>Yes, this Monday</small>
          <hr />
        </header>
        <Navbar />

        <Route path="/home" component={Home} />
        <Route path="/demos" component={Demos} />
        <Route path="/payees" component={PayeesManager} />
      </main>
    </Router>
  );
};

export default App;
