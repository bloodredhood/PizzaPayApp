import getData from "./api"
//types
const GET_GUESTS = "GET_GUESTS"
const GET_CURRENCY = "GET_CURRENCY"
const GET_DIET = "GET_DIET"
const GET_VEGAN_PIZZA = "GET_VEGAN_PIZZA"
const GET_DRINKS = "GET_DRINKS"

//actionCreators
export const getGuests = () => ({ type: GET_GUESTS })
export const getCurrency = () => ({type: GET_CURRENCY})
export const getDiet = () => ({type: GET_DIET})
export const getVeganPizza = (vegansNumber) => ({type: GET_VEGAN_PIZZA, vegansNumber})
export const getDrinks = (membersNumber) => ({type: GET_DRINKS, membersNumber})
//для наполнения store нужно создать actionCreator
//далее в компонентах использовать store.dispatch(actionCreator(data))
//чтоб отправить инфо в store  


let store = {
  _state: {
    guests: [],
    diet: [],
    currency: [],
    veganPizza: [],
    drinks: []
  },
  getState() {
    return this._state;
  },
  getPizzaEaterNumber() {
    let arr = this._state.guests.filter(guest => guest.eatsPizza === true)
    return arr.length
  },
  getDietString() {
    let arr = this._state.guests.map(guest => guest.name)
    let result = arr.join(",");
    arr = result.split(" ")
    result = arr.join("%20")
    return result
  },
  getVegansNumber() {
    let arr = this._state.diet.filter(guest => guest.isVegan === true)
    return arr.length
  },
  dispatch(action) {
    if (action.type === GET_GUESTS) {
      this._state.guests.push(getData.guests())
    } else if (action.type === GET_CURRENCY) {
      this._state.currency.push(getData.currency())
    } else if (action.type === GET_DIET) {
      this._state.diet.push(getData.diet(this.getDietString()))
    } else if (action.type === GET_VEGAN_PIZZA) {
      this._state.veganPizza.push(getData.veganPizza(this.getVegansNumber()))
    } else if (action.type === GET_DRINKS) {
      this._state.drinks.push(getData.drinks(this._state.guests.length))
    }
  }
}

export default store
window.store = store