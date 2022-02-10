const commonLink = "https://gp-js-test.herokuapp.com/pizza/"

const getData = {
  guests: async() => {
    const response = await fetch(`${commonLink}guests`)
    const data = await response.json()
    return data.party
  },
  currency: async() => {
    const response = await fetch(`${commonLink}currency`)
    const data = await response.json()
    return data
  },
  diet: async(queryStr) => {
    const response = await fetch(`${commonLink}world-diets-book/${queryStr}`)
    const data = await response.json()
    return data.diet
  },
  veganPizza: async(vegansNumber) => {
    const response = await fetch(`${commonLink}vegan/${vegansNumber}`)
    const data = await response.json()
    return data
  },
  drinks: async(membersNumber) => {
    const response = await fetch(`${commonLink}order-cola/${membersNumber}`)
    const data = await response.json()
    return data.price
  }
}

export default getData