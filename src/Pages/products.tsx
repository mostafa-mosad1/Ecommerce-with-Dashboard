/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetproductsQuery } from "../app/service/getProducts";
import { Iproduct } from "../interface";

import { useDispatch } from "react-redux";
import { addPeoductsToCart } from "../app/feature/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BaseUrl } from "../App";

function Products() {
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const { isLoading, data } = useGetproductsQuery(1);

  const borderColor = useColorModeValue("black", "white");
  if (isLoading) return <p>loading........</p>;


  return (
    <>
      <Grid
        mt={4}
        px={"20px"}
        templateColumns="repeat(auto-fill,minmax(300px,1fr))"
        mx={"auto"}
        gap={4}
      >
        {data.data.map((product: Iproduct) => (
          <Card
            cursor={"pointer"}
            key={product.id}
            border={`1px solid ${borderColor}`}
            p={2}
            mx={"auto"}
            rounded={"md"}
            maxW="sm"
          >
            <CardBody
              onClick={() => {
                navgate(`/singleProduct/${product.id}`);
              }}
            >
              <Image
                mx={"auto"}
                sx={{ rounded: "full", width: "200px", height: "200px" }}
                src={`${BaseUrl}${product.attributes.thumbnail.data[0].attributes.url}`}
                alt="Product Image"
                borderRadius="lg"
              />
              <Stack mt="1" ps={"10px"}>
                <Heading as={Flex} fontSize={"2xl"} size="md">
                  <Text fontSize={"25px"} fontWeight={"bold"} color="blue.600">
                    Brand:
                  </Text>
                  <Text ps={1}>{product.attributes.title}</Text>
                </Heading>
                <Heading as={Flex} fontSize={"2xl"} size="md">
                  <Text fontSize={"25px"} fontWeight={"bold"} color="blue.600">
                    Price:
                  </Text>
                  <Text ps={1}>{product.attributes.price} $</Text>
                </Heading>
                <Heading as={Flex} fontSize={"2xl"} size="md">
                  <Text fontSize={"25px"} fontWeight={"bold"} color="blue.600">
                    Category:
                  </Text>
                  <Text ps={1}>
                    {product.attributes?.category?.data?.attributes.title}
                  </Text>
                </Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter
              onClick={() => {
                dispatch(addPeoductsToCart(product));
                toast.success("Add To Cart Successfully!");
              }}
              mx={"auto"}
            >
              <ButtonGroup spacing="2">
                <Button
                  w={80}
                  variant="solid"
                  bg={"blue.600"}
                  textColor={"white"}
                  fontSize={"20px"}
                  my={2}
                  colorScheme="blue"
                >
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default Products;
