const infoClean = (infoApi) => {
    return infoApi.map(dog => {
    return {
        id: dog.id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        years: dog.life_span,
        image: dog.image,
        temperaments: dog.temperament,
        created: false
    }
})
}

const testamentsClean = (infoApi) => {
    return infoApi.map(dog => {
        return {
            temperaments: dog.temperament,
            created: false
        }
    })
}

module.exports = {
    infoClean,
    testamentsClean
}

