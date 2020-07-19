import React from "react"
import Buttons from "../../../../component/Button/Buttons"
import { Link } from "react-router-dom"
import Axios from "axios"
import { API_URL } from "../../../../constants/API"
import swal from "sweetalert"
import { connect } from "react-redux"

class AdminEditRecipe extends React.Component {
    state = {
        selectedFile: null,
        editRecipeForm: {
            recipeName: "",
            cookTime: 0,
            numbServings: "",
            recipeImage: "",
            shortDesc: "",
            id: 0
        },
        recipeCategoryId: 0,
        ingredientLists: {
            ingredientName: [],
            id: 0
        },
        instructionLists: {
            recipeId: 0,
            stepName: [],
            id: 0
        },
        inputIngredient: {
            input0: ""
        },
        inputStep: {
            input0: ""
        },
        categoryRecipeList: []
    }

    getRecipeDetail = () => {
        Axios.get(`${API_URL}/resep/${this.props.match.params.resepId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ editRecipeForm: res.data, recipeCategoryId: res.data.recipeCategory.id })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    getCategoryRecipe = () => {
        Axios.get(`${API_URL}/kategori-resep`)
            .then(res => {
                console.log(res.data)
                this.setState({ categoryRecipeList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getStepRecipe = () => {
        Axios.get(`${API_URL}/langkah-membuat/resep/${this.props.match.params.resepId}`)
            .then(res => {
                // console.log(res.data)
                let objSteps = {}
                res.data.forEach((val, idx) => {
                    objSteps[`input${idx}`] = { stepName: val.stepName, id: val.id, recipes: val.recipes.id }
                })

                this.setState({
                    instructionLists: res.data,
                    inputStep: objSteps
                })
                console.log(this.state.inputStep)
                //    console.log(this.state.inputStep.recipeId)
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    getIngredientRecipe = () => {
        Axios.get(`${API_URL}/bahan/resep/${this.props.match.params.resepId}`)
            .then(res => {
                // console.log(res.data)
                let objIng = {}
                res.data.forEach((val, idx) => {
                    objIng[`input${idx}`] = { ingredientName: val.ingredientName, id: val.id }
                })
                this.setState({ ingredientLists: res.data, inputIngredient: objIng })
                console.log(this.state.inputIngredient)
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    componentDidMount() {
        this.getRecipeDetail()
        this.getCategoryRecipe()
        this.getStepRecipe()
        this.getIngredientRecipe()
    }

    renderCategoryRecipe = () => {
        const { categoryRecipeList } = this.state
        return categoryRecipeList.map((val) => {
            return <option value={val.id}>{val.recipeCategoryName}</option>
        })
    }

    addNewInputIngredient = () => {
        let newInput = `input${Object.keys(this.state.inputIngredient).length}`
        this.setState({ inputIngredient: { ...this.state.inputIngredient, [newInput]: "" } })
        console.log(newInput, this.state.inputIngredient)
    }

    addNewInputStep = () => {
        let newStep = `input${Object.keys(this.state.inputStep).length}`
        this.setState({ inputStep: { ...this.state.inputStep, [newStep]: "" } })
        console.log(newStep, this.state.inputStep)
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

    editRecipeHandler = () => {
        let formData = new FormData();

        if (this.state.selectedFile) {
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
        }

        formData.append("userData", JSON.stringify(this.state.editRecipeForm))

        if (this.state.editRecipeForm.users.role === "admin") {
            Axios.put(`${API_URL}/resep/edit/${this.props.match.params.resepId}/pengguna/${this.props.user.id}/kategori/${this.state.recipeCategoryId}`, formData)
                .then((res) => {
                    console.log(res.data);
                    Object.keys(this.state.inputIngredient).forEach(input => {
                        // console.log(this.state.inputIngredient, input, this.state.inputIngredient[input])
                        Axios.put(`${API_URL}/bahan/edit/${res.data.id}`,
                            {
                                recipeId: res.data.id,
                                ingredientName: this.state.inputIngredient[input].ingredientName,
                                id: this.state.inputIngredient[input].id
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
                        console.log(this.state.inputStep[input])
                        Axios.put(`${API_URL}/langkah-membuat/edit/${res.data.id}`,
                            {
                                recipeId: res.data.id,
                                stepName: this.state.inputStep[input].stepName,
                                id: this.state.inputStep[input].id
                            }
                        )
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    this.setState({
                        editRecipeForm: {
                            recipeName: "",
                            cookTime: 0,
                            numbServings: "",
                            recipeImage: "",
                            shortDesc: "",
                            id: 0
                        }, inputIngredient: {
                            input0: ""
                        },
                        inputStep: {
                            input0: ""
                        },
                    })
                    swal("Sukses", "Resep Berhasil Diubah!", "success")
                })
                .catch((err) => {
                    console.log(err);
                    swal("Gagal", "Resep Gagal Diubah!", "error")
                });
        } else {
            swal("Gagal", "Admin Tidak Dapat Mengubah Resep Pengguna!", "error")
        }
        //console.log(JSON.stringify(this.state.addRecipeForm));
    }




    render() {
        const { recipeName, recipeCategoryId, cookTime, numbServings, shortDesc } = this.state.editRecipeForm
        return (
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-start mt-4">
                        <Link to="/admin/resep" style={{ textDecoration: "none" }}>
                            <Buttons type="textual">
                                Kembali ke Dashboard Resep
                            </Buttons>
                        </Link>
                    </div>
                    <div className="col-12">
                        <h3 className="text-center my-5">Edit Resep</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75 form-control-lg"
                                placeholder="Judul Resep"
                                value={recipeName}
                                onChange={(e) =>
                                    this.inputHandler(e, "recipeName", "editRecipeForm")
                                }
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-4 category-recipe">
                            <div className="d-flex flex-column align-items-center">
                                <label>Kategori</label>
                                <select id="kategori" className="form-control w-100 form-control-lg"
                                    value={recipeCategoryId}
                                    onChange={(e) => this.setState({ recipeCategoryId: parseInt(e.target.value) })
                                    }
                                >
                                    {this.renderCategoryRecipe()}
                                </select>
                            </div>
                            <div className="d-flex flex-column ml-5 align-items-center">
                                <label>Waktu Membuat (dalam menit)</label>
                                <input type="number" className="form-control w-75 form-control-lg"
                                    placeholder="Waktu Membuat"
                                    value={cookTime}
                                    onChange={(e) =>
                                        this.inputHandler(e, "cookTime", "editRecipeForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <label>Porsi</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    placeholder="3 - 4 Porsi"
                                    value={numbServings}
                                    onChange={(e) =>
                                        this.inputHandler(e, "numbServings", "editRecipeForm")
                                    }
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <input type="file" className="form-control-lg"
                                onChange={this.fileChangeHandler}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <textarea className="form-control w-75 form-control-lg" placeholder="Deskripsi Resep"
                                value={shortDesc}
                                onChange={(e) =>
                                    this.inputHandler(e, "shortDesc", "editRecipeForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Bahan Resep</h4>
                            {
                                Object.keys(this.state.inputIngredient).map(input => {
                                    return <input type="text" className="form-control w-75 mt-2 form-control-lg"
                                        value={this.state.inputIngredient[input].ingredientName}
                                        onChange={(e) => this.setState({ inputIngredient: { ...this.state.inputIngredient, [input]: { ingredientName: e.target.value, id: this.state.inputIngredient[input].id } } })}
                                    />
                                })
                            }
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Langkah Membuat</h4>
                            {
                                Object.keys(this.state.inputStep).map(input => {
                                    return <input type="text" className="form-control w-75 mt-2 form-control-lg"
                                        value={this.state.inputStep[input].stepName}
                                        onChange={(e) => this.setState({ inputStep: { ...this.state.inputStep, [input]: { stepName: e.target.value, id: this.state.inputStep[input].id } } })}
                                    />
                                })
                            }
                        </div>
                        <div className="d-flex justify-content-center">
                            {/* <Link to="/admin/resep"> */}
                                <Buttons type="contained" className="mt-4" onClick={this.editRecipeHandler}>Simpan</Buttons>
                            {/* </Link> */}
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


export default connect(mapStateToProps)(AdminEditRecipe) 
