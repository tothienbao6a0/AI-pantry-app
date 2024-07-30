"use client"
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {firestore} from '@/firebase'
import {collection} from 'firebase/firestore'
import {getDocs, query} from 'firebase/firestore'



export default function Home() {
  const [pantry, setPantry] = useState([])
  useEffect(() => {
    const updatePantry = async () => {
    const snapshot = query(collection(firestore,'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      console.log(doc.id)
      // Add items to the pantry here
      pantryList.push(doc.id)
    })
    console.log(pantryList)
    setPantry(pantryList)

  }
  updatePantry()
  }, []);
  return (
    <Box 
      width="100vw"
      height="100vw"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      
      flexDirection={"column"}
    >
      <Box border={"1px solid black"}
        width="800px"
        height="100px"
        bgcolor={"#ADD8E6"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h1" textAlign={"center"}>
          Pantry Items
        </Typography>
      </Box>

      <Box>
        
        <Stack width="800px" height="500px" spacing={2} overflow={"auto"}>
          {pantry.map((i) => (
            <Box
              key={i}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid black"}
              bgcolor={"lightgray"}
            >
              <Typography
                variant="h3"
                component="div"
                textAlign="center"
                style={{ color: "white" }}
              >
                {
                  //Capitalize the first letter of the item
                  i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
            </Box>
          ))}
        
        </Stack>
        </Box>
      </Box>
      
    
    
  );
}
