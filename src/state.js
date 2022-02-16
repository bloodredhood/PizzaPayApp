import appReducer from "./appReducer"
import rerenderEntireTree from "./render"

let state = {
  members: [],
  diet: [],
  currency: {},
  veganPizza: {},
  drinks: {},
  commonState: [],
}

export let dispatch = async (state, action) => {
  state = await appReducer(state, action)
  rerenderEntireTree(state)
}

export default state
window.state = state
