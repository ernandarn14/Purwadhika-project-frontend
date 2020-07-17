import React from "react"
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import { API_URL } from '../../../../constants/API';
import Buttons from '../../../../component/Button/Buttons';
import { Link } from "react-router-dom";


class PlanReport extends React.Component {
    state = {
        data: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        },
        bestPlans: []
    }

    getBestSellerPlans = () => {
        Axios.get(`${API_URL}/transaksi/terlaris`)
            .then(res => {
                console.log(res.data)
                this.setState({ bestPlans: res.data })
                res.data.map((val) => {
                    this.setState({
                        data: {
                            labels: [...this.state.data.labels, val.plans.planName],
                            datasets: [
                                {
                                    label: 'Terjual',
                                    backgroundColor: `#ac7339`,
                                    borderColor: '#86592d',
                                    borderWidth: 4,
                                    data: [...this.state.data.datasets[0].data, val.total]
                                }
                            ]
                        }
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    renderBarPlans = () => {
        return (
            <Bar
                data={this.state.data}
                options={{
                    title: {
                        display: true,
                        text: 'Paket Langganan Paling Laris',
                        fontSize: 30
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        )
    }

    componentDidMount() {
        this.getBestSellerPlans()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Laporan Langganan</h3>
                        <div className="d-flex mt-3 justify-content-start">
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan-resep">
                                <Buttons type="textual" className="mt-3">
                                    Resep
                            </Buttons>
                            </Link>
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan-langganan">
                                <Buttons type="textual" className="mt-3 mx-5">
                                    Langganan
                            </Buttons>
                            </Link>
                            <Link style={{ color: "inherit", textDecoration: "none" }}
                                to="/admin/laporan">
                                <Buttons type="textual" className="mt-3">
                                    Pengguna
                            </Buttons>
                            </Link>
                        </div>
                        <center>
                            <div className="mt-5 w-75">
                                {this.renderBarPlans()}
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }

}

export default PlanReport