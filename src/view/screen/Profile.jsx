import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../../constants/API'
//import { URLSearchParams } from 'url'

export default class Profile extends Component {
    state = {
        getUserActive: []
    }

    getUseractive = () => {
        const newToken = new URLSearchParams(window.location.search).get("token")
        //console.log(this.props.match.params.username)
        Axios.get(`${API_URL}/pengguna/verifikasi/${this.props.match.params.username}`, {
            params: { 
                token: newToken
            }
        })
        .then(res => {
            console.log(res.data)
            //this.setState
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getUseractive()
    }

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