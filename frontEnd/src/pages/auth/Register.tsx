import logo from "../../assets/logo.svg";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuth } from "@/store/slices/authSlice";
import { resetStore } from "@/store/slices/productSlice";
import {
  useRegisterMutation,
  useLoginMutation,
  useCreateCurrentUserProfileMutation,
} from "@/services/userApi";
import { setAuthTokens, setUser } from "@/store/slices/authSlice";
import { useState } from "react";
import { UserType } from "@/utils/types";
import { sanitizeEmail, sanitizeText } from "@/utils/sanitize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod validation schema
const registerSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  billingAddress: z.string().min(5, "Billing address must be at least 5 characters"),
  shippingAddress: z.string().min(5, "Shipping address must be at least 5 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface LoginResponse {
  access: string;
  refresh: string;
  user: UserType;
}

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [registerUser] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [createUserProfile] = useCreateCurrentUserProfileMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Handle registration logic
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setMessage("");

    // Sanitize all inputs before sending to API
    const sanitizedEmail = sanitizeEmail(data.email);
    const sanitizedPassword = sanitizeText(data.password);
    const sanitizedUserName = sanitizeText(data.userName);
    const sanitizedFirstName = sanitizeText(data.firstName);
    const sanitizedLastName = sanitizeText(data.lastName);
    const sanitizedBillingAddress = sanitizeText(data.billingAddress);
    const sanitizedShippingAddress = sanitizeText(data.shippingAddress);

    // Validate sanitized email
    if (!sanitizedEmail) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", sanitizedUserName);
    formData.append("email", sanitizedEmail);
    formData.append("password", sanitizedPassword);
    formData.append("first_name", sanitizedFirstName);
    formData.append("last_name", sanitizedLastName);

    const response = await registerUser(formData);

    if ("data" in response && response.data) {
      // Success! Clear form and login
      reset();

      const loginResponse = await login(formData);
      if ("data" in loginResponse && loginResponse.data) {
        const { access, refresh, user } = loginResponse.data as LoginResponse;
        dispatch(resetAuth()); // Clear previous user session completely
        dispatch(resetStore()); // Reset product store
        dispatch(setAuthTokens({ access, refresh }));
        dispatch(setUser(user));

        // Create user profile
        const profileResponse = await createUserProfile({
          user: user.id,
          first_name: sanitizedFirstName,
          last_name: sanitizedLastName,
          billing_address: sanitizedBillingAddress,
          shipping_address: sanitizedShippingAddress,
          phone_number: "0000000000", // Placeholder, should be updated by user if needed
        });

        if ("data" in profileResponse) {
          navigate("/");
        } else {
          setMessage("Profile creation failed.");
        }
      }
    } else if ("error" in response && response.error) {
      // Type guard: check if error has a 'data' field
      if (
        typeof response.error === "object" &&
        response.error !== null &&
        "data" in response.error
      ) {
        const errors = (response.error as { data: any }).data;

        // Flatten the errors into a string for display
        const messages = Object.entries(errors)
          .map(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              return `${field}: ${msgs.join(" ")}`;
            }
            return `${field}: ${msgs}`;
          })
          .join("\n");

        setMessage(messages);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }

    setLoading(false);
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                type="text"
                {...register("userName")}
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.userName && (
              <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
            )}
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
                type="text"
                {...register("firstName")}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
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
                type="text"
                {...register("lastName")}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
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
                type="text"
                {...register("billingAddress")}
                autoComplete="address-line1"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.billingAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.billingAddress.message}</p>
            )}
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
                type="text"
                {...register("shippingAddress")}
                autoComplete="address-line2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>
            {errors.shippingAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.shippingAddress.message}</p>
            )}
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
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password")}
                autoComplete="new-password"
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
