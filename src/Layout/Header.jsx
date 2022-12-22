import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import "./styles/Header.css"
const Header = () => {
  const dispatch =useDispatch()

  const handleClikLogout =()=>{
    dispatch(setNameTrainerGlobal(""))
  }
  return (
    <footer className='header'>
        <img  className='header__img' src="/images/pokedex.png" alt="" />
        <div className='header__black'></div>
        <div className='header__circle'>
          <div className='header__circle-int'>
            <i onClick={handleClikLogout} className='header__logout bx bx-log-out'></i></div>
        </div>
    </footer>
  )
}
export default Header