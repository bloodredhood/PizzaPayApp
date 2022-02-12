let store = {
  state: {
    guests: [],
    diet: [],
    currency: [],
    veganPizza: "",
    drinks: ""
  },
  getPizzaEaterNumber() {
    let arr = this.state.guests.filter(guest => guest.eatsPizza === true)
    return arr.length
  },
  getDietString() {
    let arr = this.state.guests.map(guest => guest.name)
    let result = arr.join(",");
    arr = result.split(" ")
    result = arr.join("%20")
    return result
  },
  getVegansNumber() {
    let arr = 
    return arr.length
  }
}




export default store
window.store = store