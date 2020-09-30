const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = `Weather Description: ${data.forecast.weatherDescriptions}, Temperature: ${data.forecast.temperature}, Feels Like: ${data.forecast.feelsLike}`
            messageTwo.textContent = data.location
        }
    })
})
})
