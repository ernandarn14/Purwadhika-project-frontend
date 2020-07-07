import React, { Component } from 'react'

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="container text-center py-4">
                <div className="row">
                    <div className="col-12">
                        <h1>404</h1>
                        <h2 style={{ textDecoration: "none", color: "inherit" }}>Page Not Found!</h2>
                    </div>
                </div>
            </div>
        )
    }
}