import football from '../assets/football.json'
export const getCountries = () => {
    return football['countries']
}
export const getLeagues = () => {
    var listLeagues = []
    for (let league in football['leagues']) {
        if (football['leagues'].hasOwnProperty(league)) {
            listLeagues.push(league)
        }
    }
    return listLeagues
}
export const getClubs = league => {
    if (league !== '') {
        return football['leagues'][league]
    }
    return []
}
