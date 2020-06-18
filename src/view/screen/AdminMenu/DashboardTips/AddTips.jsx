import React from "react";
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class AddTips extends React.Component {
    state = {
        addTipsForm: {
            image: "",
            tipsName: "",
            uploadDate: new Date(),
            editDate: "",
            desc: "",
            id: 0
        },
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
                console.log(res.data)
                swal("Sukses", "Artikel Berhasil Ditambah!", "success")
                this.setState({
                    addTipsForm: {
                        image: "",
                        tipsName: "",
                        uploadDate: "",
                        desc: "",
                        id: 0
                    }
                })
            })
            .catch(err => {
                swal("Gagal", "Artikel Gagal Ditambah!", "error")
            })
    }

    render() {
        const { image, tipsName, desc } = this.state.addTipsForm
        return (
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-start mt-4">
                        <Link to="/admin/tips" style={{ textDecoration: "none" }}>
                            <Button type="textual">
                                Kembali ke Dasboard Tips
                            </Button>
                        </Link>
                    </div>
                    <div className="col-12">
                        <h3 className="text-center my-5">Tambah Artikel Tips dan Trik</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" rows="25" placeholder="Mulai Menulis Artikel"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "addTipsForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="contained" className="mt-4" onClick={this.addTipsHandler}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddTips