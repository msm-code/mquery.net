import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import { API_URL } from "./config";

class RateLimitProgressBar extends Component {
    limitClass(percent) {
        if (percent > 70) {
            return "bg-success";
        }
        if (percent > 30) {
            return "bg-warning";
        }
        return "bg-danger";
    }

    progressBar() {
        const percent = (this.props.left * 100.0) / this.props.max;
        return (
            <div className="progress" style={{ marginBottom: "30px" }}>
                <div
                    className={"progress-bar " + this.limitClass(percent)}
                    role="progressbar"
                    style={{ width: percent + "%" }}
                >
                    {percent}%
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <b>
                    {this.props.title} ({this.props.left}/{this.props.max})
                </b>
                {this.progressBar()}
                <hr />
            </React.Fragment>
        );
    }
}

class RateLimitsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limits: [],
            error: null,
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + "/ratelimits")
            .then((response) => {
                this.setState({ limits: response.data });
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    }

    rateLimits() {
        return this.state.limits.map((limit) => {
            const title = {
                concurrent_query: "Concurrent queries",
                file_download: "File downloads",
                yara_match: "Yara matches",
            }[limit.mode];
            return (
                <RateLimitProgressBar
                    title={title}
                    left={limit.left}
                    max={limit.max}
                />
            );
        });
    }

    render() {
        return (
            <ErrorBoundary error={this.state.error}>
                <div className="container-fluid">
                    <h1 className="text-center mq-bottom">Rate limits</h1>
                    <div className="row">
                        <div className="col-md-2" />
                        <div className="col-md-8">{this.rateLimits()}</div>
                        <div className="col-md-2" />
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default RateLimitsPage;
