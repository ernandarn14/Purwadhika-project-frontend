import React from 'react'
import "./MyTips.css"
import { connect } from 'react-redux'
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";


class AddNewTips extends React.Component {
    state = {
        addTipsForm: {
            image: "",
            userId: this.props.user.id,
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
                        <Link to="/tipsku" style={{ textDecoration: "none" }}>
                            <Button type="textual">
                                Kembali ke Halaman Tips Saya
                            </Button>
                        </Link>
                    </div>
                    <div className="col-12">
                        <h3 className="text-center my-5">Tambah Artikel Tips dan Trik</h3>
                        {/* <form className="form-add-recipe">
                            <label>Judul Artikel</label>
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "addTipsForm")
                                }
                            />
                            <label className="mt-3">Gambar</label>
                            <input type="text" className="form-control w-75"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "addTipsForm")
                                }
                            />
                            <label className="mt-3">Isi Artikel</label>
                            <textarea className="form-control w-75" rows="25" placeholder="Mulai Menulis Artikel"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "addTipsForm")
                                }
                            ></textarea>
                            <div className="d-flex justify-content-center">
                                <Button type="contained" className="mt-4" onClick={this.addTipsHandler}>
                                    Simpan
                            </Button>
                            </div>
                        </form> */}

                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75 form-control-lg"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75 form-control-lg"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <textarea className="form-control w-75 form-control-lg" rows="25" placeholder="Mulai Menulis Artikel"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "addTipsForm")
                                }
                            ></textarea>
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AddNewTips) 