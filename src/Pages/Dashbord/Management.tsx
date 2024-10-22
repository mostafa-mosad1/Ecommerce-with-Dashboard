import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  SkeletonText,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import {
  useDeleteProductMutation,
  useGetproductsQuery,
  useUpdateProductMutation,
} from "../../app/service/getProducts";

import AlertDialogg from "../../component/AlertDialog";
import UpateDialog from "../../component/UpdateDialog";
import { IAttributes, Iproduct } from "./../../interface/index";
import { ChangeEvent, useState } from "react";

function Management() {
  // requests
  const { isLoading, data } = useGetproductsQuery(1);
  const [
    destoryProduct,
    // {
    //   isLoading: destoryLoading,
    //   data: destoryData,
    //   isSuccess: destorySuccess,
    //   error: destoryError,
    // },
  ] = useDeleteProductMutation();

  const [UpdateProductFunction] = useUpdateProductMutation();

  // State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOp, onOpen: onOP, onClose: OnCl } = useDisclosure();

  // useStae
  const [holdId, setHoldId] = useState(0);
  const [ProductDetails, setProductDetails] = useState<IAttributes>();
  const [thumbnail, setThumbnail] = useState();

  if (isLoading)
    return (
      <TableContainer>
        <Table
          style={{ width: "100%", height: "100vh" }}
          overflow={"hidden"}
          variant="striped"
          colorScheme="teal"
        >
          <TableCaption>Product Information</TableCaption>
          <Thead bg={"red"}>
            <Tr>
              <Th>id</Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Stock</Th>
              <Th isNumeric>Quantity</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 20 }, (_, index) => (
              <Tr textAlign={"center"} key={index}>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
                <Td>
                  <SkeletonText
                    mt="4"
                    bg={"gray.400"}
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );

  // onHandlers

  const onChangeHandlers = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProductDetails({
      ...ProductDetails!,
      [name]: value,
    });
  };

  const onThumbnailChange = (e: any) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <>
      <TableContainer>
        <Table
          style={{ width: "100%", height: "100vh" }}
          overflow={"scroll"}
          variant="striped"
          colorScheme="teal"
        >
          <TableCaption>Product Information</TableCaption>
          <Thead bg={"red"}>
            <Tr>
              <Th>id</Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Stock</Th>
              <Th isNumeric>Quantity</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody >
            {data.data.map((product: Iproduct, index: number) => (
              <Tr textAlign={"center"}  key={index}>
                <Td>{product.id}</Td>
                <Td>{product.attributes.title}</Td>
                <Td>{product.attributes.price}</Td>
                <Td>{product.attributes.category?.data?.attributes?.title}</Td>
                <Td>{product.attributes.stock}</Td>
                <Td isNumeric>2</Td>
                <Td>
                  {product.attributes.thumbnail.data != null ? (
                    <Image
                      display={"block"}
                      mx={"auto"}
                      rounded={"full"}
                      boxSize="80px"
                      
                      src={`${product.attributes.thumbnail.data[0].attributes.url}`}
                      alt={product.attributes.title}
                    />
                  ) : (
                    ""
                  )}
                </Td>
                <Td
                  sx={{
                    mx: "auto",
                    mt: "50",
                  }}
                >
                  <Button
                    onClick={() => {
                      onOP();
                      setProductDetails(product.attributes);
                      setHoldId(product.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    mx={2}
                    bg={"red.800"}
                    _hover={{ bg: "red.500" }}
                    onClick={() => {
                      console.log(product?.attributes?.thumbnail?.data?.attributes?.url)
                      console.log(product.attributes.thumbnail.data[0].attributes.url);
                      onOpen();
                      setHoldId(product.id);
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <UpateDialog isOpen={isOp} onClose={OnCl} onOpen={onOP}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(ProductDetails);

            const formData = new FormData();

            formData.append(
              "data",
              JSON.stringify({
                title: ProductDetails?.title,
                price: ProductDetails?.price,
                description: ProductDetails?.descrption,
                stock: ProductDetails?.stock,
              })
            );
            formData.append("files.thumbnail", thumbnail!);

            UpdateProductFunction({
              id: holdId,
              data: formData,
            });
          }}
        >
          <div key={"title"} style={{ margin: "20px" }}>
            <label
              htmlFor="title"
              style={{
                display: "block",
                width: "120px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "start",
                marginRight: "10px",
              }}
            >
              Title:
            </label>
            <input
              value={ProductDetails?.title}
              onChange={onChangeHandlers}
              id="title"
              name="title"
              type="text"
              style={{
                background: "white",
                color: "black",
                font: "50px",
                display: "inline-block",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid black",
                width: "100%",
              }}
            />
          </div>
          <div key={"price"} style={{ margin: "20px" }}>
            <label
              htmlFor="price"
              style={{
                display: "block",
                width: "120px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "start",
                marginRight: "10px",
              }}
            >
              Price:
            </label>
            <input
              value={ProductDetails?.price}
              onChange={onChangeHandlers}
              id="price"
              name="price"
              type="number"
              style={{
                background: "white",
                color: "black",
                font: "50px",
                display: "inline-block",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid black",
                width: "100%",
              }}
            />
          </div>
          <div key={"stock"} style={{ margin: "20px" }}>
            <label
              htmlFor="stock"
              style={{
                display: "block",
                width: "120px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "start",
                marginRight: "10px",
              }}
            >
              stock :
            </label>
            <input
              value={ProductDetails?.stock}
              onChange={onChangeHandlers}
              id="stock"
              name="stock"
              type="number"
              style={{
                background: "white",
                color: "black",
                font: "50px",
                display: "inline-block",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid black",
                width: "100%",
              }}
            />
          </div>
          <div key={"Thumbnail"} style={{ margin: "20px" }}>
            <label
              htmlFor="Thumbnail"
              style={{
                display: "block",
                width: "120px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "start",
                marginRight: "10px",
              }}
            >
              Image :
            </label>
            <input
              onChange={onThumbnailChange}
              id="Thumbnail"
              name="Thumbnail"
              type="file"
              style={{
                background: "white",
                color: "black",
                font: "50px",
                display: "inline-block",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid black",
                width: "100%",
              }}
            />
          </div>
          <div key={"description"} style={{ margin: "20px" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                width: "120px",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "start",
                marginRight: "10px",
              }}
            >
              Description :-
            </label>
            <textarea
              onChange={onChangeHandlers}
              value={ProductDetails?.descrption}
              id="description"
              name="description"
              rows={6}
              style={{
                background: "white",
                color: "black",
                font: "50px",
                display: "inline-block",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid black",
                width: "100%",
              }}
            />
          </div>
          <div>
            <Box display={"flex"} gap={4}>
              <Button
                onClick={() => OnCl()}
                _hover={{ bg: "red", color: "white" }}
                w={"50%"}
                mx={"auto"}
                display="block"
                type="button"
              >
                No
              </Button>
              <Button
                onClick={() => OnCl()}
                _hover={{ bg: "green", color: "white" }}
                w={"50%"}
                mx={"auto"}
                display="block"
                type="submit"
              >
                Save
              </Button>
            </Box>
          </div>
        </form>
      </UpateDialog>

      <AlertDialogg
        destoryProduct={destoryProduct}
        id={holdId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Management;
