import React from "react";
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class AddTips extends React.Component {
    state = {
        addTipsForm: {
            gambar: "",
            judul: "",
            tglPosting: new Date(),
            tglEdit: "",
            deskripsi: "",
            id: 0
        },
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

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };

    addTipsHandler = () => {
        Axios.post(`${API_URL}/tips`, this.state.addTipsForm)
            .then(res => {
                swal("Sukses", "Artikel Berhasil Ditambah!", "success")
                this.getTipsData()
                // this.setState({
                //     addTipsForm: {
                //         gambar: "",
                //         judul: "",
                //         tglPosting: "",
                //         deskripsi: "",
                //         id: 0
                //     }
                // })
            })
            .catch(err => {
                swal("Gagal", "Artikel Gagal Ditambah!", "error")
            })
    }

    render() {
        const { gambar, judul, deskripsi } = this.state.addTipsForm
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Tambah Artikel Tips dan Trik</h3>
                        <div className="d-flex justify-content-start">
                            <Link to="/admin/tips" style={{ textDecoration: "none" }}>
                                <Button type="textual">
                                    Kembali ke Dasboard Tips
                            </Button>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={judul}
                                onChange={(e) =>
                                    this.inputHandler(e, "judul", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                value={gambar}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "gambar", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" rows="25" placeholder="Mulai Menulis Artikel"
                                value={deskripsi} onChange={(e) =>
                                    this.inputHandler(e, "deskripsi", "addTipsForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/admin/tips">
                                <Button type="contained" className="mt-4" onClick={this.addTipsHandler}>
                                    Simpan
                            </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTips