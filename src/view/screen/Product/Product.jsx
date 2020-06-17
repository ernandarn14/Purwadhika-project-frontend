import React from 'react'
import './Product.css'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { priceFormatter } from '../../../supports/helpers/PriceFormatter';
// import Button from "../../../component/Button/Buttons";

class Produk extends React.Component {
    state = {
        productList: [],
        categoryFilter: ""
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
            const { image, productName, price, netto } = val
            if (productName.toLowerCase().includes(this.props.search.searchInput.toLowerCase()) &&
            val.category.toLowerCase().includes(this.state.categoryFilter)) {
                return (
                    <>
                        <div className="product-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center text-center">
                            <Link
                                to={`/produk/${val.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img src={image} alt="" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                                <h5 className="mt-2">{productName}</h5>
                                <p>{netto}</p>
                                <h6 className="mt-2"> {priceFormatter(price)}</h6>
                                {/* <Link
                            to=""
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button type="contained" className="mt-2">
                                Tambah ke Keranjang
                                </Button>
                        </Link> */}
                            </Link>
                        </div>
                    </>
                )
            }
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Katalog Produk</h3>
                        <div className="d-flex">
                            <label>Kategori: </label>
                            <select id="kategori" className="ml-3">
                                <option>Tepung</option>
                                <option>Ragi</option>
                                <option>Pewarna</option>
                                <option>Perasa</option>
                            </select>
                        </div>
                        <div className="row mt-3 d-flex flex-wrap justify-content-center">
                            {this.renderProductData()}
                        </div>
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


export default connect(mapStateToProps)(Produk)