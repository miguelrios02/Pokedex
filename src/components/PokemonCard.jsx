import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PokemonCards.css";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const [dataPokemon, setDataPokemon] = useState();
  const [showanimation, setShowanimation] = useState(false)
  const handleClickPokemon = () => {
    navigate(`/pokedex/${dataPokemon?.id}`);
  };
  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => setDataPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const types = dataPokemon?.types.map((type) => type.type.name).join(" / ");
  return (
    <article
      onClick={handleClickPokemon}
      className={`pokeCard border-${dataPokemon?.types[0].type.name}`}
    >
      <section className={`pokeCard__header bg-lg-${dataPokemon?.types[0].type.name}`}></section>
      
      <section className="pokeCard__content">
        <img
          className="pokeCard__img"
          src={dataPokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <h3 className="pokeCard__name">{pokemon.name}</h3>
        <p className="pokeCard__types">{types}</p>
        <p className="pokeCard__types-title">Type</p>
      </section>
      <hr />
      <section className="pokeCard__stats">
        {dataPokemon?.stats.map((stat) => (
          <div key={stat.stat.url} className="pokeCard__stat">
            <p className="pokeCard__stat-name">{stat.stat.name}</p>
            <p className="pokeCard__stat-value">{stat.base_stat}</p>
          </div>
        ))}
      </section>
      <section className="loader">
        <div className={`loader__section up ${dataPokemon ? "animationActive":""}`}>
          <div className="loader__black up">
            <div className='loader__circle'>
              <div className='loader__circle-int'></div>
            </div>
          </div>
        </div>
        <div className={`loader__section down ${dataPokemon ? "animationActive":""}`}>
          <div className="loader__black down">
          </div>
        </div>
      </section>
    </article>
  );
};

export default PokemonCard;
