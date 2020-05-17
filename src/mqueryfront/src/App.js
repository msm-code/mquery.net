import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import QueryPage from "./QueryPage";
import RecentPage from "./RecentPage";
import StatusPage from "./StatusPage";
import ConfigPage from "./ConfigPage";
import RateLimitsPage from "./RateLimitsPage";
import AboutPage from "./AboutPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation />

                <Switch>
                    <Route exact path="/" component={QueryPage} />
                    <Route path="/query/:hash" component={QueryPage} />
                    <Route exact path="/recent" component={RecentPage} />
                    <Route exact path="/config" component={ConfigPage} />
                    <Route exact path="/status" component={StatusPage} />
                    <Route
                        exact
                        path="/ratelimits"
                        component={RateLimitsPage}
                    />
                    <Route exact path="/about" component={AboutPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
