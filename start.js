const StartWars = require('./core/models/StarWars');

const startWars = new StartWars();

(async ()=>{

    let schema = {}
    let films = []

    let getfilms = await startWars.getFilms()

    await Promise.all(getfilms.results.map(async(res)=>{

        let getStartships = await startWars.getStarships(res.starships)

        let body =  {
            name:res.title,
            planets: res.planets,
            startships:getStartships
        }

        films.push(body)
    }))

    schema.films = films
    console.log(schema)
})()