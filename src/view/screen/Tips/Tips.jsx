import React from 'react';
import './Tips.css';
import { Link } from "react-router-dom";
import Button from "../../../component/Button/Buttons";
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import { connect } from 'react-redux';

class Tips extends React.Component {
    state = {
        tipsDataList: []
    }

    getTipsData = () => {
        Axios.get(`${API_URL}/tips`)
            .then(res => {
                this.setState({ tipsDataList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getTipsData()
    }

    renderTipsData = () => {
        const { tipsDataList } = this.state
        return tipsDataList.map(val => {
            const { image, tipsName } = val
            if (tipsName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <>
                        <div className="tips-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center text-center">
                            <Link
                                to={`/tips/${val.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                                <h5 className="mt-2">{tipsName}</h5>
                                {/* <Button type="contained" className="mt-2">
                                    Baca Selengkapnya
                                </Button> */}
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
                <h3 className="text-center my-5">Tips dan Trik</h3>
                <div className="row d-flex flex-wrap justify-content-center">
                    {this.renderTipsData()}
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

export default connect(mapStateToProps)(Tips)