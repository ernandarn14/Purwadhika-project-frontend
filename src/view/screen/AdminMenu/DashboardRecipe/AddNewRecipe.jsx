import React from "react"
import Buttons from "../../../../component/Button/Buttons"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import swal from "sweetalert";
// import { Form, FormGroup, Button, FormControl } from 'react-bootstrap';
import Axios from "axios";
import { API_URL } from "../../../../constants/API";

class AddNewRecipe extends React.Component {
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
        instructionLists: {
            recipeId: 0,
            instructionName: [],
            id: 0
        },
        inputStep: {
            input0: ""
        },
        inputIngredient: {
            inputQty0: 0,
            inputUnit0: [],
            inputName0: []
        },
        ingredientLists: {
            ingredientListId: 0,
            recipeId: 0,
            quantity: 0,
            measurementUnitId: 0,
            id: 0
        },
        measurementUnit: {
            measurementName: "",
            id: 0
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

    addIngredientHandler = () => {
        const { ingredient, measurement, quantity, ingredients } = this.state
        if (ingredient !== "" && quantity !== 0 && measurement !== "") {
            const newIngredient = ingredients
            newIngredient.push({
                ingredient,
                quantity,
                measurement
            })
            this.setState({ ingredients: newIngredient, ingredient: "", quantity: 0, measurement: "" })
        }
        console.log(ingredients)
        alert('berhasil ditambah')
    }

    addNewInputStep = () => {
        let newStep = `input${Object.keys(this.state.inputStep).length}`
        this.setState({ inputStep: { ...this.state.inputStep, [newStep]: "" } })
        console.log(newStep, this.state.inputStep)
    }

    addNewInputIngredient = () => {
        let newInputQty = `inputQty${Object.keys(this.state.inputIngredient).length}`
        let newInputUnit = `inpuUnit${Object.keys(this.state.inputIngredient).length}`
        let newInputName = `inputName${Object.keys(this.state.inputIngredient).length}`
        this.setState({ inputIngredient: { ...this.state.inputIngredient, [newInputQty]: "", [newInputUnit]: "", [newInputName]: "" } })
        console.log(this.state.inputIngredient)
    }

    getIngredients = () => {
        Axios.get(`${API_URL}/ingredientDetails`)
            .then(res => {
                Object.keys(this.state.inputIngredient).forEach(val => {
                    if (res.data.ingredientName.toLowerCase() === this.state.inputIngredient.inputName0[val].toLowerCase()) {
                        Axios.get(`${API_URL}/ingredientDetails`, {
                            id: res.data.id
                        })
                            .then((res) => {
                                console.log(res.data);
                                this.setState({ ingredientLists: res.data })
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        Axios.post(`${API_URL}/ingredientDetails`, {
                            ingredientName: this.state.inputIngredient.inputName0[val]
                        })
                            .then((res) => {
                                console.log(res.data);
                                this.setState({ ingredientLists: res.data })
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getMeasurements = () => {
        Axios.get(`${API_URL}/measurementUnits`)
            .then(res => {
                Object.keys(this.state.inputIngredient).forEach(val => {
                    if (res.data.measurementName.toLowerCase() === this.state.inputIngredient.inputUnit0[val].toLowerCase()) {
                        Axios.get(`${API_URL}/measurementUnits`, {
                            id: res.data.id
                        })
                            .then((res) => {
                                console.log(res.data);
                                this.setState({ measurementUnit: res.data })
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        Axios.post(`${API_URL}/measurementUnits`, {
                            measurementName: this.state.inputIngredient.inputUnit0[val]
                        })
                            .then((res) => {
                                console.log(res.data);
                                this.setState({ measurementUnit: res.data })
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addRecipe = () => {
        Axios.post(`${API_URL}/recipes`, this.state.addRecipeForm)
            .then((res) => {
                console.log(res.data);
                Object.keys(this.state.inputIngredient).forEach(input => {
                    this.getIngredients()
                    this.getMeasurements()
                    Axios.post(`${API_URL}/ingredientDetails`,
                        {
                            recipeId: res.data.id,
                            quantity: this.state.inputIngredient[input].inputQty0,
                            // ingredients: this.state.inputIngredient[input],
                            measurementUnitId: this.state.ingredientLists.id,
                            ingredientListId: this.state.measurementUnit.id,
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
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Resep"
                                value={recipeName}
                                onChange={(e) =>
                                    this.inputHandler(e, "recipeName", "addRecipeForm")
                                }
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-4 category-recipe">
                            <div className="d-flex">
                                <label>Kategori</label>
                                <select id="kategori" className="ml-3 form-control w-75"
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
                            <div className="d-flex mx-5">
                                <input type="text" className="form-control w-75"
                                    placeholder="Waktu Membuat"
                                    value={cookTime}
                                    onChange={(e) =>
                                        this.inputHandler(e, "cookTime", "addRecipeForm")
                                    }
                                />
                                <label className="ml-3">Menit</label>
                            </div>
                            <div className="d-flex">
                                <input type="text" className="form-control w-75"
                                    placeholder="Jumlah Porsi"
                                    value={numbServings}
                                    onChange={(e) =>
                                        this.inputHandler(e, "numbServings", "addRecipeForm")
                                    }
                                />
                                <label className="ml-3">Porsi</label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "addRecipeForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" placeholder="Deskripsi Resep"
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
                                    return (
                                        <>
                                            <input type="number" className="form-control w-25 mt-2"
                                                placeholder="Jumlah"
                                                value={this.state.inputIngredient[input].inputQty0}
                                                onChange={(e) => this.setState({ inputIngredient: { ...this.state.inputIngredient.inputQty0, [input]: e.target.value } })}
                                            />
                                            <input type="text" className="form-control w-55 mt-2"
                                                placeholder="Satuan Ukuran"
                                                value={this.state.inputIngredient[input].inputUnit0}
                                                onChange={(e) => this.setState({ inputIngredient: { ...this.state.inputIngredient.inputUnit0, [input]: e.target.value } })}
                                            />
                                            <input type="text" className="form-control w-75 mt-2"
                                                value={this.state.inputIngredient[input].inputName0}
                                                onChange={(e) => this.setState({ inputIngredient: { ...this.state.inputIngredient.inputName0, [input]: e.target.value } })}
                                            />
                                        </>
                                    )
                                })
                            }
                            <Buttons type="outlined" className="mt-4" onClick={this.addNewInputIngredient}>Tambah Bahan</Buttons>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-center mt-3">
                            <Form inline className="mt-3">
                                <FormGroup controlId="formHorizontalNumber">
                                    <label>Jumlah</label>
                                    {' '}
                                    <FormControl type="number" placeholder="Jumlah" value={this.state.quantity} onChange={e => this.setState({ quantity: e.target.value })} className="w-50" />
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formHorizontalName">
                                    <label>Satuan Ukur</label>
                                    {' '}
                                    <FormControl type="text" placeholder="Satuan Ukur" value={this.state.measurement} onChange={e => this.setState({ measurement: e.target.value })} className="w-50" />
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formHorizontalName">
                                    <label>Nama Bahan</label>
                                    {' '}
                                    <FormControl type="text" placeholder="Nama Bahan" value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value })} className="w-75" />
                                </FormGroup>
                            </Form>
                        </div> */}
                        {/* <div className="d-flex align-items-center justify-content-center mt-3">
                            <FormGroup>
                                <Button onClick={() => this.addIngredientHandler()}>
                                    Tambah Bahan
                                </Button>
                            </FormGroup> */}
                        {/* <div className="d-flex align-items-center justify-content-center mt-3">
                                {this.state.ingredients.length !== 0 ? 
                                 this.state.ingredients.map((ingredient) => {
                                    return (
                                        <option value={ingredient.tname}>{ingredient.ingredient + ": " + ingredient.amount + " " + ingredient.unit}</option>
                                    )
                                    } : null

                                }

                            </div> */}
                        {/* <FormGroup controlId="formControlsSelectMultiple">
                                {this.state.ingredients.length !== 0 ?
                                    <FormControl>
                                        {this.state.ingredients.map((ingredient) => {
                                            return (
                                                <option value={ingredient.tname}>{ingredient.ingredient + ": " + ingredient.amount + " " + ingredient.unit}</option>
                                            )
                                        })
                                        }
                                    </FormControl>
                                    :
                                    <div>
                                    </div>
                                }
                            </FormGroup> */}

                        {/* </div> */}
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Langkah Membuat</h4>
                            {
                                Object.keys(this.state.inputStep).map(input => {
                                    return <input type="text" className="form-control w-75 mt-2"
                                        value={this.state.inputStep[input]}
                                        onChange={(e) => this.setState({ inputStep: { ...this.state.inputStep, [input]: e.target.value } })}
                                    />
                                })
                            }
                            <Buttons type="outlined" className="mt-4" onClick={this.addNewInputStep}>Tambah Langkah</Buttons>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Buttons type="contained" className="mt-4" onClick={this.addRecipe}>Simpan</Buttons>
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

export default connect(mapStateToProps)(AddNewRecipe) 