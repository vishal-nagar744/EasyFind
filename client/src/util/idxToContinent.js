export const arrContinent = [
    'Vijay Nagar',
    'Aurbindo',
    'Ranjeet Hanuman',
    'Geeta Bhawan Square',
    'Bhawarkua Square',
    'Sudama Nagar'
]

export const continentToIdx = (continent) => {
    return arrContinent.findIndex((cont) => cont.toLowerCase() === continent.toLowerCase())
}

export const idxToContinent = (idx) => {
    return (arrContinent.filter((_, index) => index === Number(idx)))[0]
}