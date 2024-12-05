import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './properties.module.css'
import { useEffect } from 'react'
import { continentToIdx } from '../../util/idxToContinent'
import { request } from '../../util/fetchAPI'
import PropertyCard from '../propertyCard/PropertyCard'

const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 0) {
          setState(prev => formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const filteredProperties = allProperties.filter((property) => {

      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const continent = continentToIdx(property.continent)

      if (
        property.type === options.type
        && continent === Number(options.continent)
        && property.price >= minPrice && property.price <= maxPrice
      ) {
        return property
      }
    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRanges}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties(prev => filteredProperties)
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
        <h3 className={classes.optionLabel}>Indore</h3>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="Room">Room </option>
            <option value="Hostel">Hostel</option>
            <option value="Flat">Flat</option>
          </select>
          <h3 className={classes.optionLabel}>Price Range</h3>
          <select value={state?.priceRanges} name="priceRange" onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">1500</option>
            <option value="1">1,500-3,000</option>
            <option value="2">3,000-4,000</option>
            <option value="3">5,000-6,000</option>
            <option value="4">6,000-7,000</option>
            <option value="4">7,000-8,000</option>
            <option value="4">9,000-10,000</option>
          </select>
          <h3 className={classes.optionLabel}>Location</h3>
          <select value={state?.continent} name="continent" onChange={handleState}>
            <option disabled>Select Continent</option>
            <option value="0">Vijay Nagar</option>
            <option value="1">Aurbindo</option>
            <option value="2">Ranjeet Hanuman</option>
            <option value="3">Geeta Bhawan Square</option>
            <option value="4">Bhawarkua Square</option>
            <option value="5">Sudama Nagar</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredProperties?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected Room/Flat/Hostal</h5>
              <h2> Room/Flat/Hostal you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property}/>
              ))}
            </div>
          </> : <h2 className={classes.noProperty}>We have no  Room/Flat/Hostal with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Properties