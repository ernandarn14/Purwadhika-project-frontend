import React from "react"
import "./ProductDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom"
import Button from "../../../component/Button/Buttons"
import { connect } from "react-redux"
import swal from "sweetalert"

class ProductDetails extends React.Component {
    state = {
        productDetailList: {
            productName: "",
            price: 0,
            category: "",
            netto: "",
            image: "",
            desc: ""
        }
    }

    getProductDetails = () => {
        Axios.get(`${API_URL}/products/${this.props.match.params.produkId}`)
            .then(res => {
                this.setState({ productDetailList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    componentDidMount() {
        this.getProductDetails()
    }

    addToCart = () => {
        Axios.get(`${API_URL}/keranjangBelanja`, {
            params: {
                idPengguna: this.props.user.id,
                produkId: this.state.productDetailList.id
            }
        })
            .then(res => {
                if (res.data.length) {
                    Axios.patch(`${API_URL}/keranjangBelanja/${res.data[0].id}`, {
                        quantity: res.data[0].quantity + 1
                    })
                        .then(res => {
                            swal('Sukses', 'Produk Berhasil Ditambah ke Keranjang Belanja', 'success')
                        })
                        .catch(err => {
                            console.log(err)
                            swal('Gagal', 'Produk Gagal Ditambah ke Keranjang Belanja', 'success')
                        })
                } else {
                    Axios.post(`${API_URL}/keranjangBelanja`, {
                        idPengguna: this.props.user.id,
                        produkId: this.state.productDetailList.id,
                        quantity: 1
                    })
                        .then(res => {
                            swal('Sukses', 'Produk Berhasil Ditambah ke Keranjang Belanja', 'success')
                        })
                        .catch(err => {
                            console.log(err)
                            swal('Gagal', 'Produk Gagal Ditambah ke Keranjang Belanja', 'success')
                        })
                }
            })
    }



    render() {
        const { productDetailList } = this.state
        const { productName, price, category, netto, image, desc } = productDetailList
        return (
            <div className="container">
                <div className="d-flex justify-content-start mt-4">
                    <Link to="/produk" style={{ textDecoration: "none" }}>
                        <Button type="textual">
                            Kembali ke Halaman Produk
                                </Button>
                    </Link>
                </div>
                <h4 className="text-center my-5">{productName}</h4>
                <div className="row">
                    <div className="col-6 text-right">
                        <img src={image} alt="" style={{ width: "300px", height: "300px", objectFit: "contain" }} className="mt-2" />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        {/* <h4>{productName}</h4> */}
                        <div className="d-flex">
                            <h6>{category}</h6>
                            <h6 className="mx-3">|</h6>
                            <h6>{netto}</h6>
                        </div>
                        <h5 className="mt-3">
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(price)}
                        </h5>
                        <p>{desc}</p>
                        <div className="d-flex justify-content-start mt-3">
                            <Button type="outlined">Tambah ke Rencana</Button>
                            <Button type="contained" className="ml-3" onClick={this.addToCart}>
                                Tambah ke Keranjang
                            </Button>
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

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(ProductDetails)