import React from "react"
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
        recipeDetail: []
    }

    getRecipeDetails = () => {
        Axios.get(`${API_URL}/recipes/${this.props.match.params.resepId}`
            , {
                params: {
                    // _expand: "pengguna",
                    _embed: "detailBahan"
                }
            }
        )
            .then(res => {
                console.log(res.data)
                this.setState({ recipeDetailList: res.data, recipeDetail: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
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

    componentDidMount() {
        this.getRecipeDetails();
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
                        <div>
                            <h3 className="text-center my-5">{recipeName}</h3>
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
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeDetails