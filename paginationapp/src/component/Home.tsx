import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useSelector ,useDispatch} from 'react-redux';
//@ts-ignore
import { useHistory } from "react-router-dom";
import {GET_DATA} from '../allActions/action'
export default function Home(){
  const [data, setData] = useState<any>([]);
  const [filteredData, setfilteredData] = useState<any>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setpage] = useState<number>(0);
  const [check, setcheck] = useState<boolean>(false);
    useEffect(() => {
        getData()
      },[]);

      const getData =()=>{
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`)
        .then((response:any) => {
           //@ts-ignore
           setData((data)=> [...data,response?.data?.hits])
           setCount(count+1);
        });
      }

      useEffect(() => {
          setTimeout(() => {
            getData()
          }, 1000);
      },[count]);

    //   function useForceUpdate(){
    //     const [value, setValue] = useState(0); // integer state
    //     return () => setValue(value => value + 1); // update the state to force render
    // }
    // const forceUpdate = useForceUpdate();
    const history=useHistory()
    //dispatching method
    const dispatch = useDispatch();
    const  globalSearch = (searchInput:any) => {
        if(searchInput){
            let filteredData = data[page].filter((value:any) => {
                return (
                    value.title.toLowerCase().includes(searchInput.toLowerCase()) || value.created_at.toLowerCase().includes(searchInput.toLowerCase())
                );
            });
            setfilteredData({ filteredData: filteredData });
            setcheck(true)
        } else{
            setcheck(false)    
        }
    };

    return (
        <div>
        <div
         style={{
            width: "65%",
            border: "2px solid red",
            margin: "auto",
            marginBottom: "10px",
          }}>
        <div style={{margin:'auto',padding:'10px'}}>
               <TextField id="outlined-basic" placeholder="Search title or created at.." variant="outlined" onChange={(event:any)=>{
                  globalSearch(event?.target?.value)
               }}/>
        </div>
        <TableContainer component={Paper} data-testid='container-table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">URL</TableCell>
                <TableCell align="left">Created_At</TableCell>
                <TableCell align="left">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              (filteredData?.length !==0 && check)?( 
                filteredData?.filteredData?.map( (datas:any,index:any)=> {
                return(
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => {
                        dispatch(GET_DATA(datas)) 
                       
                          history.push("/info")
                       
                      }}
                    >
                      <TableCell align="left" key={index+datas.title}>{datas.title}</TableCell>
                      <TableCell align="left" key={index+datas.url}>{datas.url}</TableCell>
                      <TableCell align="left" key={index+datas.created_at}>{datas.created_at}</TableCell>
                      <TableCell align="left" key={index+datas.author}>{datas.author}</TableCell>
                    </TableRow>
                    )
              })):(
                data[page]?.map((datas:any,index:any) => {
                    return(
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => {
                        dispatch(GET_DATA(datas)) 
                       
                          history.push("/info")
                       
                      }}
                    >
                      <TableCell align="left" key={index+datas.title}>{datas.title}</TableCell>
                      <TableCell align="left" key={index+datas.url}>{datas.url}</TableCell>
                      <TableCell align="left" key={index+datas.created_at}>{datas.created_at}</TableCell>
                      <TableCell align="left" key={index+datas.author}>{datas.author}</TableCell>
                    </TableRow>
                    )
                })
              )
              
              }
            </TableBody>
          </Table>
        </TableContainer>
        </div>
           <div style={{ width: "65%", margin: "auto", marginBottom: "10px" }}>
           <Stack spacing={2}>
             <Pagination
               count={count}
               color="secondary"
               onClick={(e: any) => {
                 setpage(Number(e.target.outerText));
               }}
             />
           </Stack>
         </div>
         </div>
      );
}