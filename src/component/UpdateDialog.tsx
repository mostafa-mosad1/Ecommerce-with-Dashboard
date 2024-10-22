import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Iprops {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
}

export default function UpateDialog({ onClose, isOpen, children }: Iprops) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const { colorMode } = useColorMode();

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
            my={50}
            mx={"auto"}
            
            py={5}
            bg={colorMode === "dark" ? "gray.700" : "gray.200"}
            color={colorMode === "dark" ? "white" : "black"}
            overflowY={"scroll"}
          >
            <AlertDialogCloseButton
              position={"absolute"}
              right={0}
              top={0}
              p={5}
              _hover={{ color: "red" }}
            />
            <AlertDialogBody>{children}</AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
