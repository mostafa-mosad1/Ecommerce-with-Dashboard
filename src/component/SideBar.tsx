"use client";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { Link, NavLink, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface LinkItemProps {
  name: string;
  icon: ReactNode;
  path: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    path: "",
    icon: (
      <i
        style={{ fontSize: "25px", marginRight: "20px" }}
        className="fa-solid fa-house"
      ></i>
    ),
  },
  {
    name: "Products",
    path: "tabel",
    icon: (
      <i
        style={{ fontSize: "25px", marginRight: "20px" }}
        className="fa-solid fa-table-cells"
      ></i>
    ),
  },
  {
    name: "Categories",
    path: "Categories",
    icon: (
      <i
        style={{ fontSize: "25px", marginRight: "20px" }}
        className="fa-solid fa-layer-group"
      ></i>
    ),
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box display={"flex"} gap={5} ps={4} flexDir={"column"}>
        {LinkItems.map((link) => (
          <NavLink style={{ fontSize: "22px" }} key={link.name} to={link.path}>
            {link.icon} {link.name}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button mx={"15px"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button
          bg={"blue.300"}
          color={"white"}
          colorScheme="cyan"
          as={Link}
          px={2}
          py={1}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("blue.400", "blue.200"),
          }}
          to={"/Home"}
        >
          Log_Out
        </Button>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
