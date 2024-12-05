import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../util/fetchAPI'
import FoodCard from '../FoodCard/FoodCard'
import classes from './Foods.module.css'    

const Restaurant = () => {
    const [Restaurant, setRestaurant] = useState([])

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await request('/Restaurant/getAll', 'GET')
                setRestaurant(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRestaurant()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5>Explore Your Next Restaurant</h5>
                    <h2>Restaurant/Tiffin Center</h2>
                </div>
                <div className={classes.Restaurant}>
                    {Restaurant?.length > 0
                        ? Restaurant.map((y) => (
                            <FoodCard Restaurant={y} key={y._id} />
                        ))
                        : <h2>No Restaurant currently on sale.</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default Restaurant