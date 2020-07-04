import React from 'react'
import "./MyTips.css"
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import Buttons from '../../../../component/Button/Buttons'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import swal from "sweetalert";

class MyTips extends React.Component {
    state = {
        tipsDataList: [],
        editTipsForm: {
            image: "",
            tipsName: "",
            uploadDate: "",
            editDate: new Date(),
            desc: "",
            id: 0
        }
    }

    getTipsData = () => {
        Axios.get(`${API_URL}/tips`, {
            params: {
                userId: this.props.user.id,
            }
        })
            .then(res => {
                this.setState({ tipsDataList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    editBtnHandler = (idx) => {
        this.setState({
            editTipsForm: {
                ...this.state.tipsDataList[idx],
            }
        });
    };

    componentDidMount() {
        this.getTipsData()
    }

    renderTipsData = () => {
        const { tipsDataList } = this.state
        return tipsDataList.map((val, idx) => {
            const { image, tipsName, desc } = val
            return (
                    <div className="d-flex justify-content-start mt-4 align-items-center tipslist" key={val.id.toString()}>
                        <img src={image} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        <div className="d-flex flex-column ml-4 justify-content-center">
                            <h5 className="mt-2">{tipsName}</h5>
                            <p style={{ textAlign: "justify" }}>{desc}</p>
                            <div className="d-flex my-4">
                                <Link to={`/tipsku/edit/${val.id}`} style={{ color: "inherit" }}>
                                    <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                </Link>
                                <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                            </div>
                        </div>
                    </div>
            )
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
                    Axios.delete(`${API_URL}/tips/${id}`)
                        .then(res => {
                            console.log(res.data)
                            this.getTipsData()
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

    editBtnHandler = (idx) => {
        this.setState({
            editTipsForm: {
                ...this.state.tipsDataList[idx],
            }
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Tips dan Trik Saya</h3>
                        <Link to="/tipsku/tambah" style={{ textDecoration: "none" }}>
                            <Buttons type="contained">
                                Tambah Artikel Tips dan Trik
                            </Buttons>
                        </Link>
                        <div className="container mt-4 d-flex justify-content-center flex-column align-items-center">
                            {this.renderTipsData()}
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

export default connect(mapStateToProps)(MyTips) 