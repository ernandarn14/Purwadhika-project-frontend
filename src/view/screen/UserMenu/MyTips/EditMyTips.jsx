import React from 'react'
import { connect } from 'react-redux'
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";


class EditMyTips extends React.Component {
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
                this.setState({ editTipsForm: res.data })
            })
            .catch(err => {
                console.log(err)
                alert("Data Kosong")
            })
    }

    componentDidMount() {
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
        Axios.put(`${API_URL}/tips/${this.props.match.params.tipsId}`, this.state.editTipsForm)
            .then(res => {
                swal("Sukses", "Artikel Berhasil Diubah!", "success")
                this.setState({
                    editTipsForm: {
                        image: "",
                        tipsName: "",
                        uploadDate: "",
                        editDate: "",
                        desc: "",
                        id: 0
                    }
                })
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Artikel Gagal Diubah!", "error")
            })
    }


    render() {
        const { image, tipsName, desc } = this.state.editTipsForm
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
                        <h3 className="text-center my-5">Edit Artikel Tips dan Trik</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "editTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                value={image}
                                onChange={(e) =>
                                    this.inputHandler(e, "image", "editTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" rows="25"
                                value={desc} onChange={(e) =>
                                    this.inputHandler(e, "desc", "editTipsForm")
                                }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="contained" className="mt-4" onClick={this.editTipsHandler}>
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

export default connect(mapStateToProps)(EditMyTips) 