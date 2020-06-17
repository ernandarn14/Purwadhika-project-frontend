import React from 'react'
import './Card.css'
import Button from '../Button/Button'
// import { Link } from 'react-router-dom'

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
                    <div className="d-flex justify-content-around mt-3">
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe192;</i>
                            <p style={{ color: "inherit" }}>{cookTime} menit</p>
                        </div>
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe556;</i>
                            <p style={{ color: "inherit" }}>{numbServings} orang</p>
                        </div>
                    </div><br />
                    <div className="d-flex justify-content-around">
                        <Button type="outlined">Tambah ke Rencana</Button>
                        <Button type="contained" className="ml-3">Lihat Resep</Button>
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