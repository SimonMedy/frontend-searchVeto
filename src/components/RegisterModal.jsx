import { useState, useContext } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { AuthContext } from "../context/AuthContext";
import Button from "../ui/Button";

const RegisterModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setError(null);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <dialog id="register-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[90vh] px-6 pb-2 overflow-y-auto">
        <form method="dialog">
          <Button
            type="button"
            className="btn-circle btn-ghost absolute hover:bg-red-500 hover:text-white right-2 top-2"
            onClick={() => document.getElementById("register-modal")?.close()}
          >
            ✕
          </Button>
        </form>
        <h2 className="text-2xl font-bold">Inscription</h2>
        <form className="py-4" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label" htmlFor="register-name">
              <span className="label-text">Nom d&apos;utilisateur</span>
            </label>
            <input
              type="text"
              id="register-name"
              placeholder="Nom d'utilisateur..."
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label" htmlFor="register-email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="register-email"
              placeholder="Email..."
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label" htmlFor="register-password">
              <span className="label-text">Mot de passe</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                placeholder="Mot de passe..."
                className="input input-bordered w-full"
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
          {error && <div className="text-error mt-4">{error}</div>}
          <div className="modal-action mt-6">
            <Button type="submit" className="btn-accent">
              S&apos;inscrire
            </Button>
            <Button
              type="button"
              className="btn btn-secondary btn-outline"
              onClick={() => document.getElementById("register-modal")?.close()}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RegisterModal;
