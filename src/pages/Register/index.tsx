import { Button, FormControl } from "@chakra-ui/core";
import { Form, Formik } from "formik";

import Toast from "./../../components/Toast";
import HomeLayout from "../../components/HomeLayout";
import { FormInput } from "../../components/Form/FormInput";
import { useMutation } from "urql";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../util/toErrorMap";

import { useRouter } from "next/router";

// import logo from "./../assets/image/logo.png";

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <HomeLayout>
      <Formik
        initialValues={{ username: "", password: "", email: "", name: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log({
            username: values.username,
            password: values.password,
            email: values.email,
            name: values.name,
          });

          const response = await register({
            username: values.username,
            password: values.password,
            email: values.email,
            name: values.name,
          });

          if (response.data?.register.errors) {
            console.log(toErrorMap(response.data.register.errors));
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <FormInput name="Nome" placeholder="Nome" label="Nome" />
              <FormInput
                name="email"
                placeholder="E-mail"
                label="E-mail"
                type="email"
              />
              <FormInput
                name="username"
                placeholder="Nome de Usuário"
                label="Nome de Usuário"
              />
              <FormInput
                name="password"
                placeholder="Senha"
                label="Senha"
                type="password"
              />
            </FormControl>

            <Button type="submit" isLoading={isSubmitting}>
              Cadastrar
            </Button>
          </Form>
        )}
      </Formik>
    </HomeLayout>
  );
};

export default Register;
