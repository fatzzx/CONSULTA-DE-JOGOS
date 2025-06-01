import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Se já está autenticado, redirecionar para home
    if (isAuthenticated) {
      navigate("/");
    }

    // Verificar se há mensagem vinda do registro
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const userData = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      login(userData);
      navigate("/");
    } catch (error) {
      setErrors({
        submit:
          error.message || "Erro ao fazer login. Verifique suas credenciais.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      {/* Header com Logo */}
      <div className="w-full px-6 py-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 w-fit"
          title="Voltar para a Home"
        >
          <img src="/logoplay.png" alt="Gameworth Logo" className="h-10" />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Faça login na sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Ou{" "}
              <Link
                to="/register"
                className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
              >
                crie uma nova conta
              </Link>
            </p>
          </div>

          {message && (
            <div className="bg-green-900/20 border border-green-500 text-green-400 px-4 py-3 rounded-md">
              {message}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
                {errors.submit}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
