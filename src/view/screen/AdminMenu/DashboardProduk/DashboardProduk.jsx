import React from "react"
import "./DashboardProduk.css"
import Axios from "axios"
import { API_URL } from "../../../../constants/API"
import Button from "../../../../component/Button/Buttons";
import swal from "sweetalert";
import { priceFormatter } from "../../../../supports/helpers/PriceFormatter"

class DashboardProduk extends React.Component {
    state = {
        productList: [],
        addForm: {
            productName: "",
            price: 0,
            category: "Tepung",
            netto: 0,
            image: "",
            id: 0
        }
    }

    getProductData = () => {
        Axios.get(`${API_URL}/products`)
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
            const { productName, price, category } = val
            return (
                <tr>
                    <td>{productName}</td>
                    <td>{category}</td>
                    <td>{priceFormatter(price)}</td>
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
                        productName: "",
                        price: 0,
                        category: "Tepung",
                        netto: 0,
                        image: "",
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
                                    <th>Kategori</th>
                                    <th>Harga</th>
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
                                        value={this.state.addForm.productName}
                                        placeholder="Nama Produk"
                                        onChange={(e) =>
                                            this.inputHandler(e, "productName", "addForm")
                                        }
                                    />
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.price}
                                        placeholder="price"
                                        onChange={(e) => this.inputHandler(e, "price", "addForm")}
                                    />
                                </div>
                                <div className="col-4">
                                    <select
                                        value={this.state.addForm.category}
                                        className="custom-text-input h-100 pl-3"
                                        onChange={(e) => this.inputHandler(e, "category", "addForm")}
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
                                        value={this.state.addForm.netto}
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