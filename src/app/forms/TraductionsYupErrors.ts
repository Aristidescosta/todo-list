import { setLocale } from "yup";

setLocale({
  mixed: {
    default: "Campo não é válido",
    required: "Campo obrigatório",
  },
  string: {
    email: () => "Email inválido",
    max: ({ max }) => `O campo pode ter no máximo ${max} caracteres`,
    min: ({ min }) => `O campo pode ter no mínimo ${min} caracteres`,
  },
  number: {
    integer: () => "O campo precisa ter um valor inteiro",
    positive: () => "O campo precisa ter um valor inteiro",
    negative: () => "O campo precisa ter um valor inteiro",
  },
});