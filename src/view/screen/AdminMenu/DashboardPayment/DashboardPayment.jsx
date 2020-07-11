import React from 'react'
import './DashboardPayment.css'
import Axios from 'axios'
import { API_URL } from '../../../../constants/API'
import Buttons from '../../../../component/Button/Buttons'
import { priceFormatter } from '../../../../supports/helpers/PriceFormatter'
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from 'sweetalert'


class DashboardPayment extends React.Component {
    state = {
        activePage: "pending",
        transactionPendingList: [],
        activeData: [],
        activeImage: [],
        activeFailedData: {
            failedNote: ""
        },
        modalPaymentReciept: false,
        transactionSuccess: [],
        transactionFailed: [],
        modalFailed: false
    }

    getAllPendingData = () => {
        Axios.get(`${API_URL}/transaksi/semua`, {
            params: {
                status: "pending"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ transactionPendingList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getAllSuccessData = () => {
        Axios.get(`${API_URL}/transaksi/semua`, {
            params: {
                status: "sukses"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ transactionSuccess: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getAllFailedData = () => {
        Axios.get(`${API_URL}/transaksi/semua`, {
            params: {
                status: "gagal"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ transactionFailed: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    toggleModalPaymentReciept = () => {
        this.setState({ modalPaymentReciept: !this.state.modalPaymentReciept });
    };

    toggleModalFailed = () => {
        this.setState({ modalFailed: !this.state.modalFailed });
    };

    paymentRecieptHandler = (idx) => {
        this.setState({
            activeImage: {
                ...this.state.transactionPendingList[idx], ...this.state.transactionSuccess[idx]
            },
            modalPaymentReciept: true,
        });
        // console.log(this.state.activeImage)
        // console.log('masuk')
    };

    failedNoteHandler = (idx) => {
        this.setState({
            activeFailedData: {
                ...this.state.transactionFailed[idx],
            },
            modalFailed: true,
        });
        console.log(this.state.activeFailedData)
    };

    componentDidMount() {
        this.getAllPendingData()
        this.getAllSuccessData()
        this.getAllFailedData()
    }

    collapseHandler = (idx) => {
        if (this.state.activeData.includes(idx)) {
            this.setState({
                activeData: [
                    ...this.state.activeData.filter((item) => item !== idx),
                ],
            });
        } else {
            this.setState({
                activeData: [...this.state.activeData, idx],
            });
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

    confirmPayment = (id) => {
        Axios.put(`${API_URL}/transaksi/konfirmasi/${id}`)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Konfirmasi Berhasil", "success")
                this.getAllPendingData()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Konfirmasi Gagal", "error")
            })
    }

    rejectPayment = id => {
        // const { transactionFailed } = this.state
        // const { failedNote } = this.state.activeFailedData
        // let newData = { ...transactionFailed }
        Axios.put(`${API_URL}/transaksi/tolak/${id}`, this.state.activeFailedData)
        .then(res => {
            console.log(res.data)
            swal("Sukses", "Penolakan Transaksi Berhasil", "success")
            this.getAllFailedData()
        })
        .catch(err => {
            console.log(err)
            swal("Gagal", "Penolakan Transaksi Gagal", "error")
        })
    }

    renderPendingData = () => {
        const { transactionPendingList } = this.state
        return transactionPendingList.map((val, idx) => {
            const { user, plans, paymentDate, paymentMethod, paymentReciept, totalPayment, status } = val
            const { username } = user
            const { planName } = plans
            return (
                <>
                    <tr onClick={(_) => { this.collapseHandler(idx) }}>
                        <td> {username} </td>
                        <td> {planName} </td>
                        <td>{priceFormatter(totalPayment)}</td>
                        <td>{status}</td>
                    </tr>
                    <tr
                        className={`collapse-item ${
                            this.state.activeData.includes(idx) ? "active" : null
                            }`}
                    >
                        <td className="" colSpan={4}>
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={paymentReciept} alt="" onClick={(_) => this.paymentRecieptHandler(idx)} />
                                <div className="d-flex flex-column ml-4 justify-content-start text-left">
                                    <h6>Tanggal Pembayaran: {paymentDate.slice(0, 10)}</h6>
                                    <h6>Metode Pembayaran: {paymentMethod}</h6>
                                </div>
                                <div className="d-flex align-items-center ml-5">
                                    <Buttons type="outlined" onClick={() => this.confirmPayment(val.id)}>Konfirmasi</Buttons>
                                    <Buttons type="contained" className="ml-3" onClick={(_) => this.failedNoteHandler(idx)}>Tolak</Buttons>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <Modal
                        toggle={this.toggleModalPaymentReciept}
                        isOpen={this.state.modalPaymentReciept}
                        className="paymentReciept-modal"
                    >
                        <ModalHeader toggle={this.toggleModalPaymentReciept}>
                            <caption>
                                Bukti Pembayaran Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <img src={this.state.activeImage.paymentReciept} alt="" style={{ width: "350px", height: "350px", objectFit: "contain" }} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalPaymentReciept}>Kembali</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <Modal
                        toggle={this.toggleModalFailed}
                        isOpen={this.state.modalFailed}
                        className="paymentReciept-modal"
                    >
                        <ModalHeader toggle={this.modalFailed}>
                            <caption>
                                Catatan Penolakan Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <input type="text" className="form-control-lg w-50"
                                    value={this.state.activeFailedData.failedNote}
                                    onChange={(e) =>
                                        this.inputHandler(e, "failedNote", "activeFailedData")
                                    }
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                        <div className="d-flex align-items-center ml-5">
                            <Buttons type="outlined" onClick={this.toggleModalFailed}>Kembali</Buttons>
                            <Buttons type="contained" className="ml-3" onClick={() => this.rejectPayment(this.state.activeFailedData.id)}>Kirim</Buttons>
                        </div>
                        </ModalFooter>
                    </Modal>
                </>
            )
        })
    }

    renderSuccessData = () => {
        const { transactionSuccess } = this.state
        return transactionSuccess.map((val, idx) => {
            const { user, plans, paymentDate, paymentMethod, paymentReciept, totalPayment, status, confirmDate } = val
            const { username } = user
            const { planName } = plans
            return (
                <>
                    <tr onClick={(_) => { this.collapseHandler(idx) }}>
                        <td> {username} </td>
                        <td> {planName} </td>
                        <td>{priceFormatter(totalPayment)}</td>
                        <td>{status}</td>
                    </tr>
                    <tr
                        className={`collapse-item ${
                            this.state.activeData.includes(idx) ? "active" : null
                            }`}
                    >
                        <td className="" colSpan={4}>
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={paymentReciept} alt="" onClick={(_) => this.paymentRecieptHandler(idx)} />
                                <div className="d-flex flex-column ml-4 justify-content-start text-left">
                                    <h6>Tanggal Pembayaran: {paymentDate.slice(0, 10)}</h6>
                                    <h6>Tanggal Konfirmasi: {confirmDate.slice(0, 10)}</h6>
                                    <h6>Metode Pembayaran: {paymentMethod}</h6>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <Modal
                        toggle={this.toggleModalPaymentReciept}
                        isOpen={this.state.modalPaymentReciept}
                        className="paymentReciept-modal"
                    >
                        <ModalHeader toggle={this.toggleModalPaymentReciept}>
                            <caption>
                                Bukti Pembayaran Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <img src={this.state.activeImage.paymentReciept} alt="" style={{ width: "350px", height: "350px", objectFit: "contain" }} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalPaymentReciept}>Kembali</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>
                </>
            )
        })
    }

    renderFailedData = () => {
        const { transactionFailed } = this.state
        return transactionFailed.map((val, idx) => {
            const { user, plans, paymentDate, paymentMethod, paymentReciept, totalPayment, status, confirmDate } = val
            const { username } = user
            const { planName } = plans
            return (
                <>
                    <tr onClick={(_) => { this.collapseHandler(idx) }}>
                        <td> {username} </td>
                        <td> {planName} </td>
                        <td>{priceFormatter(totalPayment)}</td>
                        <td>{status}</td>
                    </tr>
                    <tr
                        className={`collapse-item ${
                            this.state.activeData.includes(idx) ? "active" : null
                            }`}
                    >
                        <td className="" colSpan={4}>
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={paymentReciept} alt="" onClick={(_) => this.paymentRecieptHandler(idx)} />
                                <div className="d-flex flex-column ml-4 justify-content-start text-left">
                                    <h6>Tanggal Pembayaran: {paymentDate.slice(0, 10)}</h6>
                                    <h6>Tanggal Konfirmasi: {confirmDate.slice(0, 10)}</h6>
                                    <h6>Metode Pembayaran: {paymentMethod}</h6>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <Modal
                        toggle={this.toggleModalPaymentReciept}
                        isOpen={this.state.modalPaymentReciept}
                        className="paymentReciept-modal"
                    >
                        <ModalHeader toggle={this.toggleModalPaymentReciept}>
                            <caption>
                                Bukti Pembayaran Transaksi
                                </caption>
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <img src={this.state.activeImage.paymentReciept} alt="" style={{ width: "350px", height: "350px", objectFit: "contain" }} />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <Buttons type="outlined" onClick={this.toggleModalPaymentReciept}>Kembali</Buttons>
                            </div>
                        </ModalFooter>
                    </Modal>
                </>
            )
        })
    }


    renderViewPage = () => {
        const { activePage } = this.state
        if (activePage === "pending") {
            return this.renderPendingData()
        } else if (activePage === "success") {
            return this.renderSuccessData()
        } else {
            return this.renderFailedData()
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Konfirmasi Pembelian</h3>
                        <div className="d-flex mt-3 justify-content-start">
                            <Buttons type="textual" className={`mt-3 ${
                                this.state.activePage === "pending" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "pending" })}>
                                Pending
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "success" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "success" })}>
                                Sukses
                            </Buttons>
                            <Buttons type="textual" className={`mt-3 ml-5 ${
                                this.state.activePage === "failed" ? "active" : null
                                }`} onClick={() => this.setState({ activePage: "failed" })}>
                                Gagal
                            </Buttons>
                        </div>
                        <table className="payment-table mt-4 table table-bordered">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Nama Langganan</th>
                                    <th>Total Bayar</th>
                                    <th>Status</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderViewPage()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardPayment;