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
            const { recipeName, recipeCategory, users } = val
            const { username } = users
            const {recipeCategoryName } = recipeCategory
            return (
                <tr>
                    <td>{recipeName}</td>
                    <td>{username}</td>
                    <td>{recipeCategoryName}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fa fa-edit" style={{ fontSize: "22px" }}></i>
                            <i className="material-icons ml-3">&#xe872;</i>
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
                        <Link to="/admin/tambah-resep" style={{ textDecoration: "none" }}>
                            <Button type="outlined">
                                Tambah Resep
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