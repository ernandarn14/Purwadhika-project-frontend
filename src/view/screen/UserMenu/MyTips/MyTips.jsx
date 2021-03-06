import React from 'react'
import "./MyTips.css"
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import Buttons from '../../../../component/Button/Buttons'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Alert } from 'reactstrap'

class MyTips extends React.Component {
    state = {
        selectedFile: null,
        tipsDataList: [],
        editTips: [],
        sortList: "asc",
    }

    getTipsData = () => {
        Axios.get(`${API_URL}/tips/pengguna/${this.props.user.id}/${this.state.sortList}`
        )
            .then(res => {
                console.log(res.data)
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
            const { tipsImage, tipsName, tipsContent } = val
            if (tipsName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <div className="row d-flex justify-content-start mt-4 align-items-center tipslist" key={val.id.toString()}>
                        <div className="col-3">
                            <img src={tipsImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                        </div>
                        <div className="col-9">
                            <div className="d-flex flex-column ml-4 justify-content-center">
                                <h5 className="mt-2">{tipsName}</h5>
                                <p style={{ textAlign: "justify" }}>{tipsContent}</p>
                                <div className="d-flex my-4">
                                    <Link to={`/tipsku/edit/${val.id}`} style={{ color: "inherit" }}>
                                        <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                    </Link>
                                    <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return null
            }
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
                    Axios.delete(`${API_URL}/tips/delete/${id}`)
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
            editTips: {
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
                        <div className="d-flex align-items-center justify-content-center">
                            <label>Urutan:</label>
                            <select className="form-control ml-4"
                                onClick={() => this.getTipsData()}
                                onChange={(e) => this.setState({ sortList: e.target.value })}
                            >
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                            </select>
                        </div>
                        <Link to="/tipsku/tambah" style={{ textDecoration: "none" }}>
                            <Buttons type="contained" className="mt-5">
                                Tambah Artikel Tips dan Trik
                            </Buttons>
                        </Link>
                        {this.state.tipsDataList.length > 0 ? (
                            <div className="container mt-4 d-flex justify-content-center flex-column align-items-center">
                                {this.renderTipsData()}
                            </div>
                        ) : (
                                <Alert className="mt-3">Artikel Tips dan Trik Anda Kosong! Silahkan Tambah Artikel</Alert>
                            )}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        search: state.search,
    }
}

export default connect(mapStateToProps)(MyTips) 