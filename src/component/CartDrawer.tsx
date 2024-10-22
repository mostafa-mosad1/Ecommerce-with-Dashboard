import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ClearCart, deletePeoductsToCart } from "../app/feature/CartSlice";
import { BaseUrl } from "../App";

export default function DrawerExample() {
  const { isLoading, CartItems } = useSelector(
    (state: RootState) => state.Cart
  );
  const dispatch = useDispatch();

  const borderColor = useColorModeValue("black", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const drawerBg = useColorModeValue("gray.100", "gray.700");

  const drawerWidth = useBreakpointValue({
    base: "50%", // 50% على الشاشات الصغيرة (مثل الهواتف)
    lg: "35%", // 30% على الشاشات الكبيرة
  });

  if (isLoading) return <p>Loading........</p>;
  //   console.log(CartItems);

  const allProducts = CartItems.map((item) => (
    <Box
      key={item.id}
      px={5}
      my={5}
      mx={2}
      display={"flex"}
      border={`2px solid ${borderColor}`}
      justifyContent={"space-around"}
      textAlign={"center"}
      justifyItems={"baseline"}
    >
      <Image
        w={"80px"}
        h={"60px"}
        my={"8px"}
        rounded={""}
        src={`${BaseUrl}${item.attributes.thumbnail.data[0].attributes.url}`}
      />
      <Text textAlign={"center"} fontWeight={"bold"}>
        {item.attributes.title}
      </Text>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        justifyItems={"center"}
        flexDir={"column"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          justifyItems={"center"}
        >
          <Text textAlign={"center"} fontWeight={"bold"}>
            {item.attributes.price} $
          </Text>
        </Box>
        <Box>
          <Button
            onClick={() => {
              dispatch(deletePeoductsToCart(item.id));
              console.log(item.id);
            }}
            bg={"red.400"}
            _hover={{ background: "red.600" }}
            mb={"5px"}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <>
      <Button
        ref={btnRef}
        bg={"blue.300"}
        color={"white"}
        colorScheme="cyan"
        onClick={onOpen}
      >
        Cart {CartItems.length}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBg} w={drawerWidth} maxW={drawerWidth}>
          <DrawerCloseButton p={5} ms={"auto"} />
          <Box overflowY={"scroll"}>
            {allProducts.length == 0 ? (
              <Text textAlign={"center"} fontSize={"30px"} fontWeight={"bold"}>
                Cart is empty
              </Text>
            ) : (
              allProducts
            )}
          </Box>
          <Button onClick={() => dispatch(ClearCart())}>Clear All Cart</Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}
