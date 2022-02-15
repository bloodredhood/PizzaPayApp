import React from "react";

const SlicedPizza = ({store}) => {
  return (
    <div className="infoSpace">
      <div className="circle">{
        store.state.members.filter(member => member.eatsPizza === true).map(member => (
          <div className="diagonalSlicing" style={`transform: rotate(${360 / store.state.members.filter(member => member.eatsPizza === true).length * store.state.members.filter(member => member.eatsPizza === true).indexOf(member)}deg)`}></div>
        ))
      }</div>
      <div className="counterList">
        <div className="counterTitle">"Total members"</div>
        <div className="counterNumber">{store.state.members.length}</div>
      </div>
      <div className="counterList">
        <div className="counterTitle">Total pizza eaters</div>
        <div className="counterNumber">{store.state.members.map(member => member.eatsPizza === true).length}</div>
      </div>
    </div>
  )
}

export default SlicedPizza