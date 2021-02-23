import React from 'react'
import {PlusCircle} from 'react-feather'

const Section = (props) => {
  return (
    <div className="section">
      <div className="section__label">
        <h1 id="name">{props.name.toUpperCase()}</h1>
        <PlusCircle className="item-adder" size="3rem" onClick={props.add} />
      </div>
      <div id="divider" />
      <div className={"content-container " + props.className}>
        {props.children}
      </div>
    </div>
  )
}

export default Section