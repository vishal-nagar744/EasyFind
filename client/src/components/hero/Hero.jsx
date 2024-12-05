import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("Room ")
  const [continent, setContinent] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.heading}>Search Your Next Room</h2>
        <h5 className={classes.subheading}>Find new & featured Room located in your local indore city.</h5>
        <div className={classes.options}>
          <h3 className={classes.optionLabel}>Indore</h3>
          <select className={classes.select} onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="Room">Room</option>
            <option value="Hostel">Hostel</option>
            <option value="Flat">Flat</option>
          </select>
          <h3 className={classes.optionLabel}>Price Range</h3>
          <select className={classes.select} onChange={(e) => setPriceRange(e.target.value)}>
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
          <select className={classes.select} onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select Continent</option>
            <option value="0">Vijay Nagar</option>
            <option value="1">Aurbindo</option>
            <option value="2">Ranjeet Hanuman</option>
            <option value="3">Geeta Bhawan Square</option>
            <option value="4">Bhawarkua Square</option>
            <option value="5">Sudama Nagar</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Hero