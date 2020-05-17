import React, { Component } from "react";

class AboutPage extends Component {
    about() {
        return (
            <React.Fragment>
                <li>
                    Public instance of{" "}
                    <a href="https://github.com/CERT-Polska/mquery/">mquery</a>.
                    This is a free service and an experiment, it can disappear
                    at any time, and I give absolutely not warranty etc etc.
                </li>

                <li>
                    <b>
                        All samples come from the{" "}
                        <a href="https://twitter.com/vxunderground">
                            vx-underground
                        </a>
                    </b>{" "}
                    collection. Thanks for their work collecting the samples,
                    and for letting me use their data.
                </li>

                <li>
                    There are some <a href="/ratelimits">ratelimits</a> to keep
                    the service stable. If for some reason they're not enough
                    for you, consider hosting mquery yourself or contact me if
                    that's not possible.
                </li>

                <li>
                    By default user-uploader rules by are not visible to other
                    users. I will not spy on the uploaded rules or steal them,
                    but you should not trust me, so please{" "}
                    <b>don't try any TLP;RED hunts</b>.
                </li>

                <li>
                    Hosted by{" "}
                    <b>
                        <a href="https://twitter.com/msmcode">msm</a>
                    </b>
                    . You can read my old blogging attempts at{" "}
                    <b>
                        <a href="https://tailcall.net">tailcall.net</a>
                    </b>
                    . I work at{" "}
                    <b>
                        <a href="https://cert.pl/en">cert.pl</a>
                    </b>
                    . Human reader should guess my contact emails at this point.
                </li>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center mq-bottom">About</h1>

                <div className="row">
                    <div className="col-md-2" />
                    <div className="col-md-8 text-justify">{this.about()}</div>
                    <div className="col-md-2" />
                </div>
            </div>
        );
    }
}

export default AboutPage;
