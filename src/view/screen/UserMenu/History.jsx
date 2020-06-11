import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import Buttons from '../../../component/Button/Buttons'
import { connect } from 'react-redux';

class History extends React.Component {
    state = {
        historyList: [],
        transactionDetailsList: [],
        modalOpen: false,
    };


    getHistoryList = () => {
        Axios.get(`${API_URL}/transaksi`, {
            params: {
                userId: this.props.user.id,
                _embed: "detailTransaksi",
                status: "sukses",
            },
        })
            .then((res) => {
                this.setState({ historyList: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getTransactionDetails = (transactionId) => {
        Axios.get(`${API_URL}/detailTransaksi`, {
            params: {
                transactionId,
                _expand: "produk",
            },
        })
            .then((res) => {
                this.setState({ transactionDetailsList: res.data, modalOpen: true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    renderTransaction = () => {
        const { historyList } = this.state
        return historyList.map((val) => {
            const date = new Date(val.tanggalKonfirmasi);
            return (
                <tr>
                    <td>
                        {" "}
                        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}{" "}
                    </td>
                    <td> {val.totalBayar} </td>
                    <td>
                        {" "}
                        <Buttons onClick={() => this.getTransactionDetails(val.id)}>
                            View Details
                </Buttons>{" "}
                    </td>
                </tr>
            );
        });
    };

    renderTransactionDetails = () => {
        const { transactionDetailsList } = this.state
        return transactionDetailsList.map((val) => {
            const { produk, quantity, harga } = val;
            const { gambar, kategori, namaProduk, keterangan } = produk;

            return (
                <div className="d-flex justify-content-around align-items-center">
                    <div className="d-flex">
                        <img src={gambar} alt="" />
                        <div className="d-flex flex-column ml-4 justify-content-center">
                            <h5>
                                {namaProduk} ({quantity})
                  </h5>
                            <h6 className="mt-2">
                                Category:
                    <span style={{ fontWeight: "normal" }}> {kategori}</span>
                            </h6>
                            <h6>
                                Price:
                    <span style={{ fontWeight: "normal" }}>
                                    {" "}
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(harga)}
                                </span>
                            </h6>
                            <h6>
                                Description:
                    <span style={{ fontWeight: "normal" }}> {keterangan}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            );
        });
    };

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    };

    componentDidMount() {
        this.getHistoryList();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Riwayat Pembelian</h3>
                        <table className="table table-bordered  mt-4">
                            <thead>
                                <tr>
                                    <th>Judul Resep</th>
                                    <th>Kategori</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransaction()}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(History) 