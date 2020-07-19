import React from 'react'
import './UserProfile.css'
import Buttons from '../../../../component/Button/Buttons'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "sweetalert";
import { priceFormatter } from '../../../../supports/helpers/PriceFormatter'
import OVOImg from "../../../../assets/images/logo/ovo.png"
import GopayImg from "../../../../assets/images/logo/gopay.png"
import BCAImg from "../../../../assets/images/logo/bca.png"
import CIMBImg from "../../../../assets/images/logo/cimb.png"
import { logoutHandler } from '../../../../redux/actions'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
    state = {
        selectedFile: null,
        userData: [],
        activePage: "profile",
        editUserForm: {
            email: "",
            username: "",
            password: "",
            fullname: "",
            noHp: "",
            profilePicture: ""
        },
        editPasswordForm: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            showPassword: false
        },
        planList: [],
        paymentData: [],
        modalEditOpen: false,
        modalEditPwdOpen: false,
        modalPaymentOpen: false,
        method: "gopay",
        periode: "semua",
        sort: "asc",
        maxPrice: 99999999,
        minPrice: 0,
        orderOption: "planName"
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

    getPlanList = () => {
        // Axios.get(`${API_URL}/langganan`)
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({ planList: res.data })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        if (this.state.periode === "semua") {
            Axios.get(`${API_URL}/langganan/admin/${this.state.sort}/${this.state.orderOption}/${this.state.minPrice}/${this.state.maxPrice}`)
                .then(res => {
                    this.setState({ planList: res.data })
                    //console.log(this.state.orderOption)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Axios.get(`${API_URL}/langganan/admin/periode/${this.state.sort}/${this.state.orderOption}/${this.state.minPrice}/${this.state.maxPrice}?planPeriod=${this.state.periode}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ planList: res.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getUserData()
        this.getPlanList()
    }

    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
        //console.log(e.target.value);
    };

    checkboxHandler = (e, form) => {
        const { checked } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked,
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
        //console.log(this.state.editUserForm)
    };

    editBtnPassword = () => {
        this.setState({
            editPasswordForm: {
                ...this.state.userData,
            },
            modalEditPwdOpen: true,
        });
        //console.log(this.state.editPasswordForm)
    };

    paymentBtnHandler = (idx) => {
        this.setState({
            paymentData: {
                ...this.state.planList[idx],
            }, modalPaymentOpen: true
        })
        //console.log(this.state.paymentData)
    }

    toggleModalEdit = () => {
        this.setState({ modalEditOpen: !this.state.modalEditOpen });
    };

    toggleModalEditPassword = () => {
        this.setState({ modalEditPwdOpen: !this.state.modalEditPwdOpen });
    };

    togglModalPayment = () => {
        this.setState({ modalPaymentOpen: !this.state.modalPaymentOpen })
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    radioButtonHandler = (e) => {
        //  const { checked } = e.target
        this.setState({ method: e.target.value })
        alert(e.target.value);
    }

    editUserHandler = () => {
        let formData = new FormData();

        if (this.state.selectedFile) {
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }


        formData.append("userData", JSON.stringify(this.state.editUserForm))

        if (this.state.userData.verified === true) {
            Axios.patch(`${API_URL}/pengguna/ubah/${this.props.user.id}`, formData)
                .then(res => {
                    console.log(res.data)
                    swal("Sukses", "Profil Berhasil Diubah!", "success")
                    this.setState({ modalEditOpen: false })
                    this.getUserData()
                })
                .catch(err => {
                    console.log(err)
                    swal("Gagal", "Profil Gagal Diubah!", "error")
                })
            console.log(JSON.stringify(this.state.editUserForm));
        } else {
            swal("Gagal", "Akun Anda Belum Terverifikasi!", "error")
        }
    }

    updatePasswordHandler = () => {
        const { userData } = this.state
        const { oldPassword, newPassword, confirmPassword } = this.state.editPasswordForm
        let newUserData = { ...userData }
        console.log(newUserData)

        if (newPassword === confirmPassword) {
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
                    this.sigoutButtonHandler()
                    this.getUserData()
                })
                .catch(err => {
                    swal("Gagal", "Password Gagal Diubah!", "error")
                })
        } else {
            swal("Gagal", "Password Tidak Cocok!", "error")
        }
    }

    paymentHandler = () => {
        // const { planList } = this.state
        // const newPlan = {...planList}
        // //console.log(newPlan[idx].id)
        // alert('masuk')
        // console.log(this.state.paymentData.id)
        // Axios.get(`${API_URL}/langganan/${this.state.paymentData.id}`)
        // .then(res => {
        //     console.log(res.data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        Axios.post(`${API_URL}/transaksi/tambah/pengguna/${this.props.user.id}/langganan/${this.state.paymentData.id}`, {
            userId: this.props.user.id,
            planId: this.state.paymentData.id,
            checkoutDate: new Date(),
            status: "pending",
            totalPayment: this.state.paymentData.price,
            paymentMethod: this.state.method
        })
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Transaksi Berhasil! Silahkan Melakukan Pembayaran Sesuai dengan Jumlah dan Upload Bukti Bayar", "success")
                this.setState({ modalPaymentOpen: false })
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Transaksi Gagal! Silahkan Ulang Beberapa Saat Lagi", "error")
            })
    }

    renderPlansList = () => {
        const { planList } = this.state
        return planList.map((val, idx) => {
            const { planName, planDesc, price } = val
            if (planName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <div className="d-flex flex-column justify-content-center mt-4 align-items-center planlist" key={val.id.toString()}>
                        <h5>{planName}</h5>
                        <p>{planDesc}</p>
                        {/* <div className="d-flex"> */}
                        <h6 className="mt-3">{priceFormatter(price)}</h6>
                        <Buttons type="outlined" onClick={(_) => this.paymentBtnHandler(idx)}>Beli</Buttons>
                        {/* </div> */}
                    </div>
                )
            } else {
                return null
            }
        })
    }

    renderViewPage = () => {
        const { username, fullname, noHp, email, profilePicture, membership } = this.state.userData
        const { activePage } = this.state
        if (activePage === "profile") {
            return (
                <>
                    <h6 className="header-profile">Ubah Profil</h6>
                    <div className="d-flex flex-column align-items-center justify-content-center text-center mt-4">
                        {profilePicture == null ? <FontAwesomeIcon icon={faUser} style={{ fontSize: 50 }} /> :
                            <img src={profilePicture} alt="" className="profil-img" />
                        }
                        {membership === "premium" ? (
                            <h6 className="mt-2">Pengguna Premium</h6>
                        ) : null}
                        <Buttons type="outlined" className="mt-4" onClick={this.editBtnProfileHandler}>Ubah Sekarang</Buttons>
                    </div>
                    <div className="row">
                        <div className="col-8 mt-5">
                            <table className="usertabel">
                                <tbody>
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
                                </tbody>
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
                                Ubah Password
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Password Lama</label>
                                <input type={this.state.editPasswordForm.showPassword ? "text" : "password"} className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.oldPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "oldPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Password Baru</label>
                                <input type={this.state.editPasswordForm.showPassword ? "text" : "password"} className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.newPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "newPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Konfirmasi Ulang Password</label>
                                <input type={this.state.editPasswordForm.showPassword ? "text" : "password"} className="form-control-lg w-50"
                                    value={this.state.editPasswordForm.confirmPassword}
                                    onChange={(e) =>
                                        this.inputHandler(e, "confirmPassword", "editPasswordForm")
                                    }
                                />
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <input
                                    type="checkbox"
                                    className="mr-3"
                                    name="showPassword"
                                    onChange={(e) => this.checkboxHandler(e, "editPasswordForm")}
                                />{" "}
                                Tampilkan Password
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <Link to="/lupa-password" style={{ textDecoration: "none" }}>
                                    <h6 onClick={this.sigoutButtonHandler}>Lupa Password?</h6></Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalEditPassword}>Kembali</Buttons>
                                <Link to="/login" style={{ textDecoration: "none" }}>
                                    <Buttons type="contained" onClick={this.updatePasswordHandler} className="ml-3">Simpan</Buttons>
                                </Link>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <Modal
                        toggle={this.toggleModalEdit}
                        isOpen={this.state.modalEditOpen}
                        className="edit-modal"
                    >
                        <ModalHeader toggle={this.toggleModalEdit}>
                            <caption>
                                Ubah Profil
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                                <label>Gambar Profil</label>
                                <input type="file" className="form-control-lg w-75"
                                    onChange={this.fileChangeHandler}
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Username</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.editUserForm.username} readOnly />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Nama Lengkap</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.editUserForm.fullname}
                                    onChange={(e) =>
                                        this.inputHandler(e, "fullname", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>No. Handphone</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.editUserForm.noHp}
                                    onChange={(e) =>
                                        this.inputHandler(e, "noHp", "editUserForm")
                                    }
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                                <label>Email</label>
                                <input type="text" className="form-control w-75 form-control-lg"
                                    value={this.state.editUserForm.email} readOnly />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalEdit}>Kembali</Buttons>
                                <Buttons type="contained" onClick={this.editUserHandler} className="ml-3">Simpan</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>
                </>
            )
        } else if (activePage === "subscription") {
            return (
                <>
                    <h6 className="header-profile">Paket Langganan</h6>
                    <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
                        <h5>Beli Paket Langganan Untuk Membaca Resep dan Tips Tanpa Batas!</h5>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Periode:</label>
                                <select className="form-control ml-4 w-75"
                                    onClick={() => this.getPlanList()}
                                    onChange={(e) => this.setState({ periode: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    <option value="tahun">Tahun</option>
                                    <option value="bulan">Bulan</option>
                                    <option value="minggu">Minggu</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center ml-3">
                                <label>Urutkan:</label>
                                <select className="form-control ml-3 w-50"
                                    onClick={() => this.getPlanList()}
                                    onChange={(e) => this.setState({ orderOption: e.target.value })}
                                >
                                    <option value="planName">Nama</option>
                                    <option value="price">Harga</option>
                                </select>
                                <select className="form-control ml-2 w-50"
                                    onClick={() => this.getPlanList()}
                                    onChange={(e) => this.setState({ sort: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Harga:</label>
                                <input type="number" placeholder="Harga Terendah" className="form-control w-50 ml-3"
                                    onClick={() => this.getPlanList()}
                                    onChange={(e) => this.setState({ minPrice: +e.target.value })}
                                />
                                <label className="mx-2">-</label>
                                <input type="number" placeholder="Harga Tertinggi" className="form-control w-50"
                                    onClick={() => this.getPlanList()}
                                    onChange={(e) => this.setState({ maxPrice: +e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            {this.renderPlansList()}
                        </div>
                        <Modal
                            toggle={this.togglModalPayment}
                            isOpen={this.state.modalPaymentOpen}
                            className="payment-modal"
                        >
                            <ModalHeader toggle={this.togglModalPayment}>
                                <caption>
                                    Pembayaran Transaksi
                                </caption>
                            </ModalHeader>
                            <ModalBody>
                                <form className="ml-2">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Paket Langganan</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control"
                                                value={this.state.paymentData.planName} readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Harga</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control"
                                                value={this.state.paymentData.price} readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row d-flex justify-content-start align-items-center">
                                        <label className="col-sm-4 col-form-label">Metode Pembayaran</label>
                                        <div className="col-sm-8" >
                                            <div className="form-check d-flex justify-content-start align-items-center">
                                                <input className="form-check-input" type="radio" name="payment" value="gopay"
                                                    onChange={(e) => this.radioButtonHandler(e)} />
                                                <label className="form-check-label">
                                                    <img src={GopayImg} alt="" className="payment-logo" />
                                                </label>
                                            </div>
                                            <div className="form-check d-flex justify-content-start align-items-center">
                                                <input className="form-check-input" type="radio" name="payment" value="ovo" onChange={(e) => this.radioButtonHandler(e)} />
                                                <label className="form-check-label" >
                                                    <img src={OVOImg} alt="" className="payment-logo" />
                                                </label>
                                            </div>
                                            <div className="form-check d-flex justify-content-start align-items-center">
                                                <input className="form-check-input" type="radio" name="payment" value="bca" onChange={(e) => this.radioButtonHandler(e)} />
                                                <label className="form-check-label" >
                                                    <img src={BCAImg} alt="" className="payment-logo" />
                                                </label>
                                            </div>
                                            <div className="form-check d-flex justify-content-start align-items-center">
                                                <input className="form-check-input" type="radio" name="payment" value="cimb" onChange={(e) => this.radioButtonHandler(e)} />
                                                <label className="form-check-label">
                                                    <img src={CIMBImg} alt="" className="payment-logo" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <div className="d-flex align-items-center justify-content-center mt-4">
                                    <Buttons type="outlined" onClick={this.togglModalPayment}>Kembali</Buttons>
                                    <Buttons type="contained" onClick={this.paymentHandler} className="ml-3">Bayar</Buttons>
                                </div>
                            </ModalFooter>
                        </Modal>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h6 className="header-profile">Riwayat Transaksi</h6>
                    <p>Belum bayar, gagal, berhasil, riwayat</p>
                </>
            )
        }
    }

    sigoutButtonHandler = () => {
        this.props.onLogout()
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
                                Paket Langganan
                                    </Buttons>
                            {/* <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "transaction" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "transaction" })}>
                                Riwayat Transaksi
                                    </Buttons> */}
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
        search: state.search,
    };
};

const mapDispatchToProps = {
    onLogout: logoutHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile) 