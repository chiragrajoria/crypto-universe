import axios from "axios";
import React, { useState,useEffect } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";




const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState([]);
  const [search,setSearch]=useState("");
  const [page, setPage] = useState(1)

  const {currency,symbol}=CryptoState();

  const fetchCoins=async()=>{
    setLoading(true)
    const{data}=await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  }
console.log(coins)

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])
  
  const darkTheme=createTheme({
    palette:{
      primary:{
        main:"#fff"
      },
      type:"dark",
    }
  })



  const handleSearch=()=>{
    return coins.filter((coin)=>(
      coin.name.toLowerCase().includes(search) ||  coin.symbol.toLowerCase().includes(search) 
    ));
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>

    <Typography variant="h4" style={{margin:18,fontFamily:"Montserrat"}}>
        Cryptocurrency Price by Market Cap
    </Typography>

    <TextField style={{marginBottom:20,width:"100%"}} onChange={(e)=>setSearch(e.target.value)} label="Search For a Crypto Currency..." variant="outlined"/>

    <TableContainer>
      {
        loading ?(
          <LinearProgress style={{backgroundColor:"gold"}}/>
        ):(
          <Table>

            <TableHead style={{backgroundColor:"#EEBC1D"}}>
              <TableRow>
                {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                <TableCell style={{color:"black",fontWeight:700,fontFamily:"Montserrat"}} key={head} align={head==="Coin"?"":"right"}>
                  {head}
                </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
                  {handleSearch()
                  .slice((page-1)*10,(page-1)*10+10)
                  .map((row)=>{
                    const profit=row.price_change_percentage_24h >0;
                    return(
                      
                      <TableRow
                      style={{
                        backgroundColor:"#16171a",
                        cursor:"pointer",
                        fontFamily:"Montserrat"
                        }}
                      key={row.name}
                      >

                      {/* For coin column */}
                      <Link to={`/coins/${row.id}`}>
                      <TableCell style={{display:"flex",flexDirection:"row",gap:15}} scope="row" component="th">
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{marginBottom:10}}
                      />
                      <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{textTransform:"uppercase",fontSize:22}}>
                          {row.symbol}
                        </span>
                        <span style={{color:"darkgray"}}>
                          {row.name}
                        </span>
                      </div>
                      </TableCell>
                      </Link>                  

                      {/* For Price Column */}
                      <TableCell align="right">
                      <Link to={`/coins/${row.id}`}>
                        {symbol}{""}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </Link>                  
                      </TableCell>


                      {/* For 24h Change */}
                      <TableCell align="right" style={{color:profit>0?"rgb(14,203,129":"red",fontWeight:500}}>             
                      {profit && "+"}
                      {row?.price_change_percentage_24h?.toFixed(2)}%         
                      </TableCell>

                      {/* For market Cap */}
                      <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString().slice(0,-6))}{" "}
                      M
                      </TableCell>

                      </TableRow>  
                    )
                  })}
            </TableBody>

          </Table>
        )
      }
    </TableContainer>

      {/* for different pages */}
    <Pagination
    style={{padding:20,width:"100%",display:"flex",justifyContent:"center"}}
    count={(handleSearch()?.length/10).toFixed(0)}
    onChange={(_,value)=>{
      setPage(value);
      window.scroll(0,450);
    }}
    />

    </Container>
    </ThemeProvider>
  )
};

export default Coinstable;
