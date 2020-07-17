import React from "react"
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import { API_URL } from '../../../../constants/API';
import Buttons from '../../../../component/Button/Buttons';
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class RecipeReport extends React.Component {
    state = {
        data: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        },
        recipeList: [],
        categoryList: [],
        category: "semua",
        sort: "asc"
    }

    getRecipeData = (val) => {
        this.setState({
            data: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            }
        })
        if (val === "semua") {
            Axios.get(`${API_URL}/resep/terbaik/${this.state.sort}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                    res.data.map((val) => {
                        this.setState({
                            data: {
                                labels: [...this.state.data.labels, val.recipeName],
                                datasets: [
                                    {
                                        label: 'Nilai',
                                        backgroundColor: `#ac7339`,
                                        borderColor: '#86592d',
                                        borderWidth: 2,
                                        width: 10,
                                        data: [...this.state.data.datasets[0].data, val.rating]
                                    }
                                ]
                            }
                        })
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            Axios.get(`${API_URL}/resep/kategori/${this.state.sort}?categoryName=${val}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                    res.data.map((val) => {
                        this.setState({
                            data: {
                                labels: [...this.state.data.labels, val.recipeName],
                                datasets: [
                                    {
                                        label: 'Nilai',
                                        backgroundColor: `#ac7339`,
                                        borderColor: '#86592d',
                                        borderWidth: 2,
                                        data: [...this.state.data.datasets[0].data, val.rating]
                                    }
                                ]
                            }
                        })
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        }

    }

    getCategoryData = () => {
        Axios.get(`${API_URL}/kategori-resep`)
            .then(res => {
                console.log(res.data)
                this.setState({ categoryList: res.data })
            })
            .catch(e => {
                console.log(e)
            })
    }

    renderCategory = () => {
        const { categoryList } = this.state
        return categoryList.map((val) => {
            const { id, recipeCategoryName } = val
            return (
                <option value={recipeCategoryName} key={id.toString()}>{recipeCategoryName}</option>
            )
        })
    }


    renderBarRecipe = () => {
        return (
            <Bar
                style={{ justifyContent: "center", alignItems: "center" }}
                data={this.state.data}
                options={{
                    title: {
                        display: true,
                        text: 'Resep Paling Disukai',
                        fontSize: 30
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        )
    }

    componentDidMount() {
        this.getRecipeData(this.state.category)
        this.getCategoryData()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Laporan Resep</h3>
                        <div className="d-flex mt-3 justify-content-start">
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan-resep">
                                <Buttons type="textual" className="mt-3">
                                    Resep
                            </Buttons>
                            </Link>
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan-langganan">
                                <Buttons type="textual" className="mt-3 mx-5">
                                    Langganan
                            </Buttons>
                            </Link>
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan">
                                <Buttons type="textual" className="mt-3">
                                    Pengguna
                            </Buttons>
                            </Link>
                        </div>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Kategori:</label>
                                <select className="form-control ml-4" style={{ width: "100px" }}
                                    onClick={() => this.getRecipeData(this.state.category)}
                                    onChange={(e) => this.setState({ category: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    {this.renderCategory()}
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Urutkan:</label>
                                <select className="form-control ml-4" style={{ width: "100px" }}
                                    onClick={() => this.getRecipeData(this.state.category)}
                                    onChange={(e) => this.setState({ sort: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        <center>
                            <div className="mt-5 w-75">
                                {this.renderBarRecipe()}
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        search: state.search,
    };
};

export default connect(mapStateToProps)(RecipeReport) 