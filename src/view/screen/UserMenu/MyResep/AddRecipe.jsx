import React from "react"
import "./MyResep.css"
import Buttons from "../../../../component/Button/Buttons"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";

class AddRecipe extends React.Component {
    state = {
        addRecipeForm: {
            userId: this.props.user.id,
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
        recipeList: [],
        inputIngredient: {
            input0: ""
        },
        inputStep: {
            input0: ""
        }
    }

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

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
        this.getRecipeData()
    }


    addRecipe = () => {
        Axios.post(`${API_URL}/recipes`, this.state.addRecipeForm)
            .then((res) => {
                console.log(res.data);
                Object.keys(this.state.inputIngredient).forEach(input => {
                    Axios.post(`${API_URL}/ingredients`,
                        {
                            recipeId: res.data.id,
                            ingredients: this.state.inputIngredient[input],
                            id: this.state.instructionLists.id
                        }
                    )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                Object.keys(this.state.inputStep).forEach(input => {
                    Axios.post(`${API_URL}/instructionLists`,
                        {
                            recipeId: res.data.id,
                            instructionName: this.state.inputStep[input],
                            id: this.state.instructionLists.id
                        }
                    )
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                swal("Sukses", "Resep Berhasil Ditambah!", "success")
            })
            .catch((err) => {
                console.log(err);
                swal("Gagal", "Resep Gagal Ditambah!", "error")
            });
    }

    addNewInputIngredient = () => {
        let newInput = `input${Object.keys(this.state.inputIngredient).length}`
        this.setState({ inputIngredient: { ...this.state.inputIngredient, [newInput]: "" } })
        // console.log(newInput, this.state.inputIngredient)
    }

    addNewInputStep = () => {
        let newStep = `input${Object.keys(this.state.inputStep).length}`
        this.setState({ inputStep: { ...this.state.inputStep, [newStep]: "" } })
        // console.log(newStep, this.state.inputStep)
    }

    render() {
        const { recipeName, category, cookTime, numbServings, image, desc } = this.state.addRecipeForm
        return (
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-start mt-4">
                        <Link to="/resepku" style={{ textDecoration: "none" }}>
                            <Buttons type="textual">
                                Kembali ke Halaman Resep Saya
                            </Buttons>
                        </Link>
                    </div>
                    <div className="col-12">
                        <h3 className="text-center my-5">Tambah Resep</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75 form-control-lg"
                                placeholder="Judul Resep"
                                value={recipeName}
                                onChange={(e) =>
                                    this.inputHandler(e, "recipeName", "addRecipeForm")
                                }
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-4 category-recipe">
                            <div className="d-flex flex-column align-items-center">
                                <label>Kategori</label>
                                <select id="kategori" className="form-control w-100 form-control-lg"
                                    value={category}
                                    onChange={(e) =>
                                        this.inputHandler(e, "category", "addRecipeForm")
                                    }>
                                    <option>Cakes</option>
                                    <option>Kue Kering</option>
                                    <option>Roti dan Muffin</option>
                                    <option>Pastry</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column ml-5 align-items-center">
                                <label>Waktu Membuat (dalam menit)</label>
                                <input type="number" className="form-control w-75 form-control-lg"
                                    placeholder="Waktu Membuat"
                                    value={cookTime}
                                    onChange={(e) =>
                                        this.inputHandler(e, "cookTime", "addRecipeForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center">
                            <label>Porsi</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    placeholder="3 - 4 Porsi"
                                    value={numbServings}
                                    onChange={(e) =>
                                        this.inputHandler(e, "numbServings", "addRecipeForm")
                                    }
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <input type="text" className="form-control w-75 form-control-lg"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "addRecipeForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <textarea className="form-control w-75 form-control-lg" placeholder="Deskripsi Resep"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "addRecipeForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Bahan Resep</h4>
                            {
                                Object.keys(this.state.inputIngredient).map(input => {
                                    return <input type="text" className="form-control w-75 mt-2 form-control-lg"
                                        value={this.state.inputIngredient[input]}
                                        onChange={(e) => this.setState({ inputIngredient: { ...this.state.inputIngredient, [input]: e.target.value } })}
                                    />
                                })
                            }
                            <Buttons type="outlined" className="mt-4" onClick={this.addNewInputIngredient}>Tambah Bahan</Buttons>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Langkah Membuat</h4>
                            {
                                Object.keys(this.state.inputStep).map(input => {
                                    return <input type="text" className="form-control w-75 mt-2 form-control-lg"
                                        value={this.state.inputStep[input]}
                                        onChange={(e) => this.setState({ inputStep: { ...this.state.inputStep, [input]: e.target.value } })}
                                    />
                                })
                            }
                            <Buttons type="outlined" className="mt-4" onClick={this.addNewInputStep}>Tambah Langkah</Buttons>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <Buttons type="contained" onClick={this.addRecipe}>Simpan</Buttons>
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

export default connect(mapStateToProps)(AddRecipe) 