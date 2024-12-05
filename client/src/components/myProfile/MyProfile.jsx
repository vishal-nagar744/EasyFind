import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import FoodCard from '../FoodCard/FoodCard'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [listedProperties, setListedProperties] = useState([])
    const [listedrestaurants, setListedrestaurants] = useState([])
    const [bookmarkedProperties, setBookmarkedProperties] = useState([])
    const [bookmarkedrestaurants, setBookmarkedrestaurants] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchListedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/my-properties`, 'GET', options)
                setListedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedProperties()
    }, [])

    useEffect(() => {
        const fetchListedrestaurants = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/restaurants/find/my-restaurants`, 'GET', options)
                setListedrestaurants(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedrestaurants()
    }, [])

    useEffect(() => {
        const fetchBookmarkedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/bookmarked-properties`, 'GET', options)
                setBookmarkedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedProperties()
    }, [])

    useEffect(() => {
        const fetchBookmarkedrestaurants = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/Restaurant/find/bookmarked-restaurants`, 'GET', options)
                setBookmarkedrestaurants(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedrestaurants()
    }, [])

    const handleDeleteProfile = async () => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            await request(`/Restaurant/find/bookmarked-restaurants`, 'GET', options)
            dispatch(logout())
            navigate('/signin')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    <div className={classes.updateDeleteControls}>
                        <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                    </div>
                    <img className={classes.userProfileImg} src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} />
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                        List Your Home/Flat/Hostal
                    </button>
                    <button className={`${classes.button} ${activeBtn === 1 && classes.active}`} onClick={() => setActiveBtn(prev => 1)}>
                        Listed Near Tifin Serivices 
                    </button>
                    <button className={`${classes.button} ${activeBtn === 2 && classes.active}`} onClick={() => setActiveBtn(prev => 2)}>
                        Bookmarked Favriout Room/Flat/Hostal
                    </button>
                    <button className={`${classes.button} ${activeBtn === 3 && classes.active}`} onClick={() => setActiveBtn(prev => 3)}>
                        Bookmarked Tifin Serivices
                    </button>
                </div>
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedProperties?.length > 0 && <h2 className={classes.title}>Listed Properties</h2>}
                            <div className={classes.properties}>
                                {listedProperties?.length > 0 ? listedProperties?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>INR: {listedProperty.price}</span>
                                                <img src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{listedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{listedProperty?.sqmeters} BHK/RK/Flat<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {listedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no listed properties</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 1 && (
                        <>
                            {listedrestaurants?.length > 0 && <h2 className={classes.title}>Listed Restaurants</h2>}
                            {listedrestaurants?.length > 0 ? (
                                <div className={classes.restaurants}>
                                    {listedrestaurants.map((Restaurant) => (
                                        <FoodCard Restaurant={Restaurant} key={Restaurant._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no listed Tifin Serivices</h2>}
                        </>
                    )}
                    {activeBtn === 2 && (
                        <>
                            {bookmarkedProperties?.length > 0 && <h2 className={classes.title}>Bookmarked Properties</h2>}
                            <div className={classes.properties}>
                                {bookmarkedProperties?.length > 0 ? bookmarkedProperties?.map((bookmarkedProperty) => (
                                    <div key={bookmarkedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${bookmarkedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${bookmarkedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {bookmarkedProperty.price}</span>
                                                <img src={person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{bookmarkedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{bookmarkedProperty?.sqmeters} sq. meters<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {bookmarkedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>  
                                )) : <h2 className={classes.noListed}>You have no bookmarked Room/Flat/Hostal</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 3 && (
                        <>
                            {bookmarkedrestaurants?.length > 0 && <h2 className={classes.title}>Bookmarked Favriout Tifin Serivices</h2>}
                            {bookmarkedrestaurants?.length > 0 ? (
                                <div className={classes.yachts}>
                                    {bookmarkedrestaurants.map((Restaurant) => (
                                        <FoodCard Restaurant={Restaurant} key={Restaurant._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no bookmarked Tifin Serivices</h2>}
                        </>
                    )}
                </div>
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>
        </div>
    )
}

// 0 - Listed Properties
// 1 - Listed Yachts
// 2 - Bookmarked Properties
// 3 - Bookmarked Yachts

export default MyProfile