import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/QueryClient";

export default function UserList() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, error } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });

    const handlePreFetchUser = async (userId: string) => {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        }, { 
            staleTime: 1000 * 30, 
        });

    }


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" padding="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários

                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>

                        <NextLink href="/users/create" passHref>
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

                        </NextLink>
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
                                    {data?.users.map(user => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Link color="purple.400" onMouseEnter={() => handlePreFetchUser(user.id)}>
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                    </Link>
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

                            <Pagination
                                totalCountOfRegiters={data?.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}