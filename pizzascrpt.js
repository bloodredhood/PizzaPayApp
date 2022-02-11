const button = document.getElementById("button")
const appWrapper = document.getElementById("app-wrapper")

const goProcess = () => {

	const checkFunction = () => {
		if(appWrapper.childElementCount > 1) {
			if(appWrapper.lastChild === button) {
				return
			}
			appWrapper.removeChild(appWrapper.lastChild)
			checkFunction()
		}
	}

	const addSpan = () => {
		const waitingSpan = document.createElement("div")
		appWrapper.append(waitingSpan)
		waitingSpan.className = "waitingSpan"
		waitingSpan.innerHTML = "waiting..."
		button.className = "button loading"
	}

	const removeSpan = () => {
		const waitingSpan = document.querySelector(".waitingSpan")
		waitingSpan.innerHTML = ""
		button.className = "button"
	}

	const getResult = async () => {

		const getAPI = async () => {
			const response = await fetch("https://gp-js-test.herokuapp.com/pizza")
			const data = await response.json()
			removeSpan()
			const result = data.party
			return result
		}

		const partyMembers = await getAPI()
		const pizzaEaters = partyMembers.filter(member => member.eatsPizza === true)

		const infoSpace = document.createElement("div")
		const circle = document.createElement("div")
		const partyMembersCounter = document.createElement("div")
		const titlePartyMembersCounter = document.createElement("div")
		const numberPartyMembersCounter = document.createElement("div")
		const pizzaEatersCounter = document.createElement("div")
		const titlePizzaEatersCounter = document.createElement("div")
		const numberPizzaEatersCounter = document.createElement("div")

		appWrapper.append(circle)
		appWrapper.append(infoSpace)
		infoSpace.append(partyMembersCounter, pizzaEatersCounter)
		partyMembersCounter.append(titlePartyMembersCounter, numberPartyMembersCounter)
		partyMembersCounter.style.marginRight = "150px"
		pizzaEatersCounter.append(titlePizzaEatersCounter, numberPizzaEatersCounter)
		pizzaEatersCounter.style.marginLeft = "150px"

		titlePartyMembersCounter.innerHTML = "Total members"
		numberPartyMembersCounter.innerHTML = partyMembers.length
		titlePizzaEatersCounter.innerText = "Total pizza eaters"
		numberPizzaEatersCounter.innerHTML = pizzaEaters.length

		infoSpace.className = "infoSpace"
		circle.className = "circle"
		partyMembersCounter.className = "counterList"
		pizzaEatersCounter.className = "counterList"
		titlePartyMembersCounter.className = "counterTitle"
		titlePizzaEatersCounter.className = "counterTitle"
		numberPartyMembersCounter.className = "counterNumber"
		numberPizzaEatersCounter.className = "counterNumber"

		for (let i = 0; i < pizzaEaters.length/2; i++) {
			const div = document.createElement("div")
			circle.append(div)
			div.id = i + 11
		}

		for (let u = 0; u < pizzaEaters.length/2; u++) {
			let degree = 360/pizzaEaters.length*u
			let sliceId = `1${u+1}`
			let styleRotate = `transform: rotate(${degree}deg)`
			document.getElementById(sliceId).className = "diagonalSlicing"
			document.getElementById(sliceId).setAttribute("style", styleRotate)
		}
	}

	const processFunc = () => {
		checkFunction()
		addSpan()
		setTimeout(getResult, 1000)
	}

	processFunc()
}

button.onclick = goProcess