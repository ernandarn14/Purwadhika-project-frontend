import React from 'react'
import './Card.css'
// import Buttons from '../Button/Buttons'
// import { Link } from "react-router-dom";

export default class Card extends React.Component {
    render() {
        const { recipe } = this.props
        const { recipeName, numbServings, cookTime, recipeImage, users, postOption, rating } = recipe
        const { username } = users
        const renderList = () => {
            return (
                <>
                    <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                    <br />
                    <h6 style={{ color: "inherit" }} className="mt-2">{recipeName}</h6>
                    <p>Oleh: {username}</p>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <div className="d-flex details">
                            <i className="material-icons">&#xe87e;</i>
                            <p className="ml-2">{rating}</p>
                        </div>
                        <div className="d-flex ml-4">
                            {postOption === "premium" ? <p className="option">resep {postOption}</p> : null}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3 details">
                        <div className="d-flex details mx-3">
                            <i className="material-icons mr-2">&#xe192;</i>
                            <p style={{ color: "inherit" }}>{cookTime} menit</p>
                        </div>
                        <div className="d-flex details">
                            <i className="material-icons mr-2">&#xe556;</i>
                            <p style={{ color: "inherit" }}>{numbServings} orang</p>
                        </div>
                    </div><br />
                </>
            )
        }
        return (
            <div className="resep-card d-inline-block">
                {renderList()}
            </div>
        )
    }
}