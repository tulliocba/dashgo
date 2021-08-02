import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/QueryClient";
import { useRouter } from "next/router";

type CreateUserInputData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório.'),
    email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
    password: yup.string().required('Senha é obrigatório.').min(6, 'No mínimo 6 caracteres.'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As precisam ser iguais.')
        .required('Confirmação da senha é obrigatório.').min(6, 'No mínimo 6 caracteres.')
});

export default function CreateUser() {

    const router = useRouter();

    const createUser = useMutation(async (user: CreateUserInputData) => {
        const response = await api.post('/users', {
            user: {
                ...user,
                created_at: new Date()
            }
        });

        console.log(response.data.user);

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const handleCreateUser: SubmitHandler<CreateUserInputData> = async (inputs) => {
        await createUser.mutateAsync(inputs);
        router.push('/users');
    }


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box as="form" flex="1" borderRadius={8} bg="gray.800" padding={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                            <Input
                                name="name"
                                label="Nome completo"
                                error={formState.errors.name}
                                {...register('name')} />
                            <Input
                                name="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register('email')} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register('password')} />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da Senha"
                                error={formState.errors.password_confirmation}
                                {...register('password_confirmation')} />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button
                                    as="a"
                                    colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                colorScheme="pink"
                                type="submit"
                                isLoading={formState.isSubmitting}>
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}