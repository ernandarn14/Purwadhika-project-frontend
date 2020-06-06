import React from 'react';
import "./DashboardRecipe.css"
import { Link } from "react-router-dom";
import Button from '../../../../component/Button/Buttons';
import Axios from "axios";
import { API_URL } from '../../../../constants/API';


class DashboardRecipe extends React.Component {
    state = {
        recipeList: []
    }

    getRecipeData = () => {
        Axios.get(`${API_URL}/resep`)
            .then(res => {
                this.setState({ recipeList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert('Data Kosong')
            })
    }

    componentDidMount() {
        this.getRecipeData();
    }

    renderRecipeList = () => {
        const { recipeList } = this.state
        return recipeList.map(val => {
            const { judul, kategori, id } = val
            return (
                <tr>
                    <td>{judul}</td>
                    <td>{id}</td>
                    <td>{kategori}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to="" style={{ textDecoration: "none" }}>
                                <Button type="textual" >
                                    Edit
                                </Button>
                            </Link>
                            <Button type="outlined" className="mx-3">
                                Hapus
                            </Button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Resep</h3>
                        <Link to="" style={{ textDecoration: "none" }}>
                            <Button type="contained">
                                Tambah Artikel Tips dan Trik
                            </Button>
                        </Link>
                        <table className="recipe-table table table-bordered  mt-4">
                            <thead>
                                <tr>
                                    <th>Judul Resep</th>
                                    <th>Username</th>
                                    <th>Kategori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRecipeList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardRecipe