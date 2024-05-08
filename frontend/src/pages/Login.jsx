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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import { loginaction } from "../redux/Actions";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  // const url = useSelector((state) => state.auth.avatar);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  // console.log(url);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(` ${password}  , ${email}`);
    try {
      const response = await axios.post(
        "https://bugtracker-2.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;
        console.log(">>>>>>>>>", auth);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.avatar);

        setShowModal(true);
        setModalMessage("Login successful");
        dispatch(loginaction());

        console.log(auth);
        // setTimeout(() => {
        //   navigate("/tracker");
        // }, 1000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setShowModal(true);
      setModalMessage("Please register yourself");
      console.error("Error:", error);
    }
  };
  console.log(auth);
  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Login successful") {
      navigate("/tracker");
    }
  };
  return (
    <div
      className="flex h-[38rem] items-center"
      style={{ backgroundColor: "#3C5B6F", height: "100vh" }}
    >
      <Container>
        <Box
          p={"2rem"}
          // mt={"0rem"}
          m={"2rem"}
          bg={"white"}
          borderRadius={10}
          boxShadow={
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          }
          style={{ marginBottom: "9rem" }}
        >
          <form onSubmit={handleSubmit}>
            <Heading as={"h1"} color={"#948979"} textAlign={"center"} mb={4}>
              Login
            </Heading>
            <h3
              style={{
                textAlign: "center",
                fontSize: "28px",
                color: "#948979",
              }}
            ></h3>
            <FormControl>
              <Stack spacing={5}>
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
                <Button
                  type="submit"
                  color="#948979"
                  width="full"
                  style={{ borderRadius: "40px" }}
                  _hover={{ bg: "#3C5B6F", color: "white" }}
                >
                  Login
                </Button>

                <Text textAlign={"center"}>
                  Don't have an account?{" "}
                  <Text
                    as={Link}
                    to="/signup"
                    color="#948979"
                    fontWeight="bold"
                  >
                    Signup
                  </Text>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login Status</ModalHeader>
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

export default Login;
