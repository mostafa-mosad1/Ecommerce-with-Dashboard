/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useLoginAuthMutation } from "../app/service/LoginSlice";
import cookies from "../Cookies/cookies";
import toast from 'react-hot-toast';

export default function Login() {
  const [ALLInputs, setAllInputs] = useState({
    identifier: "",
    password: "",
  });

const navgate = useNavigate()

  const Time = new Date();
  const InDays = 3;
  const hours = 1000 * 60 * 60 * 24 * InDays;
  Time.setTime(Time.getTime() + hours);

  const [destoryFunction, { isLoading, data, isSuccess }] =
    useLoginAuthMutation();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAllInputs({
      ...ALLInputs,
      [name]: value,
    });
  };
  const onSubmitHandler = () => {
    destoryFunction(ALLInputs);
  };

  if (isLoading) return <p>loading...........</p>;

  if (isSuccess) {
    navgate("/LayoutDashboard")
    cookies.set("jwt", data.jwt, { path: "/", expires: Time });
    toast.success('Successfully!')
  }

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as={Form} spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="identifier"
                value={ALLInputs.identifier}
                onChange={onChangeHandler}
                bg={"inherit"}
                border={"2px solid white"}
                ps={"10px"}
                rounded={"md"}
                _hover={{
                  border: "2px solid #4299E1",
                }}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={ALLInputs.password}
                onChange={onChangeHandler}
                bg={"inherit"}
                border={"2px solid white"}
                ps={"10px"}
                rounded={"md"}
                _hover={{
                  border: "2px solid #4299E1",
                }}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  onSubmitHandler();
                }}
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
