import {
  Box,
  Flex,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { apiUrl, Service} from "@hex-labs/core";
import axios from "axios";


type Props = {
  user: any;
};
type Hexathon = {
  id: number;
  name: string;
};


// TODO: right now, the UserCard only displays the user's name and email. Create a new modal component <UserModal> that
// pops up when the card is clicked. In this modal, list all the user's information including name, email, phoneNumber,
// and userId. 

// TODO: Explore if you can display the email as a link to the user's email that will open up the user's 
// email client and start a new email to that user. Also explore if you can provide a link to the user's resume.

// TODO: In our database structure, every user has a userId that is unique to them. This is the primary key of the user
// and is referenced in their applications to all of our hexathons. Create a button that when clicked, will retrieve all of
// the hexathons that the user has applied to. You can use the /applications endpoint of the registration service to do this
// and the /hexathons endpoint of the hexathons service to get a list of all the hexathons.

const UserCard: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexathons, setHexathons] = useState<Hexathon[]>([]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        boxShadow="lg"
        height="175px"
        p="4"
        onClick={handleOpenModal}
        cursor="pointer"
        transition="all 0.3s"
        _hover={{
          borderColor: "blue.400",
        }}
      >
        <Flex flexDirection="column" justify="space-between" h="100%">
          <HStack justify="space-between" mb="2">
            <Text fontSize="xl" fontWeight="bold">
              {`${props.user.name.first} ${props.user.name.last}`}
            </Text>
          </HStack>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600">
            {props.user.email}
          </Text>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="2">
              <Text as="span" fontWeight="bold">Name:</Text>{" "}
              {`${props.user.name.first} ${props.user.name.last}`}
            </Text>
            <Text mb="2">
              <Text as="span" fontWeight="bold">Email:</Text> {props.user.email}
            </Text>
            <Text mb="2">
              <Text as="span" fontWeight="bold">Phone Number:</Text>{" "}
              {props.user.phoneNumber}
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">User ID:</Text> {props.user.userId}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="ghost">View Hexathons</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCard;