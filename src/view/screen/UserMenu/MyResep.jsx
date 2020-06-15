import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { Link } from 'react-router-dom'
import Buttons from '../../../component/Button/Buttons'

class MyResep extends React.Component {
    state = {
        recipeList: []
    }

    getRecipeData = () => {
        Axios.get(`${API_URL}/recipes`, {
            params: {
                userId: this.props.user.id,
            }
        })
            .then(res => {
                console.log(res.data)
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
            const { recipeName, category, desc } = val
            return (
                <tr>
                    <td>{recipeName}</td>
                    <td>{category}</td>
                    <td>{desc}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to="" style={{ textDecoration: "none" }}>
                                <Buttons type="textual" >
                                    Edit
                                </Buttons>
                            </Link>
                            <Buttons type="outlined" className="mx-3">
                                Hapus
                            </Buttons>
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
                        <h3 className="text-center my-5">Resep Saya</h3>
                        <Link to="" style={{ textDecoration: "none" }}>
                            <Buttons type="outlined">
                                Tambah Resep
                            </Buttons>
                        </Link>
                        <table className="recipe-table table table-bordered  mt-4">
                            <thead>
                                <tr>
                                    <th>Judul Resep</th>
                                    <th>Kategori</th>
                                    <th>Keterangan</th>
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MyResep) 