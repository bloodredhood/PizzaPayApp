import { getDataCurrency, getDataDiet, getDataGuests, getDataVeganPizza, getDataDrinks, getCommonStateFunc } from "./api"

const GET_GUESTS = "GET_GUESTS"
const GET_CURRENCY = "GET_CURRENCY"
const GET_DIET = "GET_DIET"
const GET_VEGAN_PIZZA = "GET_VEGAN_PIZZA"
const GET_DRINKS = "GET_DRINKS"
const GET_COMMON_STATE = "GET_COMMON_STATE"

//actionCreators
export const getGuests = () => ({ type: GET_GUESTS })
export const getCurrency = () => ({ type: GET_CURRENCY })
export const getDiet = (queryStr) => ({ type: GET_DIET, queryStr })
export const getVeganPizza = (vegansNumber) => ({ type: GET_VEGAN_PIZZA, vegansNumber })
export const getDrinks = (membersNumber) => ({ type: GET_DRINKS, membersNumber })
export const getCommonState = (arr, arr1) => ({type: GET_COMMON_STATE, arr, arr1})

let store = {
  state: {
    members: [],
    diet: [],
    currency: {},
    veganPizza: {},
    drinks: {},
    commonState: []
  },
  getPizzaEaterNumber() {
    return this.state.guests.filter(guest => guest.eatsPizza === true).length
  },
  getDietString() {
    return this.state.guests.map(guest => guest.name).join(",").split(" ").join("%20")
  },
  getVegansNumber() {
    return this.state.diet.filter(guest => guest.isVegan === true).length
  },
  async dispatch(action) {
    if (action.type === GET_GUESTS) {
      this.state.members = await getDataGuests()
    } else if (action.type === GET_CURRENCY) {
      this.state.currency = await getDataCurrency()
    } else if (action.type === GET_DIET) {
      this.state.diet = await getDataDiet(action.queryStr)
    } else if (action.type === GET_VEGAN_PIZZA) {
      this.state.veganPizza = await getDataVeganPizza(action.vegansNumber)
    } else if (action.type === GET_DRINKS) {
      this.state.drinks = await getDataDrinks(action.membersNumber)
    } else if (action.type === GET_COMMON_STATE) {
      this.state.commonState = getCommonStateFunc(action.arr, action.arr1)
    }
  },
  veganPizzaFullPriceBYN() {
    if (this.state.veganPizza.length > 0) {
      if (this.state.veganPizza.price.endsWith("USD")) {
        return Number(this.state.veganPizza.price.slice(-4)) / this.state.currency[0].USD
      } else if (store.state.veganPizza.price.endsWith("EUR")) {
        return Number(this.state.veganPizza.price.slice(-4)) / this.state.currency[0].EUR
      } else {
        return this.state.veganPizza.price
      }
    }
  },
  drinksFullPriceBYN() {
    if (this.state.drinks.length > 0) {
      if (this.state.drinks.price.endsWith("USD")) {
        return Number(this.state.drinks.price.slice(-4)) / this.state.currency[0].USD
      } else if (this.state.drinks.price.endsWith("EUR")) {
        return Number(this.state.drinks.price.slice(-4)) / this.state.currency[0].EUR
      } else {
        return this.state.drinks.price
      }
    }
  }
}

export default store
window.store = store
