import React from "react";
import { AppBar, Container, createTheme, Toolbar, Typography } from "@material-ui/core";
import { MenuItem, Select, ThemeProvider } from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const Header = () => {

  const { currency, setCurrency } = CryptoState();

  const darkTheme=createTheme({
    palette:{
      primary:{
        main:"#fff"
      },
      type:"dark"
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography style={{flex:"1",color:"gold",fontFamily:"Montserrat",fontWeight:"bold",cursor:"pointer",fontSize:30}} variant='h6'>
          <Link to="/">Crypto<MonetizationOnIcon style={{fontSize:30,position:"absolute",top:"17px",left:"140px"}}/></Link>  
          </Typography>

          <Select variant="outlined" style={{width:100,height:40,marginRight:15,}} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>

        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
