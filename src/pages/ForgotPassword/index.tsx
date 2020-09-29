import { Button, Flex, FormControl } from "@chakra-ui/core";
import { Form, Formik } from "formik";

import HomeLayout from "../../components/HomeLayout";
import { FormInput } from "../../components/Form/FormInput";
import { toErrorMap } from "../../util/toErrorMap";

import { useRouter } from "next/router";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { Link } from "@chakra-ui/core";
import { createUrqlClient } from "../../util/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Toast from "../../components/Toast";

const styles = {
  input_style: { borderRadius: "30px" },
  input_button: { borderRadius: "30px" },
};

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="login-welcome">
        <h1 className="login-title">Esqueceu sua senha? 🤷‍♂️️ </h1>
        <p>
          Sem problemas, informe seu e-mail e te enviaremos as instruções para
          recupera-la.
        </p>
      </div>

      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword(values);

          if (response.data?.forgotPassword.errors) {
            console.log(toErrorMap(response.data.forgotPassword.errors));
            setErrors(toErrorMap(response.data.forgotPassword.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <FormInput
                name="email"
                placeholder="Email"
                label="Email"
                style={styles.input_style}
              />
            </FormControl>

            <Flex>
              <Button
                style={styles.input_button}
                mt="10px"
                onClick={() => router.push("/Login")}
              >
                Voltar?
              </Button>

              <Button
                type="submit"
                isLoading={isSubmitting}
                style={styles.input_button}
                variantColor="green"
                mt="10px"
              >
                Enviar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>

      <div className="new-user">
        <p>
          Não possui Conta? Se registre em{" "}
          <Link onClick={() => router.push("/Register")}>Cadastro</Link>
        </p>
      </div>
    </HomeLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
