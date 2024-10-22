import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../app/service/getCategoies";
import { ICategoryResponse } from "../../interface";
import { Grid } from "@chakra-ui/react";


function Categories() {
    const borderColor = useColorModeValue("black", "white");
  const { isLoading, data, error } = useGetCategoriesQuery(0);

  console.log(isLoading);
  console.log(data);
  console.log(error);

  if (isLoading) return <i style={{fontSize:"100px",marginTop:"100px",marginInline:"50%"}} className="fa-solid spinner fa-spinner"></i>;

  const AllCategories = data.data.map((item: ICategoryResponse) => (
    <Box _hover={{bg:"white", color:"black"}} fontWeight={"bold"} letterSpacing={"2px"} fontSize={"22px"} border={`2px solid ${borderColor}`} rounded={"md"} p={4} key={item.id}>{item.attributes?.title}</Box>
  ));

  return (
    <>
      
      <Heading as={"h1"} fontSize={"30px"} fontWeight={"bold"} letterSpacing={"2px"} my={5} >All Categories</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {AllCategories}
      </Grid>
    </>
  );
}

export default Categories;
