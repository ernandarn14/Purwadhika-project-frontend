import React from "react";
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class EditTips extends React.Component {
    state = {
        selectedFile: null,
        editTipsForm: {
            tipsImage: "",
            users: {
                id: this.props.user.id,
            },
            tipsName: "",
            postedDate: "",
            editDate: new Date(),
            tipsContent: "",
            id: 0
        }
    }

    getTipDataDetails = () => {
        Axios.get(`${API_URL}/tips/${this.props.match.params.tipsId}`)
            .then(res => {
                // console.log(res.data)
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

    // editTipsHandler = () => {
    //     Axios.put(`${API_URL}/tips/${this.props.match.params.tipsId}`, this.state.editTipsForm)
    //         .then(res => {
    //             swal("Sukses", "Artikel Berhasil Diubah!", "success")
    //             this.setState({
    //                 editTipsForm: {
    //                     image: "",
    //                     tipsName: "",
    //                     uploadDate: "",
    //                     editDate: "",
    //                     desc: "",
    //                     id: 0
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             swal("Gagal", "Artikel Gagal Diubah!", "error")
    //         })
    // }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    editTipsHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.editTipsForm))

        Axios.put(`${API_URL}/tips/edit/${this.props.match.params.tipsId}/pengguna/${this.props.user.id}`, formData)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Artikel Berhasil Diubah!", "success")
                this.setState({
                    editTipsForm: {
                        tipsImage: "",
                        tipsName: "",
                        postedDate: "",
                        editDate: "",
                        tipsContent: "",
                        id: 0
                    }
                })
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Artikel Gagal Diubah!", "error")
            })
        console.log(JSON.stringify(this.state.editTipsForm));
    };

    render() {
        const { image, tipsName, tipsContent } = this.state.editTipsForm
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
                            <input type="text" className="form-control w-75 form-control-lg"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "editTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="file" className="form-control-lg form-control-lg"
                                onChange={this.fileChangeHandler}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75 form-control-lg" rows="25"
                                value={tipsContent} onChange={(e) =>
                                    this.inputHandler(e, "tipsContent", "editTipsForm")
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

export default connect(mapStateToProps)(EditTips) 