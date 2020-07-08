import React from 'react'
import './UserProfile.css'
import Buttons from '../../../../component/Button/Buttons'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import swal from "sweetalert";

class UserProfile extends React.Component {
    state = {
        selectedFile: null,
        userData: [],
        activePage: "profile",
        editUserForm: {
            // id: this.props.user.id,
            email: "",
            username: "",
            password: "",
            //isVerified: this.props.user.isVerified,
            role: "pengguna",
            //verifyToken: this.props.user.verifyToken,
            fullname: "",
            noHp: "",
            profilePicture: ""
        },
        editPasswordForm: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        modalEditOpen: false,
        modalEditPwdOpen: false
    }

    getUserData = () => {
        Axios.get(`${API_URL}/pengguna/id`, {
            params: {
                id: this.props.user.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ userData: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getUserData()
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

    editBtnProfileHandler = () => {
        this.setState({
            editUserForm: {
                ...this.state.userData,
            },
            modalEditOpen: true,
        });
    };

    editBtnPassword = () => {
        this.setState({
            editPasswordForm: {
                ...this.state.userData,
            },
            modalEditPwdOpen: true,
        });
    };

    toggleModalEdit = () => {
        this.setState({ modalEditOpen: !this.state.modalEditOpen });
    };

    toggleModalEditPassword = () => {
        this.setState({ modalEditPwdOpen: !this.state.modalEditPwdOpen });
    };

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    editUserHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.editUserForm))

        Axios.patch(`${API_URL}/pengguna/ubah/${this.props.user.id}`, formData)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Profil Berhasil Diubah!", "success")
                this.setState({ modalEditOpen: false, selectedFile: null })
                this.getUserData()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Profil Gagal Diubah!", "error")
            })
        console.log(JSON.stringify(this.state.editUserForm));
    }

    updatePasswordHandler = () => {
        const { userData } = this.state
        const { oldPassword, newPassword, confirmPassword} = this.state.editPasswordForm
        let newUserData = {...userData}
        console.log(newUserData)

        if (newPassword === confirmPassword){
            Axios.put(`${API_URL}/pengguna/ubah-password/${this.props.user.id}`, newUserData, {
                params: {
                    oldPassword,
                    newPassword
                }
            })
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Password Berhasil Diubah!", "success")
                this.setState({ modalEditOpen: false })
                this.getUserData()
            })
            .catch(err => {
                swal("Gagal", "Password Gagal Diubah!", "error")
            })
        } else {
            swal("Gagal", "Password Salah!", "error")
        }
    }

    renderViewPage = () => {
        const { username, fullname, noHp, email, profilePicture } = this.state.userData
        const { activePage } = this.state
        if (activePage == "profile") {
            return (
                <>
                    <h6 className="header-profile">Ubah Profil</h6>
                    <div className="d-flex flex-column align-items-center justify-content-center text-center mt-4">
                        {profilePicture == null ? <FontAwesomeIcon icon={faUser} style={{ fontSize: 50 }} /> :
                            <img src={profilePicture} alt="" className="profil-img" />
                        }
                        <Buttons type="outlined" className="mt-4" onClick={this.editBtnProfileHandler}>Ubah Sekarang</Buttons>
                    </div>
                    <div className="row">
                        <div className="col-8 mt-5">
                            <table className="usertabel">
                                <tr>
                                    <td className="label">Nama Lengkap</td>
                                    <td>{fullname}</td>
                                </tr>
                                <tr>
                                    <td className="label">Username</td>
                                    <td>{username}</td>
                                </tr>
                                <tr>
                                    <td className="label">Nomor Handphone</td>
                                    <td>{noHp}</td>
                                </tr>
                                <tr>
                                    <td className="label">Email</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td className="label">Password</td>
                                    <td><Buttons type="textual" onClick={this.editBtnPassword}>Ubah</Buttons></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <Modal
                        toggle={this.toggleModalEditPassword}
                        isOpen={this.state.modalEditPwdOpen}
                        className="edit-password-modal"
                    >
                        <ModalHeader toggle={this.toggleModalEditPassword}>
                            <caption>
                                <h6>Ubah Password</h6>
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Password Lama</label>
                                <input type="text" className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.oldPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "oldPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Password Baru</label>
                                <input type="text" className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.newPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "newPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Konfirmasi Ulang Password</label>
                                <input type="text" className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.confirmPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "confirmPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalEditPassword}>Kembali</Buttons>
                                <Buttons type="contained" onClick={this.updatePasswordHandler} className="ml-3">Simpan</Buttons>
                            </div>
                        </ModalBody>
                    </Modal>

                    <Modal
                        toggle={this.toggleModalEdit}
                        isOpen={this.state.modalEditOpen}
                        className="edit-modal"
                    >
                        <ModalHeader toggle={this.toggleModalEdit}>
                            <caption>
                                <h6>Ubah Profil</h6>
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                                <label>Gambar Profil</label>
                                <input type="file" className="form-control-lg"
                                    onChange={this.fileChangeHandler}
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Username</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.userData.username} readOnly />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Nama Lengkap</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.userData.fullname}
                                    onChange={(e) =>
                                        this.inputHandler(e, "fullname", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>No. Handphone</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.userData.noHp}
                                    onChange={(e) =>
                                        this.inputHandler(e, "noHp", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Email</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.userData.email} readOnly />
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalEdit}>Kembali</Buttons>
                                <Buttons type="contained" onClick={this.editUserHandler} className="ml-3">Simpan</Buttons>
                            </div>
                        </ModalBody>
                    </Modal>
                </>
            )
        } else if (activePage === "subscription") {
            return (
                <>
                    <h6 className="header-profile">Langganan dan Keuntungan</h6>
                    <div className="d-flex flex-column align-items-center justify-content-center text-center mt-4">
                        <h5>Beli Paket Langganan Untuk Membaca Resep dan Tips Tanpa Batas!</h5>
                        <div>
                            <div>
                                <h6>Langganan Bulanan</h6>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h6 className="header-profile">Riwayat Transaksi</h6>
                </>
            )
        }
    }


    render() {
        const { fullname, profilePicture } = this.state.userData
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Profil Saya</h3>
                    </div>
                    <div className="col-4 mt-5">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            {profilePicture == null ? <FontAwesomeIcon icon={faUser} style={{ fontSize: 50 }} /> :
                                <img src={profilePicture} alt="" className="profil-img" />
                            }
                            <h6 className="mt-3">{fullname}</h6>
                        </div>
                        <div className="d-flex flex-column mt-4" style={{ marginLeft: "100px" }}>
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "profile" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "profile" })}>
                                Ubah Profil
                                </Buttons>
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "subscription" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "subscription" })}>
                                Langganan dan Keuntungan
                                    </Buttons>
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "transaction" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "transaction" })}>
                                Riwayat Transaksi
                                    </Buttons>
                        </div>
                    </div>
                    <div className="col-8 mt-5">
                        {this.renderViewPage()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserProfile) 