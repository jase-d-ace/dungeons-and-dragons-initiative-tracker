import React from 'react';

const Character = (props) => {
  console.log(props, 'from character')
  return (
    <div className="Character">
      <h1>{props.name}, the {props.race} {props.class}</h1>
      <p>Proficiency: {props.proficiency}</p>
      <p>Str Mod: {props.str_mod}</p>
      <p>Dex Mod: {props.dex_mod}</p>
      <p>Con Mod: {props.con_mod}</p>
      <p>Int Mod: {props.int_mod}</p>
      <p>Cha Mod: {props.cha_mod}</p>
    </div>
  )
}

export default Character
