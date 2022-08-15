import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{backgroundImage:"url(./cubes.png)"}}>
    <Container style={{height:400,display:"flex",flexDirection:"column",paddingTop:25,justifyContent:"space-around"}}>
   
    <div style={{display:"flex",height:"40%",flexDirection:"column",justifyContent:"center",textAlign:"center"}}>
    <Typography variant='h2' style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}}>
        cRypto univeRse
    </Typography>
    <Typography variant='subtitle2' style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserrat"}}>
        Get all the Info regarding your favourite Crypto currency
    </Typography>
    </div>

    <Carousel/>

    </Container>
    <hr/>
    </div>
  )
}

export default Banner