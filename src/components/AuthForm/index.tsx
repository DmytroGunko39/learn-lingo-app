type AuthFormProps = {
  mode: "login" | "register";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  return <form>{mode}</form>;
};

export default AuthForm;
