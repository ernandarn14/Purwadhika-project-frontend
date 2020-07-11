import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div className="container text-center py-4">
                <div className="row">
                    <div className="col-12">
                        <h3 style={{ textDecoration: "none", color: "inherit" }}>Verifikasi</h3>
                        <h6 className="mt-5">Selamat Akun Anda Berhasil Terverifikasi. Silahkan Login Untuk Membagikan Resep dan Tips Anda!</h6>
                    </div>
                </div>
            </div>
        )
    }
}