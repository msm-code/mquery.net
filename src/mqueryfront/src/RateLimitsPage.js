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
                <p>{this.props.note}</p>
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
            const note = {
                concurrent_query: `You can't have more than ${limit.max} queries at the same time. You can cancel queries you're not interested in.`,
                file_download: `You can't download more than ${limit.max} files. All the files are publicly available, so there is no need to kill our servers.`,
                yara_match: `The server won't do more than ${limit.max} yara matches for you. For very precise queries, even 100 matches is enough so this can get you a long way.`,
            }[limit.mode];
            return (
                <RateLimitProgressBar
                    title={title}
                    left={limit.left}
                    max={limit.max}
                    note={note}
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
                        <div className="col-md-8">
                            <div class="card mb-5">
                                <div class="card-body">
                                    <p>
                                        Rate-limits are not a feature of mquery.{" "}
                                    </p>
                                    I've forked it and added rate limits to keep
                                    this service stable and available for
                                    everyone. I may increase them later. All
                                    limits are per 24h and update every minute.
                                </div>
                            </div>
                            {this.rateLimits()}
                        </div>
                        <div className="col-md-2" />
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default RateLimitsPage;
