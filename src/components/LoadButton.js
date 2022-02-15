import React, { useEffect, useState } from "react";
import { getCommonState, getCurrency, getDiet, getDrinks, getGuests, getVeganPizza } from "../store";
import store from "../store";
import "../App.css";
import SlicedPizza from "./SlicedPizza";
import Loader from "./Loader";


const LoadButton = () => {

  const [collectedMoney, setCollectedMoney] = useState(0)

  useEffect(() => {


  })

  const veganPizzaPricePerVegan = store.veganPizzaFullPriceBYN() / store.state.diet.filter(guest => guest.isVegan === true).length
  const drinksPricePerMember = store.drinksFullPriceBYN() / store.state.members.length

  const totalOrderValue = store.veganPizzaFullPriceBYN() + store.drinksFullPriceBYN()

  return (
    <div className="app-wrapper">
      <button onClick={() => {
        store.dispatch(getGuests())
        store.dispatch(getCurrency())
        store.dispatch(getDiet(store.state.members.map(guest => guest.name).join(",").split(" ").join("%20")))
        store.dispatch(getDrinks(store.state.members.length))
      }} className="button">Load</button>
      {store.state.members.length < 0
        ? <Loader />
        : <div>
          <SlicedPizza store={store} />
          <button onClick={() => {
            store.dispatch(getVeganPizza(store.state.diet.filter(member => member.isVegan === true).length))
          }} className="button" >Get vegans</button>
          <button onClick={() => {
            store.dispatch(getCommonState(store.state.members, store.state.diet))
          }} className="button" >Get table</button>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Share to pay</th>
              <th>Pay</th>
            </tr>
            </thead>
            <tbody>
            {
              store.state.commonState.map(member => (
                <tr key={member.name}>
                  <td>
                    {member.isVegan ? <span style={{ color: "green" }}>{member.name}</span> : <span>{member.name}</span>}
                  </td>
                  <td>
                    {member.eatsPizza && member.isVegan ? veganPizzaPricePerVegan + drinksPricePerMember : drinksPricePerMember}"BYN"
                  </td>
                  <td>
                    {member.isPaid === false ? <button onClick={() => {
                      (member.isPaid = true)
                      setCollectedMoney(member.eatsPizza && member.isVegan ? collectedMoney + veganPizzaPricePerVegan + drinksPricePerMember : collectedMoney + drinksPricePerMember)
                    }
                    } disabled="false">PAY</button> : <button disabled="true">PAID</button>}
                  </td>
                </tr>

              ))
            }
            < tr >
              <td>Total order</td>
              <td>{totalOrderValue} BYN</td>
              <td></td>
            </tr>
            <tr>
              <td>Money to collect</td>
              <td>{totalOrderValue - collectedMoney} BYN</td>
              <td></td>
            </tr>
            <tr>
              <td>Money collected</td>
              <td>{collectedMoney} BYN</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      }
    </div >
  )
}

export default LoadButton