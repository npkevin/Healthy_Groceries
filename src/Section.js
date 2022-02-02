import React from 'react'
import { PlusCircle, Trash2 } from 'react-feather'

const Section = (props) => {
  return (
    <div className="section">
      <div className="section__label">
        <h1 id="name">{props.name.toUpperCase()}</h1>
        <button className={"btn-synched " + (props.synched ? "--synched " : "")} onClick={!props.synched ? props.saveState : null}>{props.synched ? "SYNCHED" : "CHANGES"}</button>
        <div className="section-buttons">
          <Trash2 className={"section-buttons__edit " + (props.editable ? "--editable " : "")} size="3rem" onClick={props.toggleEdit} />
          <PlusCircle className="section-buttons__adder" size="3rem" onClick={props.addCardFunc} />
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