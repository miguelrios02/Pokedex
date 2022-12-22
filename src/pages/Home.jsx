import "./styles/Home.css"
import FormHome from "../components/FormHome"
import React from "react";
const Home=()=>{
    return(
        <main className="home">
            <img className="home__img" src="/images/pokedex.png" alt="" />
            <h2 className="home__subtitle">hi, trainig</h2>
            <p className="home__text">Give me your name to start</p>
            <FormHome/>
        </main>
    )
}

export default Home