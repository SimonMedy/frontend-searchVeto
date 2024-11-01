import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TestAuthRoute = () => {
  const { user, token } = useContext(AuthContext);
  if (!user) {
    return <div>Chargement...</div>;
  }
  return (
    <div>
      <h1>Bienvenue, utilisateur authentifié !</h1>
      <p>Ceci est une page protégée par une route privée.</p>
      <h1>Bienvenue, {user.name}!</h1>
      <h1>Votre email est : {user.email}</h1>
      <h1>Votre token est : {token}</h1>
    </div>
  );
};

export default TestAuthRoute;
