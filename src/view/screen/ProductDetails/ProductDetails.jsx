import React from "react"
import "./ProductDetails.css"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Link } from "react-router-dom"
import Buttons from "../../../component/Button/Buttons"
import { connect } from "react-redux"
import swal from "sweetalert"
import { countCart } from "../../../redux/actions";
import { priceFormatter } from "../../../supports/helpers/PriceFormatter"

class ProductDetails extends React.Component {
    state = {
        productDetailList: {
            productName: "",
            brand: [],
            price: 0,
            category: "",
            netto: "",
            image: "",
            desc: "",
            id: 0
        }
    }

    getProductDetails = () => {
        Axios.get(`${API_URL}/products/${this.props.match.params.produkId}`, {
            params: {
                _expand: "brand"
            }
        })
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
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: this.props.user.id,
                productId: this.state.productDetailList.id
            }
        })
            .then(res => {
                if (res.data.length) {
                    Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
                        quantity: res.data[0].quantity + 1
                    })
                        .then(res => {
                            swal('Sukses', 'Produk Berhasil Ditambah ke Keranjang Belanja', 'success')
                            this.props.countCart(this.props.user.id);
                        })
                        .catch(err => {
                            console.log(err)
                            swal('Gagal', 'Produk Gagal Ditambah ke Keranjang Belanja', 'error')
                        })
                } else {
                    Axios.post(`${API_URL}/carts`, {
                        userId: this.props.user.id,
                        productId: this.state.productDetailList.id,
                        quantity: 1
                    })
                        .then(res => {
                            swal('Sukses', 'Produk Berhasil Ditambah ke Keranjang Belanja', 'success')
                            this.props.countCart(this.props.user.id);
                        })
                        .catch(err => {
                            console.log(err)
                            swal('Gagal', 'Produk Gagal Ditambah ke Keranjang Belanja', 'error')
                        })
                }
            })
    }

    addWishlistProduct = () => {
        Axios.get(`${API_URL}/wishlistProducts`, {
            params: {
                userId: this.props.user.id,
                productId: this.state.productDetailList.id
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.length) {
                    swal('Gagal', 'Produk Sudah Ada di Rencana Saya', 'error')
                } else {
                    Axios.post(`${API_URL}/wishlistProducts`, {
                        userId: this.props.user.id,
                        productId: this.state.productDetailList.id
                    })
                        .then(res => {
                            console.log(res);
                            swal('Sukses', 'Produk Ditambah di Rencana Saya', 'success')
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        const { productName, price, category, netto, image, desc, brand } = this.state.productDetailList
        const { brandName } = brand
        return (
            <div className="container">
                <div className="d-flex justify-content-start mt-4">
                    <Link to="/produk" style={{ textDecoration: "none" }}>
                        <Buttons type="textual">
                            Kembali ke Halaman Produk
                        </Buttons>
                    </Link>
                </div>
                <h3 className="text-center mt-5 productName">{productName}</h3>
                <div className="row">
                    <div className="col-6 text-right">
                        <img src={image} alt="" style={{ width: "300px", height: "300px", objectFit: "contain" }} className="mt-2" />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h4>{brandName}</h4>
                        <div className="d-flex">
                            <h6>{category}</h6>
                            <h6 className="mx-3">|</h6>
                            <h6>{netto}</h6>
                        </div>
                        <h5 className="mt-3">
                            {priceFormatter(price)}
                        </h5>
                        <div className="d-flex justify-content-start mt-3">
                            <Buttons type="outlined" onClick={this.addWishlistProduct}>Tambah ke Rencana</Buttons>
                            <Buttons type="contained" className="ml-3" onClick={this.addToCart}>
                                Tambah ke Keranjang
                            </Buttons>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 desc-product">
                    <div className="col-12">
                        <h4 className="desc-header">Deskripsi Produk</h4>
                        <p style={{ color: "inherit" }}>{desc}</p>
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

const mapDispacthToProps = {
    countCart
}

export default connect(mapStateToProps, mapDispacthToProps)(ProductDetails)