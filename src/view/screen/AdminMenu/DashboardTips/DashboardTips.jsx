import React from 'react';
import "./DashboardTips.css";
import { Link } from "react-router-dom";
import Button from "../../../../component/Button/Buttons";
import Axios from 'axios';
import { API_URL } from '../../../../constants/API';
import swal from "sweetalert";
import { connect } from 'react-redux';
import Buttons from '../../../../component/Button/Buttons';


class DashboardTips extends React.Component {
    state = {
        tipsDataList: [],
        editTipsForm: [],
        selectedFile: null,
        activePage: "admin",
        sort: "asc"
    }

    editBtnHandler = (idx) => {
        this.setState({
            editTipsForm: {
                ...this.state.tipsDataList[idx],
            },
        });
    };

    getTipsData = () => {
        Axios.get(`${API_URL}/tips/admin/${this.state.sort}`)
            .then(res => {
                console.log(res.data)
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
        const { tipsDataList, activePage } = this.state
        return tipsDataList.map((val, idx) => {
            const { tipsName, postedDate, users } = val
            const { username, role } = users
            const date = new Date(postedDate)
            if (tipsName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                if (activePage === "admin") {
                    if (role === "admin") {
                        return (
                            <tr key={val.id.toString()}>
                                <td>{tipsName}</td>
                                <td>{username}</td>
                                <td>{date.toLocaleString('en-GB')}</td>
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
                    }
                }
                else {
                    if (role === "pengguna") {
                        return (
                            <tr key={val.id.toString()}>
                                <td>{tipsName}</td>
                                <td>{username}</td>
                                <td>{date.toLocaleString('en-GB')}</td>
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
                    }
                }
            }
        })
    }

    editBtnHandler = (idx) => {
        this.setState({
            editTipsForm: {
                ...this.state.tipsDataList[idx],
            }
        });
    };

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



    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h3 className="text-center mt-5">Dashboard Tips dan Trik</h3>
                        <div className="d-flex justify-content-start my-5">
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "admin" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "admin" })}>
                                Admin
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "pengguna" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "pengguna" })}>
                                Pengguna
                            </Buttons>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <label>Urutkan:</label>
                            <select className="form-control ml-4"
                                onClick={() => this.getTipsData()}
                                onChange={(e) => this.setState({ sort: e.target.value })}
                            >
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                            </select>
                        </div>
                        <Link to="/admin/tips/tambah" style={{ textDecoration: "none" }}>
                            <Button type="outlined" className="mt-5">
                                Tambah Artikel Tips dan Trik
                            </Button>
                        </Link>
                        <table className="tips-table mt-4 table table-bordered w-auto">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Username</th>
                                    <th>Tanggal Unggah</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTipsData()}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(DashboardTips) 
