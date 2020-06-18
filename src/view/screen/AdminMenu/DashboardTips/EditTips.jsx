import React from "react";
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class EditTips extends React.Component {
    state = {
        editTipsForm: {
            image: "",
            tipsName: "",
            uploadDate: "",
            editDate: new Date(),
            desc: "",
            id: 0
        }
    }

    getTipDataDetails = () => {
        Axios.get(`${API_URL}/tips/${this.props.match.params.tipsId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ tipsList: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    componentDidMount(){
        this.getTipDataDetails()
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

    editTipsHandler = () => {
        Axios.put(`${API_URL}/tips/${this.state.editTipsForm.id}`, this.state.editTipsForm)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Artikel Berhasil Diubah!", "success")
            })
            .catch(err => {
                swal("Gagal", "Artikel Gagal Diubah!", "error")
            })
    }

    render() {
        const { image, tipsName, desc } = this.state.editTipsForm
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
                        <h3 className="text-center my-5">Edit Artikel</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "editTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                value={image}
                                placeholder="Url Gambar"
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "editTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" rows="25" placeholder="Mulai Menulis Artikel"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "editTipsForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            {/* <Link to="/admin/tips"> */}
                                <Button type="contained" className="mt-4" onClick={this.editTipsHandler}>
                                    Simpan
                            </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTips