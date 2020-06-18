import React from 'react'
import './Card.css'
import Button from '../Button/Button'
import Buttons from '../Button/Buttons'

export default class Card extends React.Component {
    render() {
        const { recipe } = this.props
        const { recipeName, numbServings, cookTime, image, user } = recipe
        const { fullName } = user
        const renderList = () => {
            return (
                <>
                    <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                    <br />
                    <h6 style={{ color: "inherit" }} className="mt-2">{recipeName}</h6>
                    <p>Oleh: {fullName}</p>
                    <div className="d-flex justify-content-around mt-3 details">
                        <div className="d-flex details">
                            <i className="material-icons mr-2">&#xe192;</i>
                            <p style={{ color: "inherit" }}>{cookTime} menit</p>
                        </div>
                        <div className="d-flex details">
                            <i className="material-icons mr-2">&#xe556;</i>
                            <p style={{ color: "inherit" }}>{numbServings} orang</p>
                        </div>
                    </div><br />
                    <div className="d-flex justify-content-around">
                        <Buttons type="outlined">Tambah ke Rencana</Buttons>
                        <Buttons type="contained" className="ml-3">Lihat Resep</Buttons>
                    </div>
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