import React from 'react';
import '../styles/character.css';

const Character = (props) => {
  return (
    <div className="Character">
      <div className='character-container'>
        <h1 className='character-header'>{props.name}, the {props.race} {props.class}</h1>
        <div className='stats'>
          <p>Proficiency: {props.proficiency}</p>
          <p>Str Mod: {props.str_mod}</p>
          <p>Dex Mod: {props.dex_mod}</p>
          <p>Con Mod: {props.con_mod}</p>
          <p>Int Mod: {props.int_mod}</p>
          <p>Cha Mod: {props.cha_mod}</p>
        </div>
      </div>
    </div>
  )
}

export default Character
