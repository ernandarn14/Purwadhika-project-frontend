import React from "react"
import "./RecipeDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom"
import Buttons from "../../../component/Button/Buttons"

class RecipeDetails extends React.Component {
    state = {
        recipeDetailList: {
            recipeName: "",
            category: "",
            cookTime: 0,
            jumlahPorsi: "",
            image: "",
            desc: ""
        },
        ingredientDetails: [],
        instructionLists: []
    }

    getRecipeDetails = () => {
        Axios.get(`${API_URL}/recipes/${this.props.match.params.resepId}`)
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
        Axios.get(`${API_URL}/ingredientDetails?_expand=ingredientList&_expand=measurementUnit`, {
            params: {
                recipeId: this.props.match.params.resepId,
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ ingredientDetails: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getInstructionDetails = () => {
        Axios.get(`${API_URL}/instructionLists`, {
            params: {
                recipeId: this.props.match.params.resepId,
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({ instructionLists: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderRecipeDetails = () => {
        const { recipeDetail } = this.state
        return recipeDetail.map(val => {
            const { recipeName, category, cookTime, numbServings, image, desc } = val
            return (
                <>
                    <h3 className="text-center my-5">{recipeName}</h3>
                    <div className="row">
                        <div className="col-6">
                            <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        </div>
                        <div className="col-6">
                            {/* <h6>{val.pengguna.namaLengkap}</h6> */}
                            <h6>{category}</h6>
                            <h6>{cookTime} menit</h6>
                            <h6>{numbServings} porsi</h6>
                            <h6>{desc}</h6>
                        </div>
                    </div>
                </>
            )
        })
    }

    renderInstructionDetails = () => {
        const { instructionLists } = this.state
        return instructionLists.map((val,idx) => {
            const { instructionName } = val
            return (
                    <div className="d-flex mt-2 align-items-center text-justify">
                        <h6>{idx+=1}.</h6>
                        <h6 className="ml-3">{instructionName}</h6>
                    </div>
            )
        })
    }

    renderIngredientDetails = () => {
        const { ingredientDetails } = this.state
        return ingredientDetails.map(val => {
            const { quantity, measurementUnit, ingredientList } = val
            const { ingredientName } = ingredientList
            const { measurementName } = measurementUnit
            return (
                    <div className="d-flex mt-2 align-items-center">
                        <h6>{quantity}</h6>
                        <h6 className="ml-2">{measurementName}</h6>
                        <h6 className="ml-2">{ingredientName}</h6>
                    </div>
            )
        })
    }

    componentDidMount() {
        this.getRecipeDetails();
        this.getIngredientDetails();
        this.getInstructionDetails();
    }



    render() {
        const { recipeName, category, cookTime, numbServings, image, desc } = this.state.recipeDetailList
        return (
            <div className="container">
                <div className="d-flex justify-content-start py-4">
                    <Link to="/resep" style={{ textDecoration: "none" }}>
                        <Buttons type="textual">
                            Kembali ke Halaman Resep
                        </Buttons>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12">
                        {/* <h3 className="text-center my-5">Resep Detail</h3> */}
                        {/* {this.renderRecipeDetails()} */}
                        <div className="recipe-data">
                            <h3 className="text-header text-center my-5">{recipeName}</h3>
                            <div className="row">
                                <div className="col-6 text-center">
                                    <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                                </div>
                                <div className="col-6">
                                    <h6>{category}</h6>
                                    <h6>{cookTime} menit</h6>
                                    <h6>{numbServings} porsi</h6>
                                    <h6>{desc}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="ingredient-data d-flex">
                            <div className="w-50">
                            <h3 className="text-header mt-5 mb-4">Bahan</h3>
                            {this.renderIngredientDetails()}
                            </div>
                            <div className="w-50">
                            <h3 className="text-header mt-5 mb-4">Langkah Membuat</h3>
                            {this.renderInstructionDetails()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeDetails