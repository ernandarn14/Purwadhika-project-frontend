import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { Link } from 'react-router-dom'
import Buttons from '../../../../component/Button/Buttons'
import swal from "sweetalert";

class MyResep extends React.Component {
    state = {
        recipeList: [],
        editRecipeForm: {
            recipeName: "",
            category: "Kue Kering",
            cookTime: 0,
            numbServings: "",
            image: "",
            desc: "",
            id: 0
        },
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
        }
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
        return recipeList.map((val, idx) => {
            const { recipeName, category, desc, image } = val
            return (
                <div className="d-flex justify-content-start mt-4 align-items-center recipelist" key={val.id.toString()}>
                        <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        <div className="d-flex flex-column ml-5 justify-content-start">
                            <h5 className="mt-2">{recipeName}</h5>
                            <h6>{category}</h6>
                            <p style={{ textAlign: "justify" }}>{desc}</p>
                            <div className="d-flex my-4">
                                <Link to={`/tipsku/edit/${val.id}`} style={{ color: "inherit" }}>
                                    <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                </Link>
                                <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                            </div>
                        </div>

                    </div>
            )
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
                    Axios.delete(`${API_URL}/recipes/${id}`)
                        .then(res => {
                            console.log(res.data)
                            Axios.delete(`${API_URL}/instructionLists`,
                                {
                                    recipeId: res.data.id,
                                }
                            )
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            Axios.delete(`${API_URL}/ingredients`,
                                {
                                    recipeId: res.data.id,
                                }
                            )
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
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
            editRecipeForm: {
                ...this.state.recipeList[idx],
            }
        });
    };




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Resep Saya</h3>
                        <Link to="/resepku/tambah" style={{ textDecoration: "none" }}>
                            <Buttons type="contained">
                                Tambah Resep Saya
                                </Buttons>
                        </Link>
                        <div className="mt-4 d-flex justify-content-center flex-column align-items-center">
                            {this.renderRecipeList()}
                        </div>
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