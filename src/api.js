import store from "./store"
const commonLink = "https://gp-js-test.herokuapp.com/pizza/"

const getData = {
  guests() {
    fetch(`${commonLink}guests`)
    .then(response => response.json())
    .then(data => {
      store.state.guests = data.party
    })
  },
  currency() {
    fetch(`${commonLink}currency`)
    .then(response => response.json())
    .then(data => {
      store.state.currency = data
    })
  },
  diet() {
    let arr = store.state.guests.map(guest => guest.name)
    let result = arr.join(",");
    arr = result.split(" ")
    result = arr.join("%20")
    let queryStr = result
    fetch(`${commonLink}world-diets-book/${queryStr}`)
    .then(response => response.json())
    .then(data => {
      store.state.diet = data.diet
    })
  },
  veganPizza() {
    fetch(`${commonLink}order/vegan/${store.getVegansNumber()}`)
    .then(response => response.json())
    .then(data => {
      store.state.veganPizza = data.price
    })
  },
  drinks() {
    let membersNumber = store.state.guests.length
    fetch(`${commonLink}order-cola/${membersNumber}`)
    .then(response => response.json())
    .then(data => {
      store.state.drinks = data.price
    })
  }
}

export default getData