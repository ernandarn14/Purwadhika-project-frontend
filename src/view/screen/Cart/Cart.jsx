import React from "react"
import Axios from "axios"
import "./Cart.css"
import { API_URL } from "../../../constants/API"
import { connect } from "react-redux"
import { priceFormatter } from "../../../supports/helpers/PriceFormatter"
import Buttons from "../../../component/Button/Buttons"
import swal from "sweetalert"
import { Alert } from "reactstrap"
import { Link } from "react-router-dom"
import { countCart } from "../../../redux/actions";

class Cart extends React.Component {
    state = {
        cartList: []
    }

    getCartList = () => {
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then((res) => {
                console.log(res.data);
                this.props.countCart(this.props.user.id);
                this.setState({ cartList: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getCartList()
    }

    renderCartList = () => {
        const { cartList } = this.state
        return cartList.map((val, idx) => {
            const { quantity, product, id } = val
            const { productName, image, price, category } = product
            return (
                <tr>
                    <td className="text-left">
                        <div className="d-flex align-items-center justify-content-center">
                            <img
                                className="mr-4"
                                src={image}
                                alt=""
                                style={{
                                    width: "100px",
                                    height: "150px",
                                    objectFit: "contain",
                                }}
                            />
                            <div>
                                <strong>{productName}</strong>
                                <p>{category}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <strong>
                            {priceFormatter(price)}

                        </strong>
                    </td>
                    <td>
                        <div className="d-flex justify-content-center align-items-center">
                            {/* <Buttons type="outlined">+</Buttons> */}
                            <strong className="mx-3">{quantity}</strong>
                            {/* <Buttons type="outlined">-</Buttons> */}
                        </div>
                    </td>
                    <td>
                        <strong>
                            {priceFormatter(price * quantity)}
                        </strong>
                    </td>
                    <td>
                        <i className="material-icons" onClick={() => this.deleteCartHandler(id)}>&#xe872;</i>
                    </td>
                </tr>
            )
        })
    }

    deleteCartHandler = (id) => {
        swal({
            title: "Anda yakin untuk menghapus data?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(`${API_URL}/carts/${id}`)
                        .then((res) => {
                            this.getCartList();
                            this.props.countCart(this.props.user.id);
                        })
                        .catch((err) => {
                            console.log(err);
                            alert('Data Gagal Dihapus!')
                        });
                    swal("Data Berhasil Dihapus!", {
                        icon: "success",
                    });
                }
            });
    };

    renderSubTotalPrice = () => {
        let totalPrice = 0;

        this.state.cartList.forEach((val) => {
            const { quantity, product } = val;
            const { price } = product;

            totalPrice += quantity * price;
        });

        return totalPrice;
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Keranjang Belanja Saya</h3>
                        {this.state.cartList.length ? (
                            <>
                                <table className="cart-data table table-bordered">
                                    {/* <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah Barang</th>
                                    <th>Total Harga</th>
                                    <th></th>
                                </tr>
                            </thead> */}
                                    <tbody>
                                        {this.renderCartList()}
                                    </tbody>
                                </table>
                                <div className="d-flex flex-column justify-content-center">
                                    <h6>Sub Total: {priceFormatter(this.renderSubTotalPrice())}</h6>
                                    <Buttons type="contained">Checkout</Buttons>
                                </div>
                            </>
                        ) : (
                                <Alert>
                                    Keranjang Belanja Kosong!
                                    <Link to="/produk" style={{ textDecoration: "none", color: "inherit" }} className="ml-2">
                                        <strong>Mulai Belanja?</strong>
                                    </Link>
                                </Alert>
                            )
                        }
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

export default connect(mapStateToProps, mapDispacthToProps)(Cart) 