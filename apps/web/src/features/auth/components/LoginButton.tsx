import { Button } from "components/ui/Button";
import { useWeb3Auth } from "providers/Web3AuthProvider";
import { useEffect } from "react";

export const LoginButton = () => {
  const { login, logout, user } = useWeb3Auth();
  console.log("user", user);
  if (user) return <Button onClick={logout}>Logout</Button>;
  return <Button onClick={login}>Login</Button>;
};
