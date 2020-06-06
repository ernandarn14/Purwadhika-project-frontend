import React from 'react'
import './Card.css'
import Button from '../Button/Button'
// import { Link } from 'react-router-dom'

export default class Card extends React.Component {
    render() {
        const { resep } = this.props
        const { judul, jumlahPorsi, lamaMembuat, gambar, idPengguna } = resep
        const renderList = () => {
            return (
                <>
                    <img src={gambar} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                    <br />
                    <h6 style={{ color: "inherit" }} className="mt-2">{judul}</h6>
                    <p>Oleh: {idPengguna}</p>
                    <div className="d-flex justify-content-around mt-3">
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe192;</i>
                            <p style={{ color: "inherit" }}>{lamaMembuat} menit</p>
                        </div>
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe556;</i>
                            <p style={{ color: "inherit" }}>{jumlahPorsi} orang</p>
                        </div>
                        {/* <div className="d-flex">
                            <i className="material-icons mr-2">&#xe5d2;</i>
                            <h6>{jumlahBahan} bahan</h6>
                        </div> */}
                    </div><br />
                    <div className="d-flex justify-content-center">
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