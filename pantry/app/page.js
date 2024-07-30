"use client"
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Modal } from "@mui/material";
import {firestore} from '@/firebase'
import {collection} from 'firebase/firestore'
import {getDocs, query} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "white",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Button 
        variant="contained" onClick={handleOpen}
      >

        Add
      </Button>
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
