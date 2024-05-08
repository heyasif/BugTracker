import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "https://bugtracker-2.onrender.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowModal(true);
      setModalMessage("Registration successful");
    } catch (error) {
      console.log(error);
      setShowModal(true);

      setModalMessage("Registration failed");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div
      className="flex h-[32rem] items-center"
      style={{ backgroundColor: "#3C5B6F", height: "100vh" }}
    >
      <Container>
        <Box
          p={"2rem"}
          bg={"white"}
          borderRadius={10}
          boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        >
          <form onSubmit={handleSubmit}>
            <Heading as={"h1"} color={"#948979 "} textAlign={"center"} mb={4}>
              Register
            </Heading>
            <h3
              style={{
                textAlign: "center",
                fontSize: "28px",
                color: "#948979 ",
              }}
            ></h3>
            <FormControl>
              <Stack spacing={5}>
                <Input
                  type="text"
                  placeholder="Username"
                  border={"1px solid gray"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  border={"1px solid gray"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  border={"1px solid gray"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <Button
                  type="submit"
                  color="#948979 "
                  width="auto"
                  style={{ borderRadius: "40px" }}
                  _hover={{ bg: "#5e618d", color: "white" }}
                >
                  Sign Up
                </Button>

                <Text textAlign={"center"}>
                  Already have an account?{" "}
                  <Text
                    as={Link}
                    to="/login"
                    color="#948979 "
                    fontWeight="bold"
                  >
                    Login
                  </Text>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registration Status</ModalHeader>
            <ModalBody>{modalMessage}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
};

export default Signup;
