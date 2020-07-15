import React from 'react';
import "./Home.css";
import logo from "../../../assets/images/logo/pie-image.jpg"
import Card from '../../../component/Cards/Card';
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from 'react-redux';
import Buttons from '../../../component/Button/Buttons';
import swal from 'sweetalert';


class Home extends React.Component {
  state = {
    recipeList: []
  }

  getRecipeData = () => {
    Axios.get(`${API_URL}/resep/terbaik`)
      .then(res => {
        console.log(res.data)
        this.setState({ recipeList: res.data })
      })
      .catch(err => {
        console.log(err)
        alert('Data Kosong')
      })
  }

  componentDidMount() {
    this.getRecipeData();
  }

  renderWarning = () => {
    this.props.user.id ? swal("Gagal", "Resep Ini Hanya Bisa Diakses Pengguna Premium", "error") : swal("Gagal", "Anda Harus Login Untuk Membaca Resep Ini", "error")
  }

  addScoreHandler = (idx) => {
    if (this.props.user.id) {
      Axios.get(`${API_URL}/resep/${idx}`)
        .then(res => {
          //console.log(res.data)
          Axios.put(`${API_URL}/resep/tambah/nilai/${res.data.id}`, {
            rating: res.data.rating + 1
          })
            .then(res => {
              // console.log(res.data)
              this.getRecipeData()
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      swal("Gagal", "Anda Harus Login Terlebih Dahulu", "error")
    }
}

addWishlistHandler = (idx) => {
  //console.log(idx)
  Axios.get(`${API_URL}/rencana/${this.props.user.id}/${idx}`)
    .then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        Axios.post(`${API_URL}/rencana/tambah/pengguna/${this.props.user.id}/resep/${idx}`, {
          userId: this.props.user.id,
          recipeId: idx
        })
          .then(res => {
            console.log(res.data);
            swal('Sukses', 'Resep Berhasil Tersimpan di Rencana Saya', 'success')
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        swal('Gagal', 'Resep Sudah Tersimpan di Rencana Saya', 'error')
      }
    })
    .catch(e => {
      console.log(e)
    })
}

renderRecipeList = () => {
  const { recipeList } = this.state
  return recipeList.map((val, idx) => {
    if (val.recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
      if (val.postOption === "premium") {
        if (this.props.user.membership === "premium") {
          return (
            <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
              <Link
                to={`/resep/${val.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card recipe={val} />
              </Link>
              <div className="d-flex justify-content-around align-items-center">
                <div className="row">
                  <i className="material-icons" onClick={() => this.addScoreHandler(val.id)}>&#xe87e;</i>
                  <p className="ml-2">{val.rating}</p>
                </div>
                {this.props.user.id ? (
                  <Buttons type="outlined" onClick={() => this.addWishlistHandler(val.id)}>Simpan Resep</Buttons>
                ) : null}
              </div>
            </div>
          )
        } else {
          return (
            <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()} onClick={this.renderWarning}>
              <Card recipe={val} />
              <div className="d-flex justify-content-around align-items-center">
                <div className="row">
                  <i className="material-icons" onClick={() => this.addScoreHandler(val.id)}>&#xe87e;</i>
                  <p className="ml-2">{val.rating}</p>
                </div>
                {this.props.user.id ? (
                  <Buttons type="outlined" onClick={() => this.addWishlistHandler(val.id)}>Simpan Resep</Buttons>
                ) : null}
              </div>
            </div>
          )
        }
      } else {
        return (
          <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
            <Link
              to={`/resep/${val.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card recipe={val} />
            </Link>
            <div className="d-flex justify-content-around align-items-center">
              <div className="row">
                <i className="material-icons" onClick={() => this.addScoreHandler(val.id)}>&#xe87e;</i>
                <p className="ml-2">{val.rating}</p>
              </div>
              {this.props.user.id ? (
                <Buttons type="outlined" onClick={() => this.addWishlistHandler(val.id)}>Simpan Resep</Buttons>
              ) : null}
            </div>
          </div>
        )
      }
    }
  })
}


render() {
  return (
    <div className="container d-flex justify-content-center flex-column align-items-center">
      <div className="d-flex justify-content-center flex-column header text-center">
        <h2 style={{ color: "inherit" }}>Solusi Resep Mudah, Cepat, dan Anti Gagal</h2>
        <h3>Cocok untuk di setiap acara dan suasana</h3>
      </div>
      <div className="text-center mt-5">
        <h2 style={{ color: "inherit" }}>Resep Paling Disukai</h2><br />
        <div className="row d-flex flex-wrap justify-content-center">
          {this.renderRecipeList()}
        </div>
      </div>
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    user: state.user
  };
};

export default connect(mapStateToProps)(Home)