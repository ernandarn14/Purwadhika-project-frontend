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
            // recipeCategory: {},
            cookTime: 0,
            numbServings: "",
            recipeImage: "",
            shortDesc: "",
            users: {}
        },
        ingredientDetails: [],
        instructionLists: [],
        categoryList: []
    }

    getRecipeDetails = () => {
        Axios.get(`${API_URL}/resep/${this.props.match.params.resepId}`
        // , {
        //     params: {
        //         _expand: "user"
        //     }
        // }
        )
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
        Axios.get(`${API_URL}/bahan/resep/${this.props.match.params.resepId}`
        // , {
        //     params: {
        //         recipeId: this.props.match.params.resepId,
        //     }
        // }
        )
            .then(res => {
                console.log(res.data)
                this.setState({ ingredientDetails: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getInstructionDetails = () => {
        Axios.get(`${API_URL}/langkah-membuat/resep/${this.props.match.params.resepId}`
        // , {
        //     params: {
        //         recipeId: this.props.match.params.resepId,
        //     }
        // }
        )
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
            const { recipeName, category, cookTime, numbServings, recipeImage, desc, user } = val
            const { username } = user
            return (
                <>
                    <h3 className="text-center my-5">{recipeName}</h3>
                    <div className="row">
                        <div className="col-6">
                            <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        </div>
                        <div className="col-6">
                            <h6>category</h6>
                            <h6>Oleh: {username}</h6>
                            <h6>{cookTime}</h6>
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
            // const { quantity, measurementUnit, ingredientList } = val
            const { ingredientName } = val
            // const { measurementName } = measurementUnit
            return (
                <div className="d-flex mt-2 align-items-center" key={val.id.toString()}>
                    <h6>{ingredientName}</h6>
                    {/* <h6 className="ml-2">{measurementName}</h6>
                    <h6 className="ml-2">{ingredientName}</h6> */}
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
        const { recipeName, cookTime, numbServings, recipeImage, shortDesc, users } = this.state.recipeDetailList
        const { fullname } = users
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
                        {/* <h3 className="text-center my-5">Resep Detail</h3> */}
                        {/* {this.renderRecipeDetails()} */}
                        <div className="recipe-data">
                            <div className="text-center my-5">
                                <h3 className="text-header">{recipeName}</h3>
                                <h6>Oleh: {fullname}</h6>
                            </div>
                            <div className="row">
                                <div className="col-6 text-right">
                                    <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                                </div>
                                <div className="col-6">
                                    {/* <h6>{category}</h6> */}
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
                        <div className="col-6">
                            <h3 className="text-header mt-5 mb-4">Bahan</h3>
                            {this.renderIngredientDetails()}
                        </div>
                        <div className="col-6">
                            <h3 className="text-header mt-5 mb-4">Langkah Membuat</h3>
                            {this.renderInstructionDetails()}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="row mt-5 review-recipe">
                    <div className="col-12">
                        <h4 className="review-header">Ulasan</h4>
                        <textarea placeholder="Silahkan Tulis Ulasan Disini" className="my-3 review-text">

                        </textarea>
                        <div className="d-flex justify-content-end">
                            <Buttons type="contained">Simpan</Buttons>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeDetails