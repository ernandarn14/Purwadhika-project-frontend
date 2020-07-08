import React from "react"
import "./Footer.css"

class Footer extends React.Component{
    render(){
        return(
            <div className="footer d-flex align-items-end">
                <div className="row">
                    <div className="col-12">
                    <p className="copyright my-5 mx-5"> © 2020 Copyright: Kueku</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer