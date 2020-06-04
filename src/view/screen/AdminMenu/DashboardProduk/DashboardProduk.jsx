import React from "react"
import "./DashboardProduk.css"
import Axios from "axios"
import { API_URL } from "../../../../constants/API"
import Button from "../../../../component/Button/Buttons";
import swal from "sweetalert";

class DashboardProduk extends React.Component {
    state = {
        productList: [],
        addForm: {
            namaProduk: "",
            harga: 0,
            kategori: "Tepung",
            berat: 0,
            gambar: "",
            id: 0
        }
    }

    getProductData = () => {
        Axios.get(`${API_URL}/produk`)
            .then(res => {
                this.setState({ productList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getProductData()
    }

    renderProductData = () => {
        const { productList } = this.state
        return productList.map(val => {
            const { namaProduk, harga, kategori } = val
            return (
                <tr>
                    <td>{namaProduk}</td>
                    <td>{kategori}</td>
                    <td>{harga}</td>
                </tr>
            )
        })
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

    addProductHandler = () => {
        Axios.post(`${API_URL}/produk`, this.state.addForm)
            .then(res => {
                swal("Sukses", "Data Produk Berhasil Ditambah!", "success")
                this.setState({
                    addForm: {
                        namaProduk: "",
                        harga: 0,
                        kategori: "Tepung",
                        berat: 0,
                        gambar: "",
                        id: 0
                    }
                })
                this.getProductData()
            })
            .catch(err => {
                swal("Gagal", "Data Produk Gagal Ditambah!", "error")
            })
    }




    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Produk</h3>
                        <table className="product-table table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Kategori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProductData()}
                            </tbody>
                        </table>
                        <div className="dashboard-form-container p-4">
                            <caption className="mb-4 mt-2">
                                <h4>Tambah Produk</h4>
                            </caption>
                            <div className="row">
                                <div className="col-4">
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.namaProduk}
                                        placeholder="Nama Produk"
                                        onChange={(e) =>
                                            this.inputHandler(e, "namaProduk", "addForm")
                                        }
                                    />
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.harga}
                                        placeholder="Harga"
                                        onChange={(e) => this.inputHandler(e, "harga", "addForm")}
                                    />
                                </div>
                                <div className="col-4">
                                    <select
                                        value={this.state.addForm.kategori}
                                        className="custom-text-input h-100 pl-3"
                                        onChange={(e) => this.inputHandler(e, "kategori", "addForm")}
                                    >
                                        <option>Tepung</option>
                                        <option>Ragi</option>
                                        <option>Pewarna</option>
                                        <option>Perasa</option>
                                    </select>
                                </div>
                                <div className="col-4 mt-3">
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.gambar}
                                        placeholder="URL Gambar"
                                        onChange={(e) => this.inputHandler(e, "gambar", "addForm")}
                                    />
                                </div>
                                <div className="col-4 mt-3">
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.berat}
                                        placeholder="Berat Produk"
                                        onChange={(e) => this.inputHandler(e, "berat", "addForm")}
                                    />
                                </div>
                                <div className="col-4 mt-3">
                                    <Button type="contained" onClick={this.addProductHandler}>
                                        Simpan
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardProduk