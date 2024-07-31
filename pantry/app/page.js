"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection } from "firebase/firestore";
import { getDocs, query, setDoc, doc, deleteDoc, getDoc, docSnap } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "flex",
  flexDirection: "column",
};

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState("");

  const [pantry, setPantry] = useState([]);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      console.log(doc.id);
      // Add items to the pantry here
      pantryList.push({name: doc.id,...doc.data()});
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    if (item.trim()) {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()){
        const {count} = docSnap.data()
        await setDoc(docRef, {count:count+1})
  
      }
      else{
        await setDoc(docRef, {count:1});
        await updatePantry(); // Refresh the pantry items after adding a new item
      }
      
    } else {
      console.error("Item name cannot be empty");
      
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    //remove the item from the pantry
    const docRef = doc(collection(firestore, "pantry"), item);

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count ==1){
        await deleteDoc(docRef)
      } else{
        await setDoc(docRef, {count:count-1})
      }
      updatePantry(); //

      }
    // Refresh the pantry items after removing an item
  };
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
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Box
        border={"1px solid black"}
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
          {pantry.map(({name, count}) => (

            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent={"space-between"}
              paddingX = {5}
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
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>

              <Typography
                variant="h3"
                color = "333"
                textAlign= "center"
                justifyContent={"center"}
              >
                Quantity: {count}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  removeItem(name);
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
