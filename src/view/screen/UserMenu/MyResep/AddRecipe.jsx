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
        selectedFile: null,
        categoryRecipeList: [],
        addRecipeForm: {
            users: {
                id: this.props.user.id,
            },
            recipeName: "",
            uploadDate: new Date(),
            // recipeCategoryId: 0,
            cookTime: 0,
            numbServings: "",
            recipeImage: "",
            shortDesc: "",
            postOption: "public",
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
        recipeList: [],
        inputIngredient: {
            input0: ""
        },
        inputStep: {
            input0: ""
        },
        dataCategory: []
    }

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
        console.log(e.target.value)
    };



    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };


    getCategoryRecipe = () => {
        Axios.get(`${API_URL}/kategori-resep`)
            .then(res => {
                console.log(res.data)
                this.setState({ dataCategory: JSON.stringify(res.data), categoryRecipeList: res.data })
                //console.log(this.state.categoryRecipeList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderCategoryRecipe = () => {
        const { categoryRecipeList } = this.state
        return categoryRecipeList.map((val) => {
            return <option value={val.id}>{val.recipeCategoryName}</option>
        })
    }

    componentDidMount() {
        this.getCategoryRecipe()
    }

    addRecipeHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.addRecipeForm))

        Axios.post(`${API_URL}/resep/tambah/pengguna/${this.props.user.id}/kategori/${this.state.recipeCategoryId}`, formData)
            .then((res) => {
                console.log(res.data);
                Object.keys(this.state.inputIngredient).forEach(input => {
                    //console.log(this.state.inputIngredient, input, this.state.inputIngredient[input])
                    Axios.post(`${API_URL}/bahan/tambah/resep/${res.data.id}`,
                        {
                            recipeId: res.data.id,
                            ingredientName: this.state.inputIngredient[input],
                            id: this.state.instructionLists.id
                        }
                    )
                        .then((res) => {
                            console.log(res.data);
                            console.log(this.state.instructionLists)
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                Object.keys(this.state.inputStep).forEach(input => {
                    Axios.post(`${API_URL}/langkah-membuat/tambah/resep/${res.data.id}`,
                        {
                            recipeId: res.data.id,
                            stepName: this.state.inputStep[input],
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
                this.setState({
                    addRecipeForm: {
                        recipeName: "",
                        cookTime: 0,
                        numbServings: "",
                        recipeImage: "",
                        postOption: "public",
                        shortDesc: "",
                    }, inputIngredient: {
                        input0: ""
                    },
                    inputStep: {
                        input0: ""
                    },
                })
                swal("Sukses", "Resep Berhasil Ditambah!", "success")
            })
            .catch((err) => {
                console.log(err);
                swal("Gagal", "Resep Gagal Ditambah!", "error")
            });
        //console.log(JSON.stringify(this.state.addRecipeForm));
    }


    addNewInputIngredient = () => {
        let newInput = `input${Object.keys(this.state.inputIngredient).length}`
        this.setState({ inputIngredient: { ...this.state.inputIngredient, [newInput]: "" } })
        //console.log(newInput, this.state.inputIngredient)
    }

    addNewInputStep = () => {
        let newStep = `input${Object.keys(this.state.inputStep).length}`
        this.setState({ inputStep: { ...this.state.inputStep, [newStep]: "" } })
        // console.log(newStep, this.state.inputStep)
    }

    render() {
        const { recipeName, recipeCategoryId, cookTime, numbServings, shortDesc, postOption } = this.state.addRecipeForm
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
                                    value={recipeCategoryId}
                                    onChange={(e) => this.setState({ recipeCategoryId: parseInt(e.target.value) })
                                    }>
                                    {this.renderCategoryRecipe()}
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
                            <input type="file" className="form-control-lg"
                                onChange={this.fileChangeHandler}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <textarea className="form-control w-75 form-control-lg" placeholder="Deskripsi Resep"
                                value={shortDesc} onChange={(e) =>
                                    this.inputHandler(e, "shortDesc", "addRecipeForm")
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
                        <div className="d-flex align-items-center justify-content-center mt-5">
                                <label>Pilihan Unggah</label>
                                <select id="kategori" className="form-control w-25 form-control-lg ml-3"
                                    value={postOption}
                                    onChange={(e) =>
                                        this.inputHandler(e, "postOption", "addRecipeForm")
                                    }
                                    >
                                   <option value="public">Semua Pengguna</option>
                                   <option value="premium">Hanya Pengguna Premium</option>
                                </select>
                            </div>
                        <div className="d-flex justify-content-center mt-5">
                            <Buttons type="contained" onClick={this.addRecipeHandler}>Simpan</Buttons>
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