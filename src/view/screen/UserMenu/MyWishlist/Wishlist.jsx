import React from 'react'
import "./Wishlist.css"
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { priceFormatter } from '../../../supports/helpers/PriceFormatter'
import Buttons from '../../../../component/Button/Buttons'
import swal from "sweetalert";
import { Alert } from 'reactstrap'

class Wishlist extends React.Component {
    state = {
        recipeList: [],
        category: "semua",
        sortList: "asc",
        categoryList: [],
    }

    getWishilistResep = () => {
        if (this.state.category === "semua") {
            Axios.get(`${API_URL}/rencana/pengguna/${this.props.user.id}/${this.state.sortList}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Axios.get(`${API_URL}/rencana/pengguna/${this.props.user.id}/kategori/${this.state.sortList}?categoryName=${this.state.category}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ recipeList: res.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    getCategoryList = (val) => {
        Axios.get(`${API_URL}/kategori-resep`)
            .then(res => {
                console.log(res.data)
                this.setState({ categoryList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert('Data kategori Kosong')
            })
    }

    componentDidMount() {
        this.getWishilistResep()
        this.getCategoryList()
    }

    renderCategory = () => {
        const { categoryList } = this.state
        return categoryList.map((val, idx) => {
            const { id, recipeCategoryName } = val
            return (
                <option value={recipeCategoryName} key={id.toString()}>{recipeCategoryName}</option>
            )
        })
    }

    renderWishlist = () => {
        const { recipeList } = this.state
        return recipeList.map(val => {
            const { recipes, users } = val
            const { recipeName, numbServings, cookTime, recipeImage } = recipes
            const { fullname } = users
            if (recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <div className="d-flex flex-column justify-content-center wishlist" key={val.id.toString()}>
                        <Link
                            to={`/resep/${val.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img src={recipeImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                            <br />
                            <h6 className="mt-2">{recipeName}</h6>
                            <p>Oleh: {fullname}</p>
                            <div className="d-flex justify-content-around mt-3">
                                <div className="d-flex details">
                                    <i className="material-icons mr-2">&#xe192;</i>
                                    <p style={{ color: "inherit" }}>{cookTime} menit</p>
                                </div>
                                <div className="d-flex details">
                                    <i className="material-icons mr-2">&#xe556;</i>
                                    <p style={{ color: "inherit" }}>{numbServings} orang</p>
                                </div>
                            </div><br />
                        </Link>
                        <div className="d-flex justify-content-around">
                            <Buttons onClick={() => this.deleteDataHandler(val.id)}>Hapus Rencana</Buttons>
                        </div>

                    </div>
                )
            } else {
                return null
            }
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
                    Axios.delete(`${API_URL}/rencana/hapus/${id}`)
                        .then(res => {
                            console.log(res.data)
                            this.getWishilistResep()
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




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Rencana Saya</h3>
                        <div className="d-flex justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Kategori:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getWishilistResep(this.state.category)}
                                    onChange={(e) => this.setState({ category: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    {this.renderCategory()}
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Urutkan:</label>
                                <select className="form-control ml-4"
                                    onClick={() => this.getWishilistResep(this.state.category)}
                                    onChange={(e) => this.setState({ sortList: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        {this.state.recipeList.length > 0 ? (
                            <div className="row d-flex flex-wrap justify-content-center text-center mt-5">
                                {this.renderWishlist()}
                            </div>
                        ) : (
                                <Alert className="mt-4">Rencana Anda Kosong! Untuk Menambah Rencana, Silahkan Tekan Tombol "Simpan Resep" di <Link to="/resep">Halaman Resep</Link></Alert>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        search: state.search,
    };
};

export default connect(mapStateToProps)(Wishlist) 