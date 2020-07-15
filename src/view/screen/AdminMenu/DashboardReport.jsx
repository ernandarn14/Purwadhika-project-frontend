import React from 'react'
import {Bar} from 'react-chartjs-2';

class DashboardReport extends React.Component {
    state = {
        data: {
            labels: ['January', 'February', 'March',
                'April', 'May'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [65, 59, 80, 81, 56]
                }
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Laporan</h3>
                        {/* <Line data={this.state.data} /> */}
                        <Bar
                            data={this.state.data}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Average Rainfall per month',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardReport;