/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAuthContext } from "../../../contexts/AuthContext";
import { BiLogoGoogle } from "react-icons/bi";

interface IFormikProps {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { signin } = useAuthContext();
  const TOAST = useToast();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = `${value} Este campo é obrigatório`;
    }
    return error;
  }
  const handleSubmit = async (
    values: IFormikProps,
    actions: FormikHelpers<IFormikProps>
  ) => {
    await signin(values.email, values.password).then(() => {
      actions.setSubmitting(false);
    });
  };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Field name="email" >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>First email</FormLabel>
                  <Input {...field} type="email" placeholder="email"/>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Palavra passe</FormLabel>
                  <Input {...field} placeholder="password" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <HStack>
              <Button
                width="full"
                mt={4}
                colorScheme="facebook"
                leftIcon={<BiLogoGoogle />}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Entrar com a google
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
