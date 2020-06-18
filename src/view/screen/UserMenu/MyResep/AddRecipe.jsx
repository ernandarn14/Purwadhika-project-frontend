import React from "react"
import "./MyResep.css"
import Buttons from "../../../../component/Button/Buttons"
import { Link } from "react-router-dom"

class AddRecipe extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center my-5">Tambah Resep</h3>
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <input type="text" className="form-control w-75"
                                placeholder="Judul Resep"
                            // value={judul}
                            // onChange={(e) =>
                            //     this.inputHandler(e, "judul", "addTipsForm")
                            // }
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-4 category-recipe">
                            <div className="d-flex">
                                <label>Kategori</label>
                                <select id="kategori" className="ml-3 form-control w-75">
                                    <option>Tepung</option>
                                    <option>Ragi</option>
                                    <option>Pewarna</option>
                                    <option>Perasa</option>
                                </select>
                            </div>
                            <div className="d-flex mx-5">
                                <input type="text" className="form-control w-75"
                                    placeholder="Waktu Membuat"
                                // value={judul}
                                // onChange={(e) =>
                                //     this.inputHandler(e, "judul", "addTipsForm")
                                // }
                                />
                                <label className="ml-3">Menit</label>
                            </div>
                            <div className="d-flex">
                                <input type="text" className="form-control w-75"
                                    placeholder="Jumlah Porsi"
                                // value={judul}
                                // onChange={(e) =>
                                //     this.inputHandler(e, "judul", "addTipsForm")
                                // }
                                />
                                <label className="ml-3">Porsi</label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <input type="text" className="form-control w-75"
                                // value={gambar}
                                placeholder="Url Gambar"
                            // onChange={(e) =>
                            //     this.inputHandler(e, "gambar", "addTipsForm")
                            // }
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <textarea className="form-control w-75" placeholder="Deskripsi Resep"
                                // value={deskripsi} onChange={(e) =>
                                //     this.inputHandler(e, "deskripsi", "addTipsForm")
                                // }
                            >

                            </textarea>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Bahan Resep</h4>
                            <textarea className="form-control w-75"
                                // value={deskripsi} onChange={(e) =>
                                //     this.inputHandler(e, "deskripsi", "addTipsForm")
                                // }
                            >
                            </textarea>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            <h4 className="text-left">Langkah Membuat</h4>
                            <textarea className="form-control w-75"
                                // value={deskripsi} onChange={(e) =>
                                //     this.inputHandler(e, "deskripsi", "addTipsForm")
                                // }
                            >
                            </textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/resepku">
                            <Buttons type="contained" className="mt-4">Simpan</Buttons>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRecipe