import React from 'react';
import { Link } from "react-router-dom";
import Button from '../../../component/Button/Button';

class DashboardRecipe extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Dashboard Resep</h3>
                        <Link to="">
                            <Button type="contained">
                                Tambah Artikel Tips dan Trik
                            </Button>
                        </Link>
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Judul Resep</th>
                                    <th>Kategori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardRecipe