import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { priceFormatter } from '../../../supports/helpers/PriceFormatter'
import Buttons from '../../../component/Button/Buttons'
import { Card } from 'reactstrap'

class Wishlist extends React.Component {
    state = {
        productList: [],
        recipeList: [],
        activePage: "recipe"
    }

    getWishilistProduct = () => {
        Axios.get(`${API_URL}/wishlistProducts`, {
            params: {
                userId: this.props.user.id,
                _expand: "product",
            }
        })
            .then(res => {
                this.setState({ productList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getWishilistResep = () => {
        Axios.get(`${API_URL}/wishlistRecipes`, {
            params: {
                userId: this.props.user.id,
                _expand: "recipe",
                _expand: "user"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ recipeList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getWishilistProduct()
        this.getWishilistResep()
    }

    renderWishlist = () => {
        const { activePage } = this.state;
        if (activePage == "recipe") {
            const { recipeList } = this.state
            return recipeList.map(val => {
                return (
                    <>
                        <h5>Ini Wishlist Resep</h5>
                        <div className="d-flex flex-column justify-content-center">
                            <Link
                                to={`/resep/${val.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Card recipe={val} />
                            </Link>
                        </div>
                    </>
                )
            })
        } else {
            const { productList } = this.state
            return productList.map(val => {
                const { product } = val
                const { image, productName, price, netto } = product
                return (
                    <div className="product-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center text-center">
                        <Link
                            to={`/produk/${val.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img src={image} alt="" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                            <h5 className="mt-2">{productName}</h5>
                            <p>{netto}</p>
                            <h6 className="mt-2"> {priceFormatter(price)}</h6>
                        </Link>
                    </div>
                )
            })
        }
    }




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Rencana Saya</h3>
                        <div className="d-flex">
                            <Buttons type="contained" className={`${
                                this.state.activePage == "recipe" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "recipe" })} >Resep</Buttons>
                            <Buttons type="outlined" className={`ml-3 ${
                                this.state.activePage == "product" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "product" })}>Produk</Buttons>
                        </div>
                        <div className="row d-flex flex-wrap justify-content-center text-center mt-5">
                            {this.renderWishlist()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Wishlist) 