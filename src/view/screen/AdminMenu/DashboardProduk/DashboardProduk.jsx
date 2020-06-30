import React from "react"
import "./DashboardProduk.css"
import Axios from "axios"
import { API_URL } from "../../../../constants/API"
import Button from "../../../../component/Button/Buttons";
import swal from "sweetalert";
import { priceFormatter } from "../../../../supports/helpers/PriceFormatter"
import { Link } from "react-router-dom";

class DashboardProduk extends React.Component {
    state = {
        productList: [],
        addForm: {
            productName: "",
            brandId: "",
            price: 0,
            category: "Tepung",
            netto: "",
            image: "",
            desc: "",
            id: 0
        },
        brandList: []
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

    getBrandList = () => {
        Axios.get(`${API_URL}/brands`)
            .then(res => {
                console.log(res.data)
                this.setState({ brandList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderBrandList = () => {
        const { brandList } = this.state
        return brandList.map(val => {
            return (
                <>
                    <option value={val.id}>{val.brandName}</option>
                </>
            )
        })
    }

    componentDidMount() {
        this.getProductData()
        this.getBrandList()
    }

    renderProductData = () => {
        const { productList } = this.state
        return productList.map((val, idx) => {
            const { productName, price, category } = val
            return (
                <tr>
                    <td>{productName}</td>
                    <td>{category}</td>
                    <td>{priceFormatter(price)}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to={`/admin/tips/edit/${val.id}`} style={{ color: "inherit" }}>
                            <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                            </Link>
                            <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                        </div>
                    </td>
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
        Axios.post(`${API_URL}/products`, this.state.addForm)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Data Produk Berhasil Ditambah!", "success")
                this.setState({
                    addForm: {
                        productName: "",
                        brandId: 1,
                        price: 0,
                        category: "Tepung",
                        netto: "",
                        image: "",
                        desc: "",
                        id: 0
                    }
                })
                this.getProductData()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Data Produk Gagal Ditambah!", "error")
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
                    Axios.delete(`${API_URL}/products/${id}`)
                        .then(res => {
                            console.log(res.data)
                            this.getProductData()
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
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Produk</h3>
                        <table className="product-table table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProductData()}
                            </tbody>
                        </table>
                        <div className="dashboard-form-container p-4 mt-5">
                            <caption className="mb-4 mt-2">
                                <h4>Tambah Produk</h4>
                            </caption>
                            <div className="row">
                                <div className="col-4">
                                    <label>Nama Produk:</label>
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.productName}
                                        placeholder="Nama Produk"
                                        onChange={(e) =>
                                            this.inputHandler(e, "productName", "addForm")
                                        }
                                    />
                                </div>
                                <div className="col-4">
                                <label>Harga Produk: Rp.</label>
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.price}
                                        placeholder="price"
                                        onChange={(e) => this.inputHandler(e, "price", "addForm")}
                                    />
                                </div>
                                <div className="col-4">
                                <label>Kategori Produk:</label>
                                    <select
                                        value={this.state.addForm.category}
                                        className="custom-text-input pl-1 form-control"
                                        onChange={(e) => this.inputHandler(e, "category", "addForm")}
                                    >
                                        <option>Tepung</option>
                                        <option>Ragi</option>
                                        <option>Pewarna</option>
                                        <option>Perasa</option>
                                    </select>
                                </div>
                                <div className="col-4 mt-3">
                                <label>Merk Produk:</label>
                                    <select
                                        className="custom-text-input pl-1 form-control"
                                        value={this.state.addForm.brandId}
                                        onChange={(e) => this.inputHandler(e, "brandId", "addForm")}
                                    >
                                        {this.renderBrandList()}
                                        {/* <option>Rose Brand</option>
                                        <option>Koepoe</option> */}
                                    </select>
                                </div>
                                <div className="col-4 mt-3">
                                <label>Gambar Produk:</label>
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.image}
                                        placeholder="URL Gambar"
                                        onChange={(e) => this.inputHandler(e, "image", "addForm")}
                                    />
                                </div>
                                <div className="col-4 mt-3">
                                <label>Netto Produk:</label>
                                    <input type="text" className="form-control"
                                        value={this.state.addForm.netto}
                                        placeholder="Netto Produk"
                                        onChange={(e) => this.inputHandler(e, "netto", "addForm")}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                <label>Deskripsi Produk:</label>
                                    <textarea className="form-control w-100" placeholder="Deskripsi Produk"
                                    value={this.state.addForm.desc}
                                     onChange={(e) =>
                                        this.inputHandler(e, "desc", "addForm")
                                    }
                                    >
                                    </textarea>
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