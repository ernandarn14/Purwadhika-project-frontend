import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"

class RecipeDetails extends React.Component {
    state = {
        recipeDetailList: []
    }

    getRecipeDetails = () => {
        Axios.get(`${API_URL}/resep/${this.props.match.params.resepId}`, {
            params: {
                _expand: "pengguna",
                _embed: "detailBahan"
            }
        })
            .then(res => {
                console.log(res)
                this.setState({ recipeDetailList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    renderRecipeDetails = () => {
        const { recipeDetailList } = this.state
        return recipeDetailList.map(val => {
            const { judul, kategori, lamaMembuat, jumlahPorsi, gambar, keterangan } = val
            return (
                <>
                    <h3 className="text-center my-5">{judul}</h3>
                    <div className="row">
                        <div className="col-6">
                            <img src={gambar} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        </div>
                        <div className="col-6">
                            {/* <h6>{val.pengguna.namaLengkap}</h6> */}
                            <h6>{kategori}</h6>
                            <h6>{lamaMembuat}</h6>
                            <h6>{jumlahPorsi}</h6>
                            <h6>{keterangan}</h6>
                        </div>
                    </div>
                </>
            )
        })
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Resep Detail</h3>
                        {this.renderRecipeDetails()}
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeDetails