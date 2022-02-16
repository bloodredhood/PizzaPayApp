const commonLink = "https://gp-js-test.herokuapp.com/pizza/"

  export const getDataGuests = async() => {
    const response = await fetch(`${commonLink}guests`)
    const data = await response.json()
    return data.party
  }

  export const getDataCurrency = async() => {
    const response = await fetch(`${commonLink}currency`)
    const data = await response.json()
    return data
  }

  export const getDataDiet = async(queryStr) => {
    const response = await fetch(`${commonLink}world-diets-book/${queryStr}`)
    const data = await response.json()
    return data.diet
  }
  
  export const getDataVeganPizza = async(type, vegansNumber) => {
    const response = await fetch(`${commonLink}order/${type}/${vegansNumber}`)
    const data = await response.json()
    return data
  }

  export const getDataDrinks = async(membersNumber) => {
    const response = await fetch(`${commonLink}order-cola/${membersNumber}`)
    const data = await response.json()
    return data
  }

  export const getCommonStateFunc = (arr, arr1) => {
    let arr2 = []
    for (let i = 0; i < arr.length; i++) {
      arr2.push({
        name: arr[i].name,
        eatsPizza: arr[i].eatsPizza,
        isVegan: arr1[i].isVegan,
        isPaid: false
      })
    }
    return arr2
  }