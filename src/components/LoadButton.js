import React, { useEffect, useState } from "react";
import "../App.css";


const LoadButton = () => {

  const [members, setMembers] = useState([])
  const [currency, setCurrency] = useState({})
  const [diet, setDiet] = useState([])
  const [veganPizza, setVeganPizza] = useState({})
  const [drinks, setDrinks] = useState({})
  const [collectedMoney, setCollectedMoney] = useState(0)

  useEffect(() => {
    const commonLink = "https://gp-js-test.herokuapp.com/pizza/"

    const getDataGuests = async () => {
      const response = await fetch(`${commonLink}guests`)
      const data = await response.json()
      setMembers(data.party)
    }

    const getDataCurrency = async () => {
      const response = await fetch(`${commonLink}currency`)
      const data = await response.json()
      setCurrency(data)
    }

    const getDataDiet = async (queryStr) => {
      const response = await fetch(`${commonLink}world-diets-book/${queryStr}`)
      const data = await response.json()
      setDiet(data.diet)
    }

    const getDataVeganPizza = async (vegansNumber) => {
      const response = await fetch(`${commonLink}order/vegan/${vegansNumber}`)
      const data = await response.json()
      setVeganPizza(data)
    }

    const getDataDrinks = async (membersNumber) => {
      const response = await fetch(`${commonLink}order-cola/${membersNumber}`)
      const data = await response.json()
      setDrinks(data)
    }

    getDataGuests()
    getDataCurrency()
    getDataDiet(members.map(guest => guest.name).join(",").split(" ").join("%20"))
    getDataVeganPizza(diet.filter(guest => guest.isVegan === true).length)
    getDataDrinks(members.length)

  }, [members, currency, diet, veganPizza, drinks])

  const checkFunction = () => {
    let appWrapper = document.querySelector(".app-wrapper")
    let button = document.querySelector(".button")
    if (appWrapper.childElementCount > 1) {
      if (appWrapper.lastChild === button) {
        return
      }
      appWrapper.removeChild(appWrapper.lastChild)
      checkFunction()
    }
  }

  const pizzaEaters = members.filter(member => member.eatsPizza === true)

  const veganPizzaFullPriceBYN = (veganPizza, currency) => {
    return veganPizza.price.endsWith("USD")
  ? Number(veganPizza.price.slice(-4)) / currency.USD
  : veganPizza.price.endsWith("EUR")
    ? Number(veganPizza.price.slice(-4)) / currency.EUR
    : veganPizza.price
  }

  const drinksFullPriceBYN = (drinks, currency) => {
    return drinks.price.endsWith("USD")
  ? Number(drinks.price.slice(-4)) / currency.USD
  : veganPizza.price.endsWith("EUR")
    ? Number(drinks.price.slice(-4)) / currency.EUR
    : drinks.price
  }

  const totalOrderValue = veganPizzaFullPriceBYN() + drinksFullPriceBYN()


  return (
    <div className="app-wrapper">
      <button onClick={checkFunction} className="button">Load</button>
      {members.length === 0 && !diet.length === 0 && !Object.keys(currency).length === 0 && !Object.keys(veganPizza).length === 0 && !Object.keys(drinks).length === 0
        ? "loading..."
        : <div className="infoSpace">
          <div className="circle">{
            pizzaEaters.forEach(member => (
              <div className="diagonalSlicing" style={`transform: rotate(${360 / pizzaEaters.length * pizzaEaters.indexOf(member)}deg)`}></div>
            ))
          }</div>
          <div className="counterList">
            <div className="counterTitle">"Total members"</div>
            <div className="counterNumber">{members.length}</div>
          </div>
          <div className="counterList">
            <div className="counterTitle">Total pizza eaters</div>
            <div className="counterNumber">{members.filter(member => member.eatsPizza === true).length}</div>
          </div>
          <table>
            <tr>
              <th>Name</th>
              <th>Share to pay</th>
              <th>Pay</th>
            </tr>
            {
              members.forEach(member => (
                <tr>
                  <td>

                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                </tr>
              ))
            }
            < tr >
              <td>Total order</td>
              <td>{`${totalOrderValue} BYN`}</td>
              <td></td>
            </tr>
            <tr>
              <td>Money to collect</td>
              <td>{`${totalOrderValue - collectedMoney} BYN`}</td>
              <td></td>
            </tr>
            <tr>
              <td>Money collected</td>
              <td>{`${collectedMoney} BYN`}</td>
              <td></td>
            </tr>
          </table>
        </div>
      }
    </div >
  )
}

export default LoadButton