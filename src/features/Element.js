import React from 'react'
import RulesForm from './RulesForm'


const Element = (props) => {
	console.log("props",props);
	return (
      <div>
        <RulesForm {...props}/>
      </div>
	)
}

export default Element;
