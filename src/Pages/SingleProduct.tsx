import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../app/service/getProducts";
import { Iproduct } from "../interface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { addPeoductsToCart } from "../app/feature/CartSlice";
import toast from "react-hot-toast";
import { BaseUrl } from "../App";

function SingleProduct() {
  const { id } = useParams();
  const { isLoading, data } = useGetSingleProductQuery(id);
  const dispatch = useDispatch();
  const navgate = useNavigate();
  if (isLoading) return <p>loading..............</p>;
  const Product = data.data as Iproduct;

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };


  const allImages = Product.attributes.thumbnail.data.map(
    (item: any, index: number) => (
      <div key={index}>
        <Image
          mx={"auto"}
          w={"100wh"}
          src={`${BaseUrl}${item?.attributes?.url}`}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
      </div>
    )
  );

  console.log(data);
console.log(Product.attributes.thumbnail.data[0].attributes.url)
  return (
    <>
      <Heading
        position={"relative"}
        as={Flex}
        justifyContent={"center"}
        mx={"auto"}
        my={2}
        textTransform={"capitalize"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        size="md"
      >
        <Box
          cursor={"pointer"}
          _hover={{ color: "red" }}
          onClick={() => navgate(-1)}
          position={"absolute"}
          top={0}
          right={0}
          px={"30px"}
        >
          x
        </Box>
        <Text color="blue.600" fontWeight={"bold"}>
          Title :
        </Text>
        <Text ps={1}>{Product.attributes.title} </Text>
      </Heading>

      <Card p={2} mx={"auto"} maxW="4xl">
        <CardBody>
          {
            Product.attributes.thumbnail.data.length <= 1 ?
            <Image
            style={{margin:"auto"}}
            src={`${BaseUrl}${Product.attributes.thumbnail.data[0].attributes.url}`}
            />:
            <Slider {...settings}>{allImages}</Slider> 
          }

          <Stack mt="1" ps={"10px"}>
            <Text ps={1} fontSize={"30px"} fontWeight={"bold"} color="blue.600">
              Description
            </Text>
            <Text fontSize={"22px"}>{Product.attributes.descrption}</Text>
            <Flex flexWrap={"wrap"} justifyContent={"space-between"} my={4}>
              <Heading as={Flex} fontSize={"2xl"} size="md">
                <Text color="blue.600" fontWeight={"bold"}>
                  Price :
                </Text>
                <Text ps={1}>{Product.attributes.price} $</Text>
              </Heading>
              <Heading as={Flex} fontSize={"2xl"} size="md">
                <Text color="blue.600" fontWeight={"bold"}>
                  Category :
                </Text>
                <Text ps={1}>
                  {Product.attributes?.category?.data?.attributes?.title}
                </Text>
              </Heading>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter mx={"auto"}>
          <ButtonGroup spacing="2">
            <Button
              onClick={() => {
                //   dispatch(addPeoductsToCart(product!));
                dispatch(addPeoductsToCart(Product));
                toast.success("Add To Cart Successfully!");
                console.log("add to cart");
              }}
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
    </>
  );
}

export default SingleProduct;
