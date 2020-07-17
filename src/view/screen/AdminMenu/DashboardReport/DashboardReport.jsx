import React from 'react'
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import { API_URL } from '../../../../constants/API';
import Buttons from '../../../../component/Button/Buttons';
import { Link } from 'react-router-dom';

class DashboardReport extends React.Component {
    state = {
        data: {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        },
        premiumUsers: [],
        // membershipList: []
    }

    getPremiumuser = () => {
        Axios.get(`${API_URL}/pengguna/premium`)
            .then(res => {
                console.log(res.data)
                this.setState({ premiumUsers: res.data })
                res.data.map((val) => {
                    this.setState({
                        data: {
                            labels: [...this.state.data.labels, val.membership],
                            datasets: [
                                {
                                    label: 'Total',
                                    backgroundColor: `#ac7339`,
                                    borderColor: '#86592d',
                                    borderWidth: 2,
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

    // getMembershipList = () => {
    //     Axios.get(`${API_URL}/pengguna/membership`)
    //     .then(res => {
    //         console.log(res.data)
    //         this.setState({membershipList: res.data})
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // }

    renderBarMembership = () => {
        return (
            <Bar
                data={this.state.data}
                options={{
                    title: {
                        display: true,
                        text: 'Total Keanggotaan Pengguna',
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
        this.getPremiumuser()
        // this.getMembershipList()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Laporan Pengguna</h3>
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
                                {this.renderBarMembership()}
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardReport;