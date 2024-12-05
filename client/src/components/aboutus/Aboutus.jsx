import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Aboutus.module.css'
import img1 from '../../assets/team/piyush.jpg'
import img2 from '../../assets/team/vishal.jpg'
import img3 from '../../assets/team/aayush.jpg'
import img4 from '../../assets/team/aakash.jpg'
import img5 from '../../assets/team/RIshi.jpg'


const NotFound = () => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.wrapper}>
                     <div className={classes.col}>
          <h2>How It Works</h2>
          <p>If you rent our Room/Flat/Hostal </p>
          <p>Fill up a form with the basic details about your room , hostal , flat ,
              sign up, complete your profile and post your listing for free
              and the features provides to list our near by restaurant and bhojnalaya etc..
              It;s help to easy to find our food and flat....</p>
              <p>That is it! your listing is now in front Of thousands of user's</p>
              <p>Search for a locality and find the right post or a listing</p>
        <p>Contact the roommate or a landlord to close the deal
            that is it! ready to move in?</p>    
         </div>
        </div>
        <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>Why use Easy Find Room ??</h2>
          <p>
          Esay Find Room is a one-stop destination for anyone looking out for Room, Flat, PGs. we understand that finding the right living situation can be a challenge, which is why we make the process easy and stress-free. whether You're A Student Searching For A Room Or A Young Professional Seeking A Flat, 
          
          Our platform provides a streamlined and efficient way to connect with like-minded individuals in search of a shared living space.

          Our platform allows you to browse through a wide range of listings for co-living spaces, PGs, and Flats,. so, why wait? start your search today and find your ideal living situation with Easy Find Room!
          </p>
                </div>
        </div>
        <br/>
        <div className={classes.titles}>
                 <h2>Our Team Member</h2>
                </div>

                <div className={classes.Team}>
          <Link to={`/https://www.linkedin.com/in/piyush-mishra-495391260`} className={classes.Member}>
            <img src={img1} />
            <div className={classes.Defination}>properties</div>
            <h5>Piyush Mishra</h5>
          </Link>
          <Link to={`/https://www.linkedin.com/in/vishal-nagar-464127251`} className={classes.Member}>
            <img src={img2} />
            <div className={classes.Defination}>properties</div>
            <h5>Vishal <br /> Nagar</h5>
          </Link>
          <Link to={`/properties?type=Hostel&continent=1&priceRange=1`} className={classes.Member}>
            <img src={img3} />
            <div className={classes.Defination}> properties</div>
            <h5>Aayush Choudhary</h5>
          </Link>
          <Link to={`/properties?type=Hostel&continent=1&priceRange=1`} className={classes.Member}>
            <img src={img4} />
            <div className={classes.Defination}> properties</div>
            <h5>Aakash Bhagel</h5>
          </Link>
          <Link to={"https://www.linkedin.com/in/rishi-raj-shinde-312786219/"} className={classes.Member}>
            <img src={img5} />
            <div className={classes.Defination}>properties</div>
            <h5>Rishiraj Shinde</h5>
          </Link>
            </div>
            </div>

</div>                  
    
    )
}

export default NotFound