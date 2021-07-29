import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useQuery } from "react-query";

export default function UserList() {

    const { data, isLoading, isFetching, error } = useQuery('users', async () => await fetch('http://localhost:3000/api/users')
        .then(response => response.json()), { 
            staleTime: 1000 * 5
        });

    const users = data?.users.map(user => ({ 
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }))

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" padding="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários

                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
                        </Heading>

                        <Link href="/users/create" passHref>
                            {isWideVersion ?
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="16"
                                    colorScheme="pink"
                                    leftIcon={<Icon as={RiAddLine} />}
                                >
                                    Criar novo
                                </Button>
                                :
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="16"
                                    colorScheme="pink"
                                    mr="6"
                                >
                                    <Icon as={RiAddLine} />
                                </Button>
                            }

                        </Link>
                    </Flex>
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuários</Th>
                                        {isWideVersion && <Th>Data de Cadastro</Th>}
                                        <Th width="8" />
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map(user => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                    <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && <Td>{user.createdAt}</Td>}
                                            <Td>
                                                {isWideVersion ?
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={<Icon as={RiPencilLine} />}>
                                                        Editar
                                                    </Button>
                                                    :
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple">
                                                        <Icon as={RiPencilLine} />
                                                    </Button>
                                                }
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            <Pagination />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}