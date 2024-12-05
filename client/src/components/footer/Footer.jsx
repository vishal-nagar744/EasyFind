import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>Why Use Easy Find Room ??</h2>
          <p>
          Esay Find Room is a one-stop destination for anyone looking out for Room, Flat, PGs. we understand that finding the right living situation can be a challenge, which is why we make the process easy and stress-free. whether you're a student searching for a room or a young professional seeking a flat, our platform provides a stream lined and efficient way to connect with like-minded individuals in search of a shared living space.our platform allows you to browse through a wide range of listings for co-living spaces, PGs, and Flats,. so, why wait? start your search today and find your ideal living situation with Easy Find Room!
          </p>
        </div>
        <div className={classes.col}>
          <h2 style={{margin:60, marginTop:-92}} className='team'>Team Member</h2>
          <span style={{marginLeft:110}} >Full Stack Devloper: Vishal Nagar</span>
          <span style={{marginLeft:110}} >Full Stack Devloper: Rishiraj Shinde</span>
          <span style={{marginLeft:110}} >Frontend Devloper: Piyush Mishra</span>
          <span style={{marginLeft:110}} >Frontend Devloper: Aayush Choudhary</span>
          <span style={{marginLeft:110}} >Frontend Devloper: Aakash Bhagel</span>
        </div>
        <div className={classes.col}>
          <h2 style={{margin:60, marginTop:-138}} >Location</h2>
          <span style={{marginLeft:110}} >Continent: Indore</span>
          <span style={{marginLeft:110}} >Country: India</span>
          <span style={{marginLeft:110}} >Current Location: Indore</span>
        </div>
      </div>
      <span style={{color: "black" , fontSize:'18px', marginTop:'100px',padding:'20px' , display:'flex' ,justifyContent:'center'}}>© 2023 EasyFindRoom. Designd By Vishal Nagar.</span>
     
      


        
    </footer>
  )
}



export default Footer