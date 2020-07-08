import React from 'react';
import "./DashboardTips.css";
import { Link } from "react-router-dom";
import Button from "../../../../component/Button/Buttons";
import Axios from 'axios';
import { API_URL } from '../../../../constants/API';
import swal from "sweetalert";


class DashboardTips extends React.Component {
    state = {
        tipsDataList: [],
        // editTipsForm: {
        //     image: "",
        //     tipsName: "",
        //     postedDate: "",
        //     editDate: new Date(),
        //     desc: "",
        //     id: 0
        // }
        editTipsForm: []
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
        return tipsDataList.map((val, idx) => {
            const { tipsName, postedDate, users } = val
            const { username } = users
            return (
                <tr key={val.id.toString()}>
                    <td>{idx+=1}</td>
                    {/* <td>
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={image} alt="" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                        </div>
                    </td> */}
                    <td>{tipsName}</td>
                    <td>{username}</td>
                    <td>{postedDate}</td>
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
                        <h3 className="text-center my-5">Dashboard Tips dan Trik</h3>
                        <Link to="/admin/tips/tambah" style={{ textDecoration: "none" }}>
                            <Button type="outlined">
                                Tambah Artikel Tips dan Trik
                            </Button>
                        </Link>
                        <table className="tips-table mt-4 table table-bordered w-auto">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    {/* <th>Gambar</th> */}
                                    <th>Judul</th>
                                    <th>Username</th>
                                    <th>Tanggal Posting</th>
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

export default DashboardTips
