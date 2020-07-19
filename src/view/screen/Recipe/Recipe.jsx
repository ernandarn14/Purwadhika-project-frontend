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
      rating: 0,
      cookTime: "",
      numbServings: "",
      recipeImage: "",
      shortDesc: "",
      users: {},
      recipeCategory: {},
      id: 0
    },
    recipe: [],
    scores: 0,
    categoryFilter: 0,
    categoryList: [],
    category: "semua",
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
    if (val === "semua") {
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

  renderWarning = () => {
    this.props.user.id ? swal("Gagal", "Resep Ini Hanya Bisa Diakses Pengguna Premium", "error") : swal("Gagal", "Anda Harus Login Untuk Membaca Resep Ini", "error")
  }

  renderRecipeList = () => {
    const { recipe } = this.state
    return recipe.map((val) => {
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
              </div>
            )
          } else {
            return (
              <div className="d-flex flex-column justify-content-center my-4" key={val.id.toString()} onClick={this.renderWarning}>
                <Card recipe={val} />
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
            </div>
          )
        }
      } else {
        return null
      }
    })
  }

  renderCategory = () => {
    const { categoryList } = this.state
    return categoryList.map((val, idx) => {
      const { id, recipeCategoryName } = val
      return (
        <option value={recipeCategoryName} key={id.toString()}>{recipeCategoryName}</option>
      )
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
            <div className="d-flex mt-5 justify-content-around">
              <div className="d-flex align-items-center">
                <label>Kategori:</label>
                <select className="form-control ml-4"
                  onClick={() => this.getRecipePagination(this.state.category, this.state.currentPage)}
                  onChange={(e) => this.setState({ category: e.target.value })}
                >
                  <option value="semua">Semua</option>
                  {this.renderCategory()}
                </select>
              </div>
              <div className="d-flex align-items-center">
                <label>Urutan:</label>
                <select className="form-control ml-4"
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
