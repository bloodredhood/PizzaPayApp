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
export const getVeganPizza = (pizzaType, vegansNumber) => ({ type: GET_VEGAN_PIZZA, pizzaType, vegansNumber })
export const getDrinks = (membersNumber) => ({ type: GET_DRINKS, membersNumber })
export const getCommonState = (arr, arr1) => ({type: GET_COMMON_STATE, arr, arr1})

const appReducer = async(state, action) => {
  switch(action.type) {
    case GET_GUESTS:
      state.members = await getDataGuests()
      return state
    case GET_CURRENCY:
      state.currency = await getDataCurrency()
      return state
    case GET_DIET:
      state.diet = await getDataDiet(action.queryStr)
      return state
    case GET_VEGAN_PIZZA:
      state.veganPizza = await getDataVeganPizza(action.pizzaType, action.vegansNumber)
      return state
    case GET_DRINKS:
      state.drinks = await getDataDrinks(action.membersNumber)
      return state
    case GET_COMMON_STATE:
      state.commonState = getCommonStateFunc(action.arr, action.arr1)
      return state
    default: return state
  }
}

export default appReducer