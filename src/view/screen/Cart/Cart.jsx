import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { connect } from "react-redux"

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
            const { quantity, product } = val
            const { productName, image, price, category } = product
            return (
                <tr>
                    <td className="text-left">
                        <div className="d-flex align-items-center">
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
                    <td style={{ verticalAlign: "middle" }}>
                        <strong>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(price)}
                        </strong>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                        <strong>{quantity}</strong>
                    </td>
                    <td>
                        <strong>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(price * quantity)}
                        </strong>
                    </td>
                </tr>
            )
        })
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Keranjang Belanja Saya</h3>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah Barang</th>
                                    <th>Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCartList()}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(Cart) 