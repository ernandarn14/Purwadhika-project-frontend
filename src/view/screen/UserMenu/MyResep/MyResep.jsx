import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { Link } from 'react-router-dom'
import Buttons from '../../../../component/Button/Buttons'
import swal from "sweetalert";
import { Alert } from 'reactstrap'

class MyResep extends React.Component {
    state = {
        selectedFile: null,
        recipeList: [],
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
        recipeCategoryId: 0,
        ingredientEditName: [],
        instructionEditName: [],
        categoryList: [],
        category: "semua",
        sortList: "asc",
    }

    getRecipeData = () => {
        if (this.state.category === "semua") {
            Axios.get(`${API_URL}/resep/pengguna/${this.props.user.id}/${this.state.sortList}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                    // alert('Data Kosong')
                })
        } else {
            Axios.get(`${API_URL}/resep/pengguna/${this.props.user.id}/kategori/${this.state.sortList}?categoryName=${this.state.category}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                    // alert('Data Kosong')
                })
        }
    }

    getCategoryList = () => {
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
        this.getRecipeData();
        this.getCategoryList()
    }

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
        const { recipeList } = this.state
        return recipeList.map((val, idx) => {
            const { recipeName, category, shortDesc, recipeImage } = val
            if (recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
            return (
                <div className="row d-flex justify-content-start mt-4 align-items-center recipelist" key={val.id.toString()}>
                    <div className="col-4">
                        <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                    </div>
                    <div className="col-8">
                        <div className="d-flex flex-column ml-5 justify-content-start">
                            <h5 className="mt-2">{recipeName}</h5>
                            <h6>{category}</h6>
                            <p style={{ textAlign: "justify" }}>{shortDesc}</p>
                            <div className="d-flex my-4">
                                <Link to={`/resepku/edit/${val.id}`} style={{ color: "inherit" }}>
                                    <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                </Link>
                                <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                            </div>
                        </div>
                    </div>
                </div>
            )} else {
                return null
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

    editBtnHandler = (idx) => {
        this.setState({
            editRecipe: {
                ...this.state.recipeList[idx],
                // ...this.state.ingredientLists[idx]
            },
            recipeCategoryId: this.state.recipeList[idx].recipeCategory.id,
            ingredientEditName: this.state.ingredientLists[idx],
            instructionEditName: this.state.instructionLists[idx]
        });
        console.log(this.state.ingredientLists)
    };




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Resep Saya</h3>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Kategori:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getRecipeData()}
                                    onChange={(e) => this.setState({ category: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    {this.renderCategory()}
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Urutkan:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getRecipeData()}
                                    onChange={(e) => this.setState({ sortList: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        <Link to="/resepku/tambah" style={{ textDecoration: "none" }}>
                            <Buttons type="contained" className="mt-5">
                                Tambah Resep Saya
                                </Buttons>
                        </Link>
                        {this.state.recipeList.length > 0 ? (
                            <div className="mt-4 d-flex justify-content-center flex-column align-items-center">
                                {this.renderRecipeList()}
                            </div>
                        ) : (
                                <Alert className="mt-4">Resep Anda Kosong! Silahkan Menulis Resep Baru dan Bagikan Kepada Pengguna Yang Lain</Alert>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        search: state.search,
    }
}

export default connect(mapStateToProps)(MyResep) 