import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuth } from "@/store/slices/authSlice";
import { resetStore } from "@/store/slices/productSlice";
import { useLoginMutation } from "../../services/userApi";
import { setAuthTokens, setUser } from "../../store/slices/authSlice";
import { UserType } from "@/utils/types";
import { sanitizeEmail, sanitizeText } from "@/utils/sanitize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
  access: string;
  refresh: string;
  user: UserType;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postLoginData] = useLoginMutation();

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Handle login logic
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setMessage("");

    // Sanitize inputs before sending to API
    const sanitizedEmail = sanitizeEmail(data.email);
    const sanitizedPassword = sanitizeText(data.password);

    // Validate sanitized email
    if (!sanitizedEmail) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", sanitizedEmail);
    formData.append("password", sanitizedPassword);
    const response = await postLoginData(formData);

    // Check if the response is successful or not and process accordingly
    if ("data" in response && response.data) {
      const { access, refresh, user } = response.data as LoginResponse;
      dispatch(resetAuth()); // Clear previous user session completely
      dispatch(resetStore()); // Reset product store
      dispatch(setAuthTokens({ access, refresh }));
      dispatch(setUser(user));
      reset();
      navigate("/");
    }
    if ("error" in response && response.error) {
      setMessage("Incorrect email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="superLian" src={logo} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register("email")}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-cyan-600 hover:text-cyan-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password")}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {message && <div className="text-sm text-red-500">{message}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
