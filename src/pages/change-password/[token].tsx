import { Button, FormControl } from "@chakra-ui/core";
import { Form, Formik } from "formik";

import HomeLayout from "../../components/HomeLayout";
import { FormInput } from "../../components/Form/FormInput";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../util/toErrorMap";

import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../util/createUrqlClient";
import { NextPage } from "next";
import { useState } from "react";
import { Box } from "@material-ui/core";

const styles = {
  input_style: { borderRadius: "30px" },
  input_button: { borderRadius: "30px" },
};

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const [tokenError, setTokenError] = useState("");

  return (
    <HomeLayout>
      <div className="login-welcome">
        <h1 className="login-title">Alteração de Senha: </h1>
        <p>Crie uma nova senha de acesso.</p>
      </div>

      <Formik
        initialValues={{ confirm_password: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (!(values.password === values.confirm_password)) {
            setErrors(
              toErrorMap([
                { field: "password", message: "As senhas não conferem." },
                {
                  field: "confirm_password",
                  message: "As senhas não conferem.",
                },
              ])
            );
          }
          const response = await changePassword({
            token: token,
            password: values.password,
          });
          if (response.data?.changePassword.errors) {
            console.log(toErrorMap(response.data.changePassword.errors));
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              {tokenError ? <Box color="red">{tokenError}</Box> : null}
              <FormInput
                name="confirm_password"
                placeholder="Senha"
                label="Senha"
                type="password"
                style={styles.input_style}
              />
              <FormInput
                name="password"
                placeholder="Confirme sua senha"
                label="Confirme Sua Senha"
                type="password"
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
              Salvar Alterações
            </Button>
          </Form>
        )}
      </Formik>
    </HomeLayout>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
