import React from "react"
import "./DashboardProduk.css"
import Axios from "axios"
import { API_URL } from "../../../../constants/API"
import Button from "../../../../component/Button/Buttons";
import swal from "sweetalert";
import { priceFormatter } from "../../../../supports/helpers/PriceFormatter"
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";

class DashboardProduk extends React.Component {
    state = {
        productList: [],
        addForm: {
            planName: "",
            price: 0,
            planDuration: 0,
            planPeriod: "bulan",
            planDesc: "",
            id: 0
        },
        editForm: {
            planName: "",
            price: 0,
            planDuration: 0,
            planPeriod: "bulan",
            planDesc: "",
            id: 0
        },
        modalOpen: false,
        periode: "semua",
        sort: "asc",
        maxPrice: 99999999,
        minPrice: 0,
        orderOption: "planName"
    }

    getProductData = () => {
        if (this.state.periode === "semua") {
            Axios.get(`${API_URL}/langganan/admin/${this.state.sort}/${this.state.orderOption}/${this.state.minPrice}/${this.state.maxPrice}`)
                .then(res => {
                    this.setState({ productList: res.data })
                    //console.log(this.state.orderOption)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Axios.get(`${API_URL}/langganan/admin/periode/${this.state.sort}/${this.state.orderOption}/${this.state.minPrice}/${this.state.maxPrice}?planPeriod=${this.state.periode}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ productList: res.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    componentDidMount() {
        this.getProductData()
    }

    renderProductData = () => {
        const { productList } = this.state
        return productList.map((val, idx) => {
            const { planName, price, planDuration, planPeriod } = val
            if (planName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    <tr key={val.id.toString()}>
                        <td>{planName}</td>
                        <td>{priceFormatter(price)}</td>
                        <td>{planDuration}</td>
                        <td>{planPeriod}</td>
                        <td>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-edit" style={{ fontSize: "22px" }} onClick={(_) => this.editBtnHandler(idx)}></i>
                                <i className="material-icons ml-3" onClick={() => this.deleteDataHandler(val.id)}>&#xe872;</i>
                            </div>
                        </td>
                    </tr>
                )
            } else {
                return null
            }
        })
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

    editBtnHandler = (idx) => {
        this.setState({
            editForm: {
                ...this.state.productList[idx],
            },
            modalOpen: true,
        });
    };

    editProductHandler = () => {
        Axios.put(`${API_URL}/langganan/ubah`, this.state.editForm)
            .then((res) => {
                swal("Sukses", "Data Produk Berhasil Diubah!", "success")
                this.setState({ modalOpen: false });
                this.getProductData();
            })
            .catch((err) => {
                swal("Gagal", "Data Produk Gagal Diubah!", "error")
                console.log(err);
            });
    };

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    };

    addProductHandler = () => {
        Axios.post(`${API_URL}/langganan/tambah`, this.state.addForm)
            .then(res => {
                console.log(res.data)
                swal("Sukses", "Data Produk Berhasil Ditambah!", "success")
                this.setState({
                    addForm: {
                        planName: "",
                        price: 0,
                        planDuration: 0,
                        planPeriod: "bulan",
                        planDesc: "",
                        id: 0
                    }
                })
                this.getProductData()
            })
            .catch(err => {
                console.log(err)
                swal("Gagal", "Data Produk Gagal Ditambah!", "error")
            })
    }

    deleteDataHandler = (id) => {
        swal({
            title: "Anda yakin untuk menghapus data?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(`${API_URL}/langganan/hapus/${id}`)
                        .then(res => {
                            console.log(res.data)
                            this.getProductData()
                        })
                        .catch(err => {
                            console.log(err)
                            alert('Data Gagal Dihapus!')
                        })
                    swal("Data Berhasil Dihapus!", {
                        icon: "success",
                    });
                }
            });
    }


    render() {
        const { planName, price, planDuration, planPeriod, planDesc } = this.state.addForm
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Produk Langganan</h3>
                        <div className="d-flex mt-5 justify-content-around">
                            <div className="d-flex align-items-center">
                                <label>Periode:</label>
                                <select className="form-control ml-4 w-75"
                                    onClick={() => this.getProductData()}
                                    onChange={(e) => this.setState({ periode: e.target.value })}
                                >
                                    <option value="semua">Semua</option>
                                    <option value="tahun">Tahun</option>
                                    <option value="bulan">Bulan</option>
                                    <option value="minggu">Minggu</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Harga:</label>
                                <input type="number" placeholder="Harga Terendah" className="form-control w-50 ml-3"
                                    onClick={() => this.getProductData()}
                                    onChange={(e) => this.setState({ minPrice: +e.target.value })}
                                />
                                <label className="mx-2">-</label>
                                <input type="number" placeholder="Harga Tertinggi" className="form-control w-50"
                                    onClick={() => this.getProductData()}
                                    onChange={(e) => this.setState({ maxPrice: +e.target.value})}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <label>Urutkan:</label>
                                <select className="form-control ml-3 w-50"
                                    onClick={() => this.getProductData()}
                                    onChange={(e) => this.setState({ orderOption: e.target.value })}
                                >
                                    <option value="planName">Nama</option>
                                    <option value="price">Harga</option>
                                </select>
                                <select className="form-control ml-2 w-50"
                                    onClick={() => this.getProductData()}
                                    onChange={(e) => this.setState({ sort: e.target.value })}
                                >
                                    <option value="asc">A - Z</option>
                                    <option value="desc">Z - A</option>
                                </select>
                            </div>
                        </div>
                        <table className="tips-table table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th>Nama Langganan</th>
                                    <th>Harga</th>
                                    <th>Durasi</th>
                                    <th>Periode Durasi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProductData()}
                            </tbody>
                        </table>
                        <div className="dashboard-form-container p-4 mt-5">
                            <caption className="mb-4 mt-2">
                                <h4>Tambah Produk</h4>
                            </caption>
                            <div className="row">
                                <div className="col-6">
                                    <label>Nama Produk:</label>
                                    <input type="text" className="form-control"
                                        value={planName}
                                        placeholder="Nama Produk"
                                        onChange={(e) =>
                                            this.inputHandler(e, "planName", "addForm")
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Harga Produk: Rp.</label>
                                    <input type="number" className="form-control"
                                        value={price} placeholder="0"
                                        onChange={(e) => this.inputHandler(e, "price", "addForm")}
                                    />
                                </div>
                                <div className="col-6 mt-3">
                                    <label>Durasi Paket: </label>
                                    <input type="number" className="form-control"
                                        value={planDuration} placeholder="0"
                                        onChange={(e) => this.inputHandler(e, "planDuration", "addForm")}
                                    />
                                </div>
                                <div className="col-6 mt-3">
                                    <label>Periode Durasi:</label>
                                    <select
                                        value={planPeriod}
                                        className="custom-text-input pl-1 form-control"
                                        onChange={(e) => this.inputHandler(e, "planPeriod", "addForm")}
                                    >
                                        <option value="tahun">Tahun</option>
                                        <option value="bulan">Bulan</option>
                                        <option value="minggu">Minggu</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Deskripsi Produk:</label>
                                    <textarea className="form-control w-100" placeholder="Deskripsi Produk"
                                        value={planDesc}
                                        onChange={(e) =>
                                            this.inputHandler(e, "planDesc", "addForm")
                                        }
                                    >
                                    </textarea>
                                </div>
                                <div className="col-4 mt-3">
                                    <Button type="contained" onClick={this.addProductHandler}>
                                        Simpan
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Modal
                            toggle={this.toggleModal}
                            isOpen={this.state.modalOpen}
                            className="edit-modal">
                            <ModalHeader toggle={this.toggleModal}>
                                <caption>
                                    <h3>Ubah produk</h3>
                                </caption>
                            </ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex align-items-center">
                                            <label>Nama Produk</label>
                                            <input type="text" className="form-control ml-3"
                                                value={this.state.editForm.planName} placeholder="Nama Produk"
                                                onChange={(e) => this.inputHandler(e, "planName", "editForm")}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <label>Harga Produk</label>
                                            <input type="number" className="form-control ml-3"
                                                value={this.state.editForm.price} placeholder="0"
                                                onChange={(e) => this.inputHandler(e, "price", "editForm")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-center mt-3">
                                            <label>Durasi Produk</label>
                                            <input type="number" className="form-control ml-3"
                                                value={this.state.editForm.planDuration} placeholder="0"
                                                onChange={(e) => this.inputHandler(e, "planDuration", "editForm")}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <label>Periode Durasi</label>
                                            <select
                                                value={this.state.editForm.planPeriod}
                                                className="custom-text-input pl-1 form-control ml-3"
                                                onChange={(e) => this.inputHandler(e, "planPeriod", "addForm")}
                                            >
                                                <option value="tahun">Tahun</option>
                                                <option value="bulan">Bulan</option>
                                                <option value="minggu">Minggu</option>
                                                <option value="hari">Hari</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Deskripsi</label>
                                        <textarea className="form-control w-100" placeholder="Deskripsi Produk"
                                            value={this.state.editForm.planDesc}
                                            onChange={(e) =>
                                                this.inputHandler(e, "planDesc", "editForm")
                                            }
                                        >
                                        </textarea>
                                    </div>
                                    <div className="col-5 mt-3 offset-1">
                                        <Button
                                            className="w-100"
                                            onClick={this.toggleModal}
                                            type="outlined"
                                        >
                                            Kembali
                </Button>
                                    </div>
                                    <div className="col-5 mt-3">
                                        <Button
                                            className="w-100"
                                            onClick={this.editProductHandler}
                                            type="contained"
                                        >
                                            Simpan
                </Button>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
    };
};

export default connect(mapStateToProps)(DashboardProduk) 