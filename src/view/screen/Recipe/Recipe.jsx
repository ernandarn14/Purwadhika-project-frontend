import React from "react";
import "./Recipe.css";
// import logo from "../../../assets/images/logo/pie-image.jpg";
import Card from "../../../component/Cards/Card";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux";
import Buttons from "../../../component/Button/Buttons";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons/";
import { FormControl } from "react-bootstrap";


class Resep extends React.Component {
  state = {
    recipeList: {
      recipeName: "",
      rating: "",
      cookTime: "",
      numbServings: "",
      recipeImage: "",
      shortDesc: "",
      users: {},
      recipeCategory: {},
      id: 0
    },
    recipe: [],
    categoryFilter: 0,
    categoryList: [],
    category: "Semua",
    sortList: "asc",
    currentPage: 0,
    itemsPerPage: 6,
    totalPages: 0,
    totalElements: 0,
  }

  getRecipeData = () => {
    Axios.get(`${API_URL}/resep`)
      .then(res => {
        console.log(res.data)
        this.setState({ recipeList: res.data, recipe: res.data })
        // console.log(this.state.recipeList[0].id)
      })
      .catch(err => {
        console.log(err)
        alert('Data Kosong')
      })
  }

  getCategoryData = () => {
    Axios.get(`${API_URL}/kategori-resep`)
      .then(res => {
        console.log(res.data)
        this.setState({ categoryList: res.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  getRecipePagination = (val, currentPage) => {
    currentPage -= 1
    if (val == "Semua") {
      Axios.get(`${API_URL}/resep/sort/${this.state.sortList}?page=${currentPage}&size=${this.state.itemsPerPage}`)
        .then(res => {
          console.log(res.data.content)
          this.setState({
            recipe: res.data.content,
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
            currentPage: res.data.number + 1
          })
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      Axios.get(`${API_URL}/resep/paging/${this.state.sortList}?page=${currentPage}&size=${this.state.itemsPerPage}&categoryName=${val}`)
        .then(res => {
          console.log(res.data.content)
          this.setState({
            recipe: res.data.content,
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
            currentPage: res.data.number + 1
          })
        })
        .catch(e => {
          console.log(e)
        })
    }

  }

  componentDidMount() {
    this.getRecipeData();
    this.getCategoryData()
    this.getRecipePagination(this.state.category, this.state.currentPage)
  }

  renderRecipeList = () => {
    const { recipe } = this.state
    return recipe.map((val, idx) => {
      if (val.recipeName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
        return (
          <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()}>
            <Link
              to={`/resep/${val.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card recipe={val} />
            </Link>
            <div className="d-flex justify-content-center">
              <Buttons type="outlined" onClick={() => this.addWishlistHandler(val.id)}>Simpan Resep</Buttons>
            </div>
          </div>
        )
      }
    })
  }

  renderCategory = () => {
    const { categoryList } = this.state
    return categoryList.map((val, idx) => {
      const { id, recipeCategoryName } = val
      return (
        // <div className="mr-3 kategori" key={id.toString()}>
        //   <h6 className="text-center" onClick={() => this.getRecipePagination(this.state.category, this.state.currentPage)}
        // onChange={(e) => this.setState({ category: e.target.value })}>{recipeCategoryName}</h6>
        // </div>
        // <>
        <option value={recipeCategoryName}>{recipeCategoryName}</option>
        // </>
      )
    })

  }

  addWishlistHandler = (idx) => {
    Axios.get(`${API_URL}/rencana/${this.props.user.id}/${this.state.recipeList[idx - 1].id}`)
      // Axios.get(`${API_URL}/rencana/cek-rencana`, {
      //   params: {
      //     userId: this.props.user.id,
      //     recipeId: 1
      //   }
      // })
      .then(res => {
        alert("masuk")
        console.log(res.data)
        // console.log(this.state.recipeList[idx-1].id)
        if (Object.keys(res.data).length === 0) {
          Axios.post(`${API_URL}/rencana/tambah/pengguna/${this.props.user.id}/resep/${this.state.recipeList[idx - 1].id}`, {
            userId: this.props.user.id,
            recipeId: this.state.recipeList[idx - 1].id
          }
          )
            .then(res => {
              alert("masuk")
              console.log(res.data);
              swal('Sukses', 'Resep Berhasil Tersimpan di Rencana Saya', 'success')
            })
            .catch(err => {
              console.log(err);
            });
        }
        else {
          swal('Gagal', 'Resep Sudah Tersimpan di Rencana Saya', 'error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  changePage = event => {
    let targetPage = parseInt(event.target.value)
    this.getRecipePagination(this.state.category, targetPage);
    this.setState({
      [event.target.name]: targetPage
    })
  }

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      this.getRecipePagination(this.state.category, firstPage)
    }
  }

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      this.getRecipePagination(this.state.category, this.state.currentPage - prevPage)
    }
  }

  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.itemsPerPage)) {
      this.getRecipePagination(this.state.category, this.state.currentPage + 1)
    }
  }

  lastPage = () => {
    let condition = Math.ceil(this.state.totalElements / this.state.itemsPerPage)
    if (this.state.currentPage < condition) {
      this.getRecipePagination(this.state.category, condition)
    }
  }

  renderWithPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <>
        <div className="row d-flex flex-wrap justify-content-center text-center">
          {this.renderRecipeList()}
        </div>
        <div className="row justify-content-center mt-5 pt-2">
          <Buttons disabled={currentPage === 1 ? true : false}
            onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} /></Buttons>
          <Buttons disabled={currentPage === 1 ? true : false}
            onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} /></Buttons>
          <FormControl className={"page-num bg-light w-25"} name="currentPage" value={currentPage}
            onChange={this.changePage} />
          <Buttons disabled={currentPage === totalPages ? true : false}
            onClick={this.nextPage}><FontAwesomeIcon icon={faStepForward} /></Buttons>
          <Buttons disabled={currentPage === totalPages ? true : false}
            onClick={this.lastPage}><FontAwesomeIcon icon={faFastForward} /></Buttons>
        </div>
        <div className="d-flex justify-content-center mt-2">
          Halaman {this.state.currentPage} dari {this.state.totalPages}
        </div>
      </>
    )
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center my-5">Katalog Resep</h3>
            {/* <div className="d-flex align-items-center justify-content-center text-center mx-4 kategori-filter">
              {this.renderCategory()}
            </div> */}
            <div className="d-flex mt-5 justify-content-around">
              <div className="d-flex align-items-center">
                <label>Kategori:</label>
                <select className="form-control ml-4" style={{ width: "100px" }} name="category"
                  onClick={() => this.getRecipePagination(this.state.category, this.state.currentPage)}
                  onChange={(e) => this.setState({ category: e.target.value })}
                >
                  <option value="semua">Semua</option>
                  {this.renderCategory()}
                </select>
          </div>
              <div>
                <select className="form-control ml-4" style={{ width: "100px" }} name="sortList"
                  onClick={() => this.getRecipePagination(this.state.category, this.state.currentPage)}
                  onChange={(e) => this.setState({ sortList: e.target.value })}
                >
                  <option value="asc">A - Z</option>
                  <option value="desc">Z - A</option>
                </select>
              </div>
            </div>
            <div className="mt-1">
              {/* {this.renderRecipeList()} */}
              {this.renderWithPagination()}
            </div>

          </div>
        </div>
        {/* <h3 className="text-center my-5">Katalog Resep</h3>
        <div className="d-flex align-items-center justify-content-center text-center mx-4 kategori-filter"> */}
        {/* <div className="row">
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 1 })}>
              <img src="https://www.meals.com/imagesrecipes/145800lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Cakes</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 2 })}>
              <img src="https://www.meals.com/imagesrecipes/147086lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Kue Kering</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 3 })}>
              <img src="https://www.meals.com/imagesrecipes/145078lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Roti dan Muffin</h6>
            </Link>
            <Link className="mx-4 kategori" to="/resep" style={{ textDecoration: "none" }} onClick={() => this.setState({ categoryFilter: 4 })} >
              <img src="https://www.meals.com/imagesrecipes/32090lrg.jpg" alt="" className="img-kategori" />
              <h6 className="text-center">Pastry</h6>
            </Link>
          </div> */}
        {/* <div className="d-flex justify-content-around"> */}
        {/* <h6>Semua</h6> */}
        {/* {this.renderCategory()}
          </div>

        </div>
        <div className="d-flex mt-5 justify-content-start">
          <select className="form-control ml-4" style={{ width: "100px" }} name="sortList"
            onClick={() => this.getRecipePagination()}
            onChange={(e) => this.setState({ sortList: e.target.value })}
          >
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className="mt-3"> */}
        {/* {this.renderRecipeList()} */}
        {/* {this.renderWithPagination()} */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    user: state.user
  };
};

export default connect(mapStateToProps)(Resep);
