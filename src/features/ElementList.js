import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import {
  getElementList
} from './rulesSlice';
import Element from './Element'

var jsonQ=require("jsonq");
const ElementList = (props) => {
    const {elementList} = props;
    const getElementProps = (element,i) =>{
      debugger;
      return {...element, '_path': elementList.jsonQ_current[i].path}
    }  
    return (
      <div className="row h-100">
        <div className="col-3">
          <div className="list-group rounded-0 h-100 d-inline-block border-right" id="list-tab" role="tablist">
            {elementList.value().map((element,i)=> (
              <a className="list-group-item list-group-item-action" id={"list_"+element.name} data-toggle="list" href={"#list-"+element.name} role="tab" aria-controls={element.name} key={i}>{element.name}</a>
            ))}
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
          {elementList.value().map((element,i)=> (
            <div className="tab-pane fade mt-3" id={"list-"+element.name} role="tabpanel" aria-labelledby={"list_"+element.name} key={i}>
              <h2 className="display-6">Property Details</h2>
              <Element {...{...element, '_path': elementList.jsonQ_current[i].path}}/>
            </div>
          ))}
           
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = state => {
  debugger;
  return { elementList : getElementList(state) };
};

//export default ElementList;

export default connect(mapStateToProps)(ElementList);
