import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../ui/Button";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import RegisterModal from "../components/RegisterModal";
import SectionWithImage from "../components/accueil/SectionWithImage";
import ThemeSwitcher from "../components/theme/ThemeSwitcher";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(null);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  const openRegisterModal = () => {
    document.getElementById("register-modal")?.showModal();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-12">
        <div className=" px-4 lg:px-0">
          <h1 className="text-5xl font-bold mt-16">Bienvenue sur SearchVeto</h1>
          <h1 className="mt-3 text-2xl mb-4">
            Votre plateforme de recherche de cabinet vétérinaire
          </h1>
          <div className="flex md:justify-center">
            <ThemeSwitcher />
          </div>
        </div>
        <SectionWithImage
          imageSrc="/chien-chat-lapin.png"
          title="Votre Allié pour la Santé Animale"
          content={`
          <p>Rejoignez notre communauté de propriétaires d'animaux et découvrez
            une plateforme conçue pour simplifier la gestion de la santé de vos
            animaux de compagnie.</p>
          <br/><p>Avec SearchVeto, bénéficiez d'un accès rapide à des conseils
            vétérinaires, de la prise de rendez-vous simplifiée, et de
            ressources éducatives pour le bien-être de vos compagnons.</p>
          <br/><p> Inscrivez-vous dès maintenant pour accéder à tous nos services et
            prenez soin de vos animaux comme jamais auparavant.</p>
        `}
          buttonLink="#login-div"
          buttonText="Nous rejoindre"
          buttonColor={"btn-primary"}
          buttonIcon={
            <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-primary group-hover:text-primary-content" />
          }
          reverse={true}
          reverseButtonText={true}
        />
      </div>
      <div
        id="login-div"
        className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-12"
      >
        <div
          id="login-form"
          className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100"
        >
          <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-4">Se connecter</h2>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text text-lg">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Votre email..."
                className="input input-bordered text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-control mb-6">
              <label className="label" htmlFor="password">
                <span className="label-text text-lg">Mot de passe</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Votre mot de passe..."
                  className="input input-bordered w-full text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-error">{error}</div>}
            <div className="form-control">
              <Button
                type="submit"
                className="btn-primary w-full text-lg text-base-100"
              >
                Connexion
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p className="mt-1 mb-2 text-lg">
                Vous n&apos;avez pas de compte ?<br />
                Créez-en un en 30 secondes !
              </p>
              <Button
                type="button"
                onClick={openRegisterModal}
                className="btn-secondary mt-2 text-lg text-base-100"
              >
                S&apos;inscrire
              </Button>
            </div>
          </form>
          <RegisterModal />
        </div>
      </div>
    </>
  );
};

export default Login;
