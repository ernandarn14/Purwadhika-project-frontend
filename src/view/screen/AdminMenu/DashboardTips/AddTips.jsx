import React from "react";
import Button from "../../../../component/Button/Buttons";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AddTips extends React.Component {
    state = {
        selectedFile: null,
        addTipsForm: {
            tipsImage: "",
            users: {
                id: this.props.user.id,
            },
            tipsName: "",
            postedDate: new Date(),
            editDate: "",
            tipsContent: "",
            postOption: "public",
            id: 0
        }
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

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    addTipsHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.addTipsForm))

        Axios.post(`${API_URL}/tips/pengguna/${this.props.user.id}`, formData)
            .then((res) => {
                console.log(res.data);
                swal("Sukses", "Artikel Berhasil Ditambah!", "success")
                this.setState({
                    addTipsForm: {
                        tipsImage: "",
                        tipsName: "",
                        postedDate: "",
                        tipsContent: "",
                        id: 0
                    }
                })
            })
            .catch((err) => {
                console.log(err);
                swal("Gagal", "Artikel Gagal Ditambah!", "error")
            });
        console.log(JSON.stringify(this.state.addTipsForm));
    };

    render() {
        const { tipsName, tipsContent } = this.state.addTipsForm
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
                            <input type="text" className="form-control w-75 form-control-lg"
                                placeholder="Judul Artikel Tips dan Trik"
                                value={tipsName}
                                onChange={(e) =>
                                    this.inputHandler(e, "tipsName", "addTipsForm")
                                }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="file" className="form-control-lg"
                            onChange={this.fileChangeHandler}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75 form-control-lg" rows="25" placeholder="Mulai Menulis Artikel"
                                value={tipsContent} onChange={(e) =>
                                    this.inputHandler(e, "tipsContent", "addTipsForm")
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AddTips) 