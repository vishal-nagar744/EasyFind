import React from 'react'
import classes from './FoodCard.module.css'
import { Link } from 'react-router-dom'
import { BsCash } from 'react-icons/bs'

const FoodCard = ({ Restaurant }) => {

    return (
        <Link to={`/Restaurant/${Restaurant._id}`} className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.imgContainer}>
                    <img src={`http://localhost:5000/images/${Restaurant.img}`} />
                </div>
                <h3 className={classes.title}>{Restaurant.title}</h3>
                <div className={classes.priceAndMaxPassengers}>
                    <span>INR:  {Restaurant.price}</span>
                    <span className={classes.passengers}><BsCash />  {Restaurant.maxPassengers}</span>
                </div>
            </div>
        </Link>
    )
}

export default FoodCard