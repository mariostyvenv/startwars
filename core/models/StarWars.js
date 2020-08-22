const https = require('https')

class StarWars{
    ROUTE_FILMS = "https://swapi.dev/api/films/"

    getFilms()
    {
        return new Promise((resolve, rejects)=>{
            https.get(this.ROUTE_FILMS, res => {

                let data = ""
            
                res.on("data", d => {
                    data += d
                })

                res.on("end", () => {
                    resolve(JSON.parse(data))
                })
            })
        })
    }

    startship(route)
    {
        return new Promise((resolve, reject) =>{
            https.get(route.replace('http','https'), res => {

                let data = ""
            
                res.on("data", d => {
                    data += d
                })

                res.on("end", () => {
                    data = JSON.parse(data)

                    let response = {
                        name:data.name,
                        model:data.model,
                        manufacturer:data.manufacturer,
                        passengers:data.passengers
                    }

                    resolve(response)
                })
            })
        })
    }

    getStarships(routes)
    {
        return new Promise((resolve, reject) =>
        {
            let requests = []

            routes.map((res)=>{
                requests.push(this.startship(res))
            })
    
            Promise.all(requests).then(values => {
                resolve(values)
            })
        })
    }
}

module.exports = StarWars