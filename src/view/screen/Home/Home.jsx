import React from 'react';
import "./Home.css";
import logo from "../../../assets/images/logo/pie-image.jpg"
import Card from '../../../component/Cards/Card';
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

const resepList = [{
    recipeName: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    cookTime: 10,
    jumlahBahan: 2,
    numbServings: '3-4',
    image: logo,
    userId: 2,
},
{
    recipeName: "Butterscotch Rum Pound Cake",
    kategori: "Cake",
    cookTime: 54,
    userId: 2,
    numbServings: '3-4',
    image: 'https://www.meals.com/imagesrecipes/30142lrg.jpg'
},
{
    recipeName: "Chocolate Crinkle-Top Cookies",
    kategori: "Cookies",
    cookTime: 10,
    userId: 2,
    numbServings: '3-4',
    image: logo
}
]
class Home extends React.Component {
    state = {
        recipeList: []
      }

      getRecipeData = () => {
        Axios.get(`${API_URL}/recipes`
          , {
            params: {
              _expand: "user"
            }
          }
        )
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
    
      renderRecipeList = () => {
        const { recipeList } = this.state
        return recipeList.map(val => {
          // return <Card resep={val} />
          return (
            <>
              <div className="d-flex flex-column justify-content-center">
              <Link
                to={`/resep/${val.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card recipe={val} 
                // key={`resep-${val.id}`} 
                />
              </Link>
              </div>
            </>
          )
        })
      }

    listResep = () => {
        return resepList.map(val => {
            return <Card recipe={val} />
        })
    }
    render() {
        return (
            <div className="container d-flex justify-content-center flex-column align-items-center">
                <div className="d-flex justify-content-center flex-column header text-center">
                    <h1>Solusi Resep Mudah, Cepat, dan Anti Gagal</h1>
                    <h3>Cocok untuk di setiap acara dan suasana</h3>
                </div>
                <div className="text-center mt-5">
                    <h2 style={{color: "inherit"}}>Resep Paling Populer</h2><br />
                    <div className="row d-flex flex-wrap justify-content-center">
                        {this.renderRecipeList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home