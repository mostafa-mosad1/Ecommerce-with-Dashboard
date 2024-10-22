import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
 
interface Iprops{
  destoryProduct:(val:number)=>void
    id:number,
   
    isOpen:boolean, 
    onOpen:() => void, 
    onClose:() => void
}


export default function AlertDialogg({destoryProduct,id,onClose,isOpen}:Iprops) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
  
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AlertDialogContent
            maxW="400px"
            height="50vh"
            mx={"auto"}
            mt={"40vh"}
            p={5}
            bg={"red.400"}
            h={"fit-content"}
          >
            <AlertDialogHeader fontSize={"xl"} >Are You Sure To Delete Product ?</AlertDialogHeader>
            <AlertDialogCloseButton position={"absolute"} right={0} top={0} p={5} _hover={{color:"red"}} />
            <AlertDialogBody>
             d.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button color={"white"} onClick={()=>{
                destoryProduct(id);
                toast.success("Delete Product Successfully!")
                onClose()
             
                toast.error("OOPS error !!!")
              }} colorScheme="red" ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
