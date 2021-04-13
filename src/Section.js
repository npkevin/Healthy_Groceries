import React from 'react'
import {PlusCircle} from 'react-feather'

const Section = (props) => {
  return (
    <div className="section">
      <div className="section__label">
        <h1 id="name">{props.name.toUpperCase()}</h1>
        <button className={"btn-synched " + (props.synched ? "--synched " : "")} onClick={!props.synched ? props.saveState : null}>{props.synched ? "SYNCHED" : "CHANGES"}</button>
        <div className="item-adder-container">
          <PlusCircle className="item-adder" size="3rem" onClick={props.add} />
        </div>
      </div>
      <div id="divider" />
      <div className={"content-container " + props.className}>
        {props.children}
      </div>
    </div>
  )
}

export default Section