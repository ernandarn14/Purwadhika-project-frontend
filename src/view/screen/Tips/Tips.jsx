import React from 'react';
import './Tips.css';
import { Link } from "react-router-dom";
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import { connect } from 'react-redux';
import Buttons from '../../../component/Button/Buttons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons/";
import { FormControl } from "react-bootstrap";

class Tips extends React.Component {
    state = {
        tipsDataList: [],
        tipsDataPage: [],
        selectedFile: null,
        sortList: "asc",
        activeTipsName: "",
        currentPage: 0,
        itemsPerPage: 6,
        totalPages: 0,
        totalElements: 0,
    }

    getTipsData = () => {
        Axios.get(`${API_URL}/tips`)
            .then(res => {
                this.setState({ tipsDataList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // getTipsDataPage = (currentPage) => {
    //     currentPage -= 1
    //     Axios.get(`${API_URL}/tips/pagination?page=${currentPage}&size=${this.state.itemsPerPage}`)
    //         .then(res => {
    //             this.setState({
    //                 tipsDataList: res.data.content,
    //                 totalPages: res.data.totalPages,
    //                 totalElements: res.data.totalElements,
    //                 currentPage: res.data.number + 1
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    componentDidMount() {
        this.getTipsData()
        // this.getTipsDataPage(this.state.currentPage)
        this.getTipsPerPage(this.state.currentPage)
    }

    renderTipsData = () => {
        const { tipsDataPage } = this.state
        return tipsDataPage.map(val => {
            const { tipsImage, tipsName } = val
            if (tipsName.toLowerCase().includes(this.props.search.searchInput.toLowerCase())) {
                return (
                    // <>
                    <div className="tips-card d-inline-block mt-4 mx-2 d-flex flex-column align-items-center text-center" key={val.id.toString()}>
                        <Link
                            to={`/tips/${val.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <img src={tipsImage} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} />
                            <h5 className="mt-2">{tipsName}</h5>
                            {/* <Button type="contained" className="mt-2">
                                    Baca Selengkapnya
                                </Button> */}
                        </Link>
                    </div>
                    // </>
                )
            }
        })
    }

    //pagination

    changePage = event => {
        let targetPage = parseInt(event.target.value)
        this.getTipsPerPage(targetPage);
        this.setState({
            [event.target.name]: targetPage
        })
    }

    getTipsPerPage = (currentPage) => {
        currentPage -= 1
        Axios.get(`${API_URL}/tips/sort/${this.state.sortList}?page=${currentPage}&size=${this.state.itemsPerPage}`)
            .then(res => {
                console.log(res.data.content)
                this.setState({
                    tipsDataPage: res.data.content,
                    totalPages: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    currentPage: res.data.number + 1
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.getTipsPerPage(firstPage)
        }
    }

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.getTipsPerPage(this.state.currentPage - prevPage)
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.itemsPerPage)) {
            this.getTipsPerPage(this.state.currentPage + 1)
        }
    }

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.itemsPerPage)
        if (this.state.currentPage < condition) {
            this.getTipsPerPage(condition)
        }
    }

    renderWithPagination = () => {
        const { currentPage, totalPages } = this.state;
        return (
            <>
                 <div className="row d-flex flex-wrap justify-content-center">
                    {this.renderTipsData()}
                </div>
                <div className="row justify-content-center mt-3 pt-2">
                    <Buttons disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} /></Buttons>
                    <Buttons disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} /></Buttons>
                    <FormControl className={"page-num bg-light"} name="currentPage" value={currentPage}
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
                <h3 className="text-center my-5">Tips dan Trik</h3>
                <div className="d-flex align-items-center">
                    <select className="form-control ml-4" style={{ width: "100px" }} name="sortList"
                        onClick={() => this.getTipsPerPage()}
                        onChange={(e) => this.setState({ sortList: e.target.value })}
                    >
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>
                </div>
                {/* <div className="row d-flex flex-wrap justify-content-center"> */}
                {/* {this.renderTipsData()} */}
                {this.renderWithPagination()}
                {/* </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
    };
};

export default connect(mapStateToProps)(Tips)