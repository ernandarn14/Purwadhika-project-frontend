import React from "react"
import "./RecipeDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom"
import Buttons from "../../../component/Button/Buttons"
import { connect } from "react-redux"
import swal from "sweetalert"

class RecipeDetails extends React.Component {
    state = {
        recipeDetailList: {
            recipeName: "",
            recipeCategory: {},
            cookTime: 0,
            numbServings: "",
            recipeImage: "",
            shortDesc: "",
            users: {}
        },
        ingredientDetails: [],
        instructionLists: [],
        categoryList: [],
        like: 0,
        likeActive: false,
    }

    getRecipeDetails = () => {
        Axios.get(`${API_URL}/resep/${this.props.match.params.resepId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ recipeDetailList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    getIngredientDetails = () => {
        Axios.get(`${API_URL}/bahan/resep/${this.props.match.params.resepId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ ingredientDetails: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getInstructionDetails = () => {
        Axios.get(`${API_URL}/langkah-membuat/resep/${this.props.match.params.resepId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ instructionLists: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderInstructionDetails = () => {
        const { instructionLists } = this.state
        return instructionLists.map((val, idx) => {
            const { stepName } = val
            return (
                <div className="d-flex mt-2 align-items-center text-justify" key={val.id.toString()}>
                    <h6>{idx += 1}.</h6>
                    <h6 className="ml-3">{stepName}</h6>
                </div>
            )
        })
    }

    renderIngredientDetails = () => {
        const { ingredientDetails } = this.state
        return ingredientDetails.map(val => {
            const { ingredientName } = val
            return (
                <div className="d-flex mt-2 align-items-center" key={val.id.toString()}>
                    <h6>{ingredientName}</h6>
                </div>
            )
        })
    }

    componentDidMount() {
        this.getRecipeDetails();
        this.getIngredientDetails();
        this.getInstructionDetails();
    }

    addWishlistHandler = () => {
        const { id } = this.state.recipeDetailList
        //console.log(id)
        Axios.get(`${API_URL}/rencana/${this.props.user.id}/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.length === 0) {
                    Axios.post(`${API_URL}/rencana/tambah/pengguna/${this.props.user.id}/resep/${id}`, {
                        userId: this.props.user.id,
                        recipeId: id
                    })
                        .then(res => {
                            console.log(res.data);
                            swal('Sukses', 'Resep Berhasil Tersimpan di Rencana Saya', 'success')
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    swal('Gagal', 'Resep Sudah Tersimpan di Rencana Saya', 'error')
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    addScoreHandler = () => {
        const { id, rating } = this.state.recipeDetailList
        if (this.props.user.id) {
            if (!this.state.likeActive) {
                this.setState({
                    like: this.state.like + 1,
                    likeActive: true
                })
                //console.log(this.state.like)
                // console.log(rating + this.state.like + 1)
                Axios.put(`${API_URL}/resep/tambah/nilai/${id}`, {
                    rating: rating + this.state.like + 1
                })
                    .then(res => {
                        //console.log(res.data)
                        this.getRecipeDetails()
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else {
                this.setState({
                    like: this.state.like - 1,
                    likeActive: false
                })
                //console.log(this.state.like)
                // console.log(rating + this.state.like - 1)
                Axios.put(`${API_URL}/resep/tambah/nilai/${id}`, {
                    rating: rating - this.state.like
                })
                    .then(res => {
                        //console.log(res.data)
                        this.getRecipeDetails()
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        } else {
            swal("Gagal", "Anda Harus Login Terlebih Dahulu", "error")
        }
    }



    render() {
        const { recipeName, cookTime, numbServings, recipeImage, shortDesc, users, rating } = this.state.recipeDetailList
        const { fullname } = users
        // const { recipeCategoryName } = recipeCategory
        return (
            <div className="container">
                <div className="d-flex justify-content-start mt-4">
                    <Link to="/resep" style={{ textDecoration: "none" }}>
                        <Buttons type="textual">
                            Kembali ke Halaman Resep
                        </Buttons>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="recipe-data">
                            <div className="text-center my-5">
                                <h3 className="text-header">{recipeName}</h3>
                                {/* <p>{recipeCategoryName}</p> */}
                                <h6>Oleh: {fullname}</h6>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="row">
                                    <i className="material-icons" onClick={this.addScoreHandler}>&#xe87e;</i>
                                    <p className="ml-2">{rating}</p>
                                </div>
                                {this.props.user.id ? (
                                    <Buttons type="outlined" className="ml-5" onClick={this.addWishlistHandler}>Simpan Resep</Buttons>
                                ) : null}
                            </div>
                            <div className="row mt-5">
                                <div className="col-6 text-right">
                                    <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                                </div>
                                <div className="col-6">
                                    <div className="cookTime my-1 d-flex justify-content-between">
                                        <h6>{cookTime} menit</h6>
                                        <i className="material-icons">&#xe192;</i>
                                    </div>
                                    <div className="numbServings my-1 d-flex justify-content-between">
                                        <h6>{numbServings} porsi</h6>
                                        <i className="material-icons">&#xe556;</i>
                                    </div>
                                    <div className="desc">
                                        <h6>{shortDesc}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ingredient-data">
                        <div className="col-5">
                            <h3 className="text-header mt-5 mb-4">Bahan</h3>
                            {this.renderIngredientDetails()}
                        </div>
                        <div className="col-7">
                            <h3 className="text-header mt-5 mb-4">Langkah Membuat</h3>
                            {this.renderInstructionDetails()}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(RecipeDetails) 