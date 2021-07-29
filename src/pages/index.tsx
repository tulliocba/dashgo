import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"


type SignInputData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Password é obrigatório.'),
});

export default function Home() {

  const { register, handleSubmit, formState } = useForm(
    { resolver: yupResolver(signInFormSchema) }
  );

  const handleSignIn: SubmitHandler<SignInputData> = async (inputs) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    console.log(inputs);
  }


  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        backgroundColor="gray.800"
        padding="8"
        borderRadius="8"
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}>

        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')} />
          <Input
            name="password"
            label="Password"
            type="password"
            error={formState.errors.password}
            {...register('password')} />
        </Stack>
        <Button
          type="submit"
          marginTop="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
