


const BACK = process.env.REACT_APP_BACK


const getTests = async (callback) => {
    fetch(`${BACK}/tests`)
        .then(response => response.json())
        .then(data => callback(data))
}

const getSamples = async (callback) => {
    fetch(`${BACK}/samples`)
        .then(response => response.json())
        .then(data => callback(data))
}

const getCategories = async (callback) => {
    fetch(`${BACK}/categories`)
        .then(response => response.json())
        .then(data => callback(data))
}


const getOrders = async (callback, token) => {

    const options = {
        headers: {
          'token': ` ${token}`
        }
      }
    fetch(`${BACK}/orders`, options)
     .then(response => response.json())
    .then(data => callback(data)) 
      
}

module.exports = { getTests, getSamples, getCategories, getOrders}