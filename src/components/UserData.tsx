import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import { Button, SimpleGrid, Text, Center } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

const UserData: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUrl = apiUrl(Service.USERS, '/users/hexlabs');
        const response = await axios.get(myUrl);
        const fetchedUsers = response.data;
        const numberUsers = fetchedUsers.filter((user: any) => user.phoneNumber?.startsWith('470'));
        setUsers(shuffleArray(numberUsers)); //this makes it so that it spawns randomly.
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    document.title = "Hexlabs Users";
    fetchData();
  }, []);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const sortUsers = () => {
    const sortedUsers = [...users].sort((userA, userB) => {
      const nameA = userA.name.first.toLowerCase();
      const nameB = userB.name.first.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    setUsers(sortedUsers);
  };

  return (
    <>
      <Text fontSize="4xl">Hexlabs Users</Text>
      <Text fontSize="2xl">This is an example of a page that makes an API call to the Hexlabs API to get a list of users.</Text>
      <Center>
          <Button onClick={sortUsers}>Sort by First Name</Button>
      </Center>
      <SimpleGrid columns={[2, 3, 5]} spacing={6} padding={10}>
        {users.map((user) => (
          <UserCard key={user.Id} user={user} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserData;
