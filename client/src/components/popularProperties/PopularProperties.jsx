import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../assets/Listed loction img/img1.jpg'
import img2 from '../../assets/Listed loction img/img2.jpg'
import img3 from '../../assets/Listed loction img/img3.jpg'
import img4 from '../../assets/Listed loction img/img4.jpg'
import img5 from '../../assets/Listed loction img/img5.jpeg'
import img6 from '../../assets/Listed loction img/img6.jpg'

import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'


const PopularProperties = () => {
  const [RoomProperties, setRoomProperties] = useState(0)
  const [HostelProperties, setHostelProperties] = useState(0)
  const [FlatProperties, setFlatProperties] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/Properties/find/types', 'GET')
         setRoomProperties(data.Room)
         setHostelProperties(data.Hostel)
         setFlatProperties(data.Flat)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of Room/Flat/Hostal </h5>
          <h2>Best type of Room/Flat/Hostal for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties?type=Room&continent=0&priceRange=1`} className={classes.property}>
            <img src={img1} />
            <div className={classes.quantity}>{RoomProperties} properties</div>
            <h5>Vijay Nagar Square</h5>
          </Link>
          <Link to={`/properties?type=Hostel&continent=1&priceRange=1`} className={classes.property}>
            <img src={img2} />
            <div className={classes.quantity}>{HostelProperties} properties</div>
            <h5>Bhanwarkua Square</h5>
          </Link>
          <Link to={`/properties?type=Flat&continent=2&priceRange=1`} className={classes.property}>
            <img src={img3} />
            <div className={classes.quantity}>{FlatProperties} properties</div>
            <h5>Geetha Bhawan Square</h5>
          </Link>
          <Link to={`/properties?type=Flat&continent=2&priceRange=1`} className={classes.property}>
            <img src={img4} />
            <div className={classes.quantity}>{FlatProperties} properties</div>
            <h5>Ranjeet Hanuman Square</h5>
          </Link>
          <Link to={`/properties?type=Flat&continent=2&priceRange=1`} className={classes.property}>
            <img src={img5} />
            <div className={classes.quantity}>{FlatProperties} properties</div>
            <h5>Aurbindo Square</h5>
          </Link>
          <Link to={`/properties?type=Flat&continent=2&priceRange=1`} className={classes.property}>
            <img src={img6} />
            <div className={classes.quantity}>{FlatProperties} properties</div>
            <h5>Sudama Nagar</h5>
          </Link>
          
        </div>
      </div>
    </div>


  )
}

export default PopularProperties