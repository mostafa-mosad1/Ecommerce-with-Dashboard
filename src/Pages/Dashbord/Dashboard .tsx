import { Box, Button } from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";
import { useCreateProductMutation } from "../../app/service/getProducts";
import toast from "react-hot-toast";

function Dashboard() {
  const [CreateProduct, { isLoading, isSuccess, data, error }] =
    useCreateProductMutation();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const [thumbnail, setThumbnail] = useState();
  const [category, setCategory] = useState<string>();

  const onChangeHandlers = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({
      ...product!,
      [name]: value,
    });
  };

  const onThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail(e.target.files[0]);
  };

  if (isLoading) return <p>loading .............</p>;
  if (isSuccess) {
    toast.success("Add Done");
  }
  console.log(data);
  console.log(error);

  return (
    <>
      <Box fontSize={"22px"} fontWeight={"bold"} display={"block"} mx={"auto"}>
        Add New Product{" "}
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(product);
          console.log(thumbnail);

          const formData = new FormData();

          formData.append(
            "data",
            JSON.stringify({
              title: product?.title,
              price: product?.price,
              description: product?.description,
              stock: product?.stock,
            })
          );
          formData.append("files.thumbnail", thumbnail!);
          formData.append(
            "category",
            JSON.stringify({ id: 3, title: "shoes" })!
          );

          CreateProduct(formData);
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
            value={product?.title}
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
            value={product?.price}
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
            value={product?.stock}
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
            value={product?.description}
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

        {/* <div style={{ margin: "20px" }}>
          <label
            htmlFor="category"
            style={{
              display: "block",
              width: "120px",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "start",
              marginRight: "10px",
            }}
          >
            category:
          </label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);

              console.log(e.target.value);
            }}
            id="category"
            name={"category"}
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
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}
        <div>
          <Box display={"flex"} gap={4}>
            <Button
              _hover={{ bg: "red", color: "white" }}
              w={"50%"}
              mx={"auto"}
              display="block"
              type="button"
            >
              No
            </Button>
            <Button
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

      {/*  */}
    </>
  );
}

export default Dashboard;
