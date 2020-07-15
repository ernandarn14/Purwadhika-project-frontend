import React from 'react'
import './MyHistory.css'
import Buttons from '../../../../component/Button/Buttons'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import { connect } from 'react-redux'
import { priceFormatter } from '../../../../supports/helpers/PriceFormatter'
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from 'sweetalert'

class MyHistory extends React.Component {
    state = {
        selectedFile: null,
        activePage: "pending",
        pendingStatus: [],
        waitingStatus: [],
        successStatus: [],
        failedStatus: [],
        paymentForm: [],
        modalPayment: false,
        reUploadForm: [],
        modalReupload: false,
        transactionId: 0
    }

    payNowHandler = (idx) => {
        this.setState({
            paymentForm: {
                ...this.state.pendingStatus[idx],
            },
            modalPayment: true,
        });
    };

    toggleModalPayment = () => {
        this.setState({ modalPayment: !this.state.modalPayment });
    };

    reUploadHandler = (idx) => {
        this.setState({
            reUploadForm: {
                ...this.state.failedStatus[idx],
            },
            modalReupload: true,
            transactionId: this.state.failedStatus[idx].id
        });
        //console.log(this.state.failedStatus[idx])
    };

    toggleModalReUpload = () => {
        this.setState({ modalReupload: !this.state.modalReupload });
    };

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    getPendingTransaction = () => {
        Axios.get(`${API_URL}/transaksi/status/pending`, {
            params: {
                status: "pending",
                userId: this.props.user.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ pendingStatus: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getWaitingTransaction = () => {
        Axios.get(`${API_URL}/transaksi/status`, {
            params: {
                status: "pending",
                userId: this.props.user.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ waitingStatus: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getSuccessTransaction = () => {
        Axios.get(`${API_URL}/transaksi/status`, {
            params: {
                status: "sukses",
                userId: this.props.user.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ successStatus: res.data })
                //console.log(this.state.successStatus)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getFailedTransaction = () => {
        Axios.get(`${API_URL}/transaksi/status`, {
            params: {
                status: "gagal",
                userId: this.props.user.id
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ failedStatus: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getPendingTransaction()
        this.getWaitingTransaction()
        this.getSuccessTransaction()
        this.getFailedTransaction()
    }

    renderPendingStatus = () => {
        const { pendingStatus } = this.state
        return pendingStatus.map((val, idx) => {
            const { plans, checkoutDate, totalPayment, paymentMethod } = val
            const { planName } = plans
            const date = new Date(checkoutDate)
            return (
                <div className="d-flex flex-column justify-content-start mt-4 align-items-center planlist" key={val.id.toString()}>
                    <h5 className="header-plan">{planName}</h5>
                    <h6>{priceFormatter(totalPayment)}</h6>
                    <div className="d-flex flex-column mt-2">
                        <p>Waktu Transaksi: {date.toLocaleString('en-GB')}</p>
                        <p>Metode Pembayaran: {paymentMethod}</p>
                    </div>
                    <Buttons type="contained" className="mt-3" onClick={(_) => this.payNowHandler(idx)}>Bayar Sekarang</Buttons>
                </div>
            )

        })
    }

    renderWaitingStatus = () => {
        const { waitingStatus } = this.state
        return waitingStatus.map((val, idx) => {
            const { plans, checkoutDate, totalPayment, paymentMethod, paymentDate } = val
            const { planName } = plans
            const datePayment = new Date(paymentDate)
            const date = new Date(checkoutDate)
            return (
                <div className="d-flex flex-column justify-content-start mt-4 align-items-center planlist" key={val.id.toString()}>
                    <h5 className="header-plan">{planName}</h5>
                    <h6>{priceFormatter(totalPayment)}</h6>
                    <div className="d-flex flex-column mt-2">
                        <p>Waktu Transaksi: {date.toLocaleString('en-GB')}</p>
                        {paymentDate != null ? (
                             <p>Waktu Pembayaran: {datePayment.toLocaleString('en-GB')}</p>
                        ) : null}
                        <p>Metode Pembayaran: {paymentMethod}</p>
                    </div>
                </div>
            )

        })
    }

    renderSuccessStatus = () => {
        const { successStatus } = this.state
        return successStatus.map((val, idx) => {
            const { plans, checkoutDate, totalPayment, paymentMethod, confirmDate, paymentDate } = val
            const { planName } = plans
            const datePayment = new Date(paymentDate)
            const date = new Date(checkoutDate)
            const dateConfirm = new Date(confirmDate)
            return (
                <div className="d-flex flex-column justify-content-start mt-4 align-items-center planlist" key={val.id.toString()}>
                    <h5 className="header-plan">{planName}</h5>
                    <h6>{priceFormatter(totalPayment)}</h6>
                    <div className="d-flex flex-column mt-2">
                        <p>Tanggal Transaksi: {date.toLocaleString('en-GB')}</p>
                        <p>Tanggal Pembayaran: {datePayment.toLocaleString('en-GB')}</p>
                        <p>Tanggal Konfrimasi: {dateConfirm.toLocaleString('en-GB')}</p>
                        <p>Metode Pembayaran: {paymentMethod}</p>
                    </div>
                </div>
            )

        })
    }

    renderFailedStatus = () => {
        const { failedStatus } = this.state
        return failedStatus.map((val, idx) => {
            const { plans, checkoutDate, totalPayment, paymentMethod, confirmDate, failedNote } = val
            const { planName } = plans
            return (
                <div className="d-flex flex-column justify-content-start mt-4 align-items-center planlist" key={val.id.toString()}>
                    <h5 className="header-plan">{planName}</h5>
                    <h6>{priceFormatter(totalPayment)}</h6>
                    <div className="d-flex flex-column mt-2">
                        <p>Tanggal Transaksi: {checkoutDate.slice(0, 10)}</p>
                        <p>Tanggal Konfirmasi: {confirmDate.slice(0, 10)}</p>
                        <p>Metode Pembayaran: {paymentMethod}</p>
                        <p>Catatan: {failedNote}</p>
                    </div>
                    <Buttons type="contained" className="mt-3" onClick={(_) => this.reUploadHandler(idx)}>Unggah Bukti Bayar</Buttons>
                </div>
            )

        })
    }

    uploadPaymentReceipt = () => {
        let formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.paymentForm))

        Axios.put(`${API_URL}/transaksi/upload/${this.state.paymentForm.id}`, formData)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Pembayaran Berhasil", "success")
                this.setState({ modalPayment: false, selectedFile: null })
                this.getPendingTransaction()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Pembayaran Gagal", "error")
            })
        console.log(JSON.stringify(this.state.paymentForm))
    }

    reUploadPaymentReceipt = () => {
        // alert('masuk')
        let formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("userData", JSON.stringify(this.state.reUploadForm))

        Axios.put(`${API_URL}/transaksi/upload/${this.state.reUploadForm.id}`, formData)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Pembayaran Berhasil", "success")
                this.setState({ modalReupload: false, selectedFile: null })
                this.getFailedTransaction()
                this.getPendingTransaction()
                this.getWaitingTransaction()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Pembayaran Gagal", "error")
            })
        console.log(JSON.stringify(this.state.reUploadForm))
    }

    renderViewPage = () => {
        const { activePage } = this.state
        if (activePage === "pending") {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h6 className="">Transaksi Belum Dibayar</h6>
                    {this.renderPendingStatus()}
                    <Modal
                        toggle={this.toggleModalPayment}
                        isOpen={this.state.modalPayment}
                        className="payment-modal"
                    >
                        <ModalHeader toggle={this.toggleModalPayment}>
                            <caption>
                                Pembayaran Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <h6>Berikut Info Pembayaran Anda: </h6>
                            <form className="ml-2 mt-3">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Total Bayar</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control"
                                            value={priceFormatter(this.state.paymentForm.totalPayment)} readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-group row d-flex justify-content-start align-items-center">
                                    <label className="col-sm-4 col-form-label">Metode Pembayaran</label>
                                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                                        <input type="text" className="form-control"
                                            value={this.state.paymentForm.paymentMethod} readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-group row d-flex justify-content-start align-items-center">
                                    <label className="col-sm-4 col-form-label">Unggah Bukti Pembayaran</label>
                                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                                        <input type="file" className="" onChange={this.fileChangeHandler}
                                        //value={this.state.pendingStatus.paymentMethod} readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalPayment}>Kembali</Buttons>
                                <Buttons type="contained" onClick={this.uploadPaymentReceipt} className="ml-3">Bayar</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        } else if (activePage === "waiting") {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h6 className="">Transaksi Menunggu Konfirmasi</h6>
                    {this.renderWaitingStatus()}
                </div>
            )
        }
        else if (activePage === "success") {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h6 className="">Transaksi Selesai</h6>
                    {this.renderSuccessStatus()}
                </div>
            )
        } else {
            return (
                <>
                    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                        <h6 className="">Transaksi DIbatalkan</h6>
                        {this.renderFailedStatus()}
                    </div>
                    <Modal
                        toggle={this.toggleModalReUpload}
                        isOpen={this.state.modalReupload}
                        className="repayment-modal"
                    >
                        <ModalHeader toggle={this.toggleModalReUpload}>
                            <caption>
                                Unggah Ulang Pembayaran Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <form className="ml-2 mt-3">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Total Bayar</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control"
                                            value={priceFormatter(this.state.reUploadForm.totalPayment)} readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-group row d-flex justify-content-start align-items-center">
                                    <label className="col-sm-4 col-form-label">Unggah Bukti Pembayaran</label>
                                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                                        <input type="file" className="" onChange={this.fileChangeHandler}
                                        />
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalReUpload}>Kembali</Buttons>
                                <Buttons type="contained" onClick={this.reUploadPaymentReceipt} className="ml-3">Unggah</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>
                </>
            )
        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Riwayat Transaksi</h3>
                        <div className="d-flex mt-3 justify-content-center">
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "pending" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "pending" })}>
                                Belum Bayar
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "waiting" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "waiting" })}>
                                Menunggu Konfirmasi
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "success" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "success" })}>
                                Selesai
                                    </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "failed" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "failed" })}>
                                Dibatalkan
                            </Buttons>
                        </div>
                        <div className="mt-4 justify-content-center">
                            {this.renderViewPage()}
                        </div>
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

export default connect(mapStateToProps)(MyHistory) 