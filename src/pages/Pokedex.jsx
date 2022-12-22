import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ListPokemons from "../components/ListPokemons";
import { paginationLogic } from "../helpers/paginationLogic";
import "./styles/Pokedex.css";
const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);

  const [namePokemon, setNamePokemon] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((state) => state.nameTrainer);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.namePokemon.value;
    setNamePokemon(name);
  };

  const handleChangeSelect = (e) => {
    setPokemonType(e.target.value);
  };

  const {lastPage,pagesInBlock,pokemonsInPage} = paginationLogic(currentPage,pokemonsFilter)

  const handleClickPage =(newPage)=>{
    setCurrentPage(newPage)

  }
  const handleNextPage =() =>{
    const newPage = currentPage +1 
    if(newPage> lastPage){
      setCurrentPage(1)
    }else{
      setCurrentPage(newPage)
    }
  }

  const handlePreviousPage =()=>{
    const newPage =currentPage -1
    if(newPage<1){
      setCurrentPage(lastPage)
    }else{
      setCurrentPage(newPage)
    }
  }
  const handleFistPage =()=>{
    setCurrentPage(1)
  }
const handleLastPage =()=>{
  setCurrentPage(lastPage)
}
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=200"
    }`;
    axios
      .get(URL)
      .then((res) => {
        if (pokemonType) {
          const newPokemons = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(newPokemons);
        } else {
          setPokemons(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "All ok!",
          text: "see your console",
        });
      });
  }, [pokemonType]);
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(namePokemon)
    );
    setPokemonsFilter(newPokemons);
  }, [namePokemon, pokemons]);

  return (
    <main>
      <header className="pokedex__header">
        <h1>Pokedex</h1>
        <p>
          welcome <span>{nameTrainer}</span>, here you can find your favorite
          pokemon
        </p>
        <form onSubmit={handleSubmit} className="pokedex__form">
          <div className="pokedex__search">
            <input className="pokedex__input" type="text" id="namePokemon" />
            <button className="pokedex__btn" type="submit">Search</button>
          </div>
          <select onChange={handleChangeSelect} className="pokedex__select">
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </header>
      <ListPokemons pokemons={pokemonsInPage} />
      <ul className="pokedex__listPages">
        <li onClick={handlePreviousPage}>{"<"}</li>
        <li onClick={handleFistPage}>...</li>
        {
          pagesInBlock.map(pageInBlock => <li className={currentPage === pageInBlock? "actualPage":""} onClick={()=>handleClickPage(pageInBlock)} key={pageInBlock}>{pageInBlock}</li>)
        }
        <li onClick={handleLastPage}>...</li>
        <li onClick={handleNextPage}>{">"}</li>
      </ul>
    </main>
  );
};

export default Pokedex;
