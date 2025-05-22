import logo from "../../assets/logo.svg";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from "@/services/userApi";
import { setAuthTokens, setUser } from "@/store/slices/authSlice";
import { useState } from "react";
import { UserType } from "@/utils/types";

interface RegisterFormState {
  userName: string;
  firstName: string;
  lastName: string;
  billingAddress: string;
  shippingAddress: string;
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: UserType;
}

const initialFormState: RegisterFormState = {
  email: "",
  password: "",
  userName: "",
  firstName: "",
  lastName: "",
  billingAddress: "",
  shippingAddress: "",
};

const Register = () => {
  const [formState, setFormState] =
    useState<RegisterFormState>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle regsiter form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleRegister();
    setFormState(initialFormState);
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("username", formState.userName);
    formData.append("email", formState.email);
    formData.append("password", formState.password);
    formData.append("first_name", formState.firstName);
    formData.append("last_name", formState.lastName);
    formData.append("billing_address", formState.billingAddress);
    formData.append("shipping_address", formState.shippingAddress);

    const response = await register(formData);
    if ("data" in response && response.data) {
      console.log("Registration successful", response.data);
      const loginResponse = await login(formData);
      if ("data" in loginResponse && loginResponse.data) {
        const { access, refresh, user } = loginResponse.data as LoginResponse;
        dispatch(setAuthTokens({ access, refresh }));
        dispatch(setUser(user));
        console.log("Login successful", loginResponse.data);
      }
      setLoading(false);
      // Redirect to the home page or any other page
      navigate("/");
    } else if ("error" in response && response.error) {
      console.error("Registration failed", response.error);
      setMessage(JSON.stringify(response.error));
    }
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="superLian" src={logo} className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              User name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                value={formState.userName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formState.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="billingAddress"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Billing address
            </label>
            <div className="mt-2">
              <input
                id="billingAddress"
                name="billingAddress"
                type="text"
                value={formState.billingAddress}
                onChange={handleChange}
                required
                autoComplete="address-line1"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="shippingAddress"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Shipping address
            </label>
            <div className="mt-2">
              <input
                id="shippingAddress"
                name="shippingAddress"
                type="text"
                value={formState.shippingAddress}
                onChange={handleChange}
                required
                autoComplete="address-line2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
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
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
          </div>
          {message && <div className="text-sm text-red-500">{message}</div>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already had an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
