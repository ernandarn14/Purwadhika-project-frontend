import React from 'react'
import './Card.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

export default class Card extends React.Component {
    render() {
        const { resep } = this.props
        const { judulResep, jumlahPorsi, lamaMembuat, gambar } = resep
        const renderList = () => {
            return (
                <>
                    <img src={gambar} alt="" style={{ width: "350px", height: "350px", objectFit: "contain" }} />
                    <br/><br/>
                    <h4>{judulResep}</h4>
                    <p>Oleh: </p>
                    <div className="d-flex justify-content-around mt-3">
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe192;</i>
                            <h6 style={{ color: "inherit" }}>{lamaMembuat} menit</h6>
                        </div>
                        <div className="d-flex">
                            <i className="material-icons mr-2">&#xe556;</i>
                            <h6 style={{ color: "inherit" }}>{jumlahPorsi} orang</h6>
                        </div>
                        {/* <div className="d-flex">
                            <i className="material-icons mr-2">&#xe5d2;</i>
                            <h6>{jumlahBahan} bahan</h6>
                        </div> */}
                    </div><br/>
                    <div className="d-flex justify-content-center">
                        <Button type="contained" className="ml-3"><Link to="" style={{ textDecoration: "none", color: "inherit" }}>Lihat Resep</Link></Button>
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