import React, { useState } from "react";

const Table = ({ state }) => {

  const [collectedMoney, setCollectedMoney] = useState(0)

  const veganPizzaFullPriceBYN = () => {
    if (state.veganPizza.price.endsWith("USD")) {
      return Number(state.veganPizza.price.slice(0,-4)) * state.currency.USD
    } else if (state.veganPizza.price.endsWith("EUR")) {
      return Number(state.veganPizza.price.slice(0,-4)) * state.currency.EUR
    } else {
      return Number(state.veganPizza.price.slice(0,-4))
    }
  }

  const drinksFullPriceBYN = () => {
    if (state.drinks.price.endsWith("USD")) {
      return Number(state.drinks.price.slice(0,-4)) * state.currency.USD
    } else if (state.drinks.price.endsWith("EUR")) {
      return Number(state.drinks.price.slice(0,-4)) * state.currency.EUR
    } else {
      return Number(state.drinks.price.slice(0,-4))
    }
  }

  const veganPizzaPricePerVegan = Math.floor((veganPizzaFullPriceBYN() / state.commonState.filter(guest => guest.isVegan === true && guest.eatsPizza === true).length) * 10)/10
  const drinksPricePerMember = Math.floor((drinksFullPriceBYN() / state.commonState.length) * 10)/10

  const totalOrderValue = Math.floor(((veganPizzaPricePerVegan * state.commonState.filter(guest => guest.isVegan === true && guest.eatsPizza === true).length)
  + (drinksPricePerMember * state.commonState.length))*10)/10

  return (
    <table style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}>
      <thead>
        <tr style={{ padding: "15px 30px 15px 30px" }}>
          <th >Name</th>
          <th >Share to pay</th>
          <th >Pay</th>
        </tr>
      </thead>
      <tbody>
        {
          state.commonState.map(member => (
            <tr key={member.name}>
              <td style={{ padding: "5px" }}>
                {member.isVegan ? <span style={{ color: "green" }}>{member.name}</span> : <span>{member.name}</span>}
              </td>
              <td style={{ padding: "5px 20px" }}>
                {member.eatsPizza && member.isVegan ? Math.floor((veganPizzaPricePerVegan + drinksPricePerMember)*10)/10 : Math.floor(drinksPricePerMember * 10)/10} BYN
              </td>
              <td style={{ padding: "5px" }}>
                {member.isPaid === false ? <button onClick={() => {
                  (member.isPaid = true)
                  setCollectedMoney(
                    member.eatsPizza && member.isVegan ? Math.floor((collectedMoney + veganPizzaPricePerVegan + drinksPricePerMember)*10)/10 : Math.floor((collectedMoney + drinksPricePerMember)*10)/10
                    )
                }
                } className="tableButton" >PAY</button> : <button className="tableButton" disabled="true">PAID</button>}
              </td>
            </tr>

          ))
        }
        < tr style={{ fontWeight: "600" }} >
          <td>Total order</td>
          <td>{Math.floor(totalOrderValue * 10)/10} BYN</td>
          <td></td>
        </tr>
        <tr style={{ fontWeight: "600" }}>
          <td >Money to collect</td>
          <td>{Math.floor((totalOrderValue - collectedMoney)*10)/10} BYN</td>
          <td></td>
        </tr>
        <tr style={{ fontWeight: "600" }}>
          <td>Money collected</td>
          <td>{Math.floor(collectedMoney * 10)/10} BYN</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table