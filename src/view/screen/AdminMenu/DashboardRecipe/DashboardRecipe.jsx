import React from 'react';
import "./DashboardRecipe.css"
import { Link } from "react-router-dom";
import Button from '../../../../component/Button/Buttons';
import Axios from "axios";
import { API_URL } from '../../../../constants/API';
import Buttons from '../../../../component/Button/Buttons';
import { connect } from 'react-redux';
import swal from 'sweetalert';


class DashboardRecipe extends React.Component {
    state = {
        recipeList: [],
        activePage: "admin",
        categoryList: [],
        recipeCategoryId: 0,
        ingredientLists: {
            ingredientName: [],
            id: 0
        },
        instructionLists: {
            recipeId: 0,
            instructionName: [],
            id: 0
        },
        inputIngredient: {
            input0: ""
        },
        inputStep: {
            input0: ""
        },
        editRecipe: [],
        category: "semua",
        sortList: "asc",
    }

    getRecipeData = (val) => {
        if (val === "semua") {
            Axios.get(`${API_URL}/resep/admin/${this.state.sortList}`)
                .then(res => {
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                    alert('Data Kosong')
                })
        } else {
            Axios.get(`${API_URL}/resep/admin/kategori/${this.state.sortList}?categoryName=${val}`)
                .then(res => {
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                    alert('Data Kosong')
                })
        }


    }

    getCategoryList = (val) => {
        Axios.get(`${API_URL}/kategori-resep`)
            .then(res => {
                console.log(res.data)
                this.setState({ categoryList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert('Data kategori Kosong')
            })
    }

    componentDidMount() {
        this.getRecipeData(this.state.category);
        this.getCategoryList()
    }

    editBtnHandler = (idx) => {
        this.setState({
            editRecipe: {
                ...this.state.recipeList[idx],
                ...this.state.ingredientLists[idx]
            }
        });
    };

    renderCategory = () => {
        const { categoryList } = this.state
        return categoryList.map((val, idx) => {
            const { id, recipeCategoryName } = val
            return (
                <option value={recipeCategoryName} key={id.toString()}>{recipeCategoryName}</option>
            )
        })
    }

    renderRecipeList = () => {
        const { recipeList, activePage } = this.state
        return recipeList.map((val, idx) => {
            const { recipeName, recipeCategory, users, uploadDate } = val
            const { username, role } = users
            const { recipeCategoryName } = recipeCategory
            const date = new Date(uploadDate)
            if (recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                if (activePage === "admin") {
                    if (role === "admin") {
                        return (
                            <tr key={val.id.toString()}>
                                <td>{recipeName}</td>
                                <td>{username}</td>
                                <td>{recipeCategoryName}</td>
                                <td>{date.toLocaleString('en-GB')}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Link to={`/admin/resep/edit/${val.id}`} style={{ color: "inherit" }}>
                                            <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                        </Link>
                                        <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                } else {
                    if (role === "pengguna") {
                        return (
                            <tr key={val.id.toString()}>
                                <td>{recipeName}</td>
                                <td>{username}</td>
                                <td>{recipeCategoryName}</td>
                                <td>{date.toLocaleString('en-GB')}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Link to={`/admin/resep/edit/${val.id}`} style={{ color: "inherit" }}>
                                            <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                        </Link>
                                        <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                }
            }
        })
    }

    deleteDataHandler = (id) => {
        swal({
            title: "Anda yakin untuk menghapus data?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(`${API_URL}/resep/hapus/${id}`)
                        .then(res => {
                            console.log(res.data)
                            this.getRecipeData()
                        })
                        .catch(err => {
                            console.log(err)
                            alert('Data Gagal Dihapus!')
                        })
                    swal("Data Berhasil Dihapus!", {
                        icon: "success",
                    });
                }
            });
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center mt-5">Dashboard Resep</h3>
                        <div className="d-flex justify-content-start my-5">
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "admin" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "admin" })}>
                                Admin
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "pengguna" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "pengguna" })}>
                                Pengguna
                            </Buttons>
                        </div>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Kategori:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getRecipeData(this.state.category)}
                                    onChange={(e) => this.setState({ category: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    {this.renderCategory()}
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Urutkan:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getRecipeData(this.state.category)}
                                    onChange={(e) => this.setState({ sortList: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        <Link to="/admin/tambah-resep" style={{ textDecoration: "none" }}>
                            <Button type="outlined" className="mt-5">
                                Tambah Resep
                            </Button>
                        </Link>
                        <table className="tips-table table table-bordered  mt-4">
                            <thead>
                                <tr>
                                    <th>Judul Resep</th>
                                    <th>Username</th>
                                    <th>Kategori</th>
                                    <th>Tanggal Unggah</th>
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

const mapStateToProps = (state) => {
    return {
        search: state.search,
    };
};

export default connect(mapStateToProps)(DashboardRecipe) 