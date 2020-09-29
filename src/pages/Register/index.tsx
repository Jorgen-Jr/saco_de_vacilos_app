import { Button, FormControl } from "@chakra-ui/core";
import { Form, Formik } from "formik";

import HomeLayout from "../../components/HomeLayout";
import { FormInput } from "../../components/Form/FormInput";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../util/toErrorMap";

import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../util/createUrqlClient";

const styles = {
  input_style: { borderRadius: "30px" },
  input_button: { borderRadius: "30px" },
};

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="login-welcome">
        <h1 className="login-title">Registrar</h1>
        <p>Favor inserir seus dados de registro.</p>
      </div>

      <Formik
        initialValues={{ username: "", password: "", email: "", name: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });

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
              <FormInput
                name="username"
                placeholder="Nome de Usuário"
                label="Nome de Usuário"
                style={styles.input_style}
              />
              <FormInput
                name="password"
                placeholder="Senha"
                label="Senha"
                type="password"
                style={styles.input_style}
              />
              <FormInput
                name="name"
                placeholder="Nome"
                label="Nome"
                style={styles.input_style}
              />
              <FormInput
                name="email"
                placeholder="E-mail"
                label="E-mail"
                type="email"
                style={styles.input_style}
              />
            </FormControl>

            <Button
              type="submit"
              isLoading={isSubmitting}
              style={styles.input_button}
              variantColor="green"
              mt="10px"
            >
              Cadastrar
            </Button>
          </Form>
        )}
      </Formik>
    </HomeLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
