import { useState, useEffect } from "react";
import {
  usePatchCurrentUserProfileMutation,
  useGetCurrrentUserProfileQuery,
} from "@/services/userApi";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/store/slices/authSlice";

interface UserProfileType {
  id: number;
  lastName: string;
  firstName: string;
  shippingAddress: string;
  billingAddress: string;
  phoneNumber: string;
  user: number;
}

const initialState: UserProfileType = {
  id: 0,
  firstName: "",
  lastName: "",
  shippingAddress: "",
  billingAddress: "",
  phoneNumber: "",
  user: 0,
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    data: userProfileData,
    error,
    isLoading,
  } = useGetCurrrentUserProfileQuery({});
  const [profile, setProfile] = useState<UserProfileType>(initialState);
  const [updateProfile] = usePatchCurrentUserProfileMutation();

  useEffect(() => {
    if (userProfileData && userProfileData.length > 0) {
      console.log("It met requirement");
      const profile = userProfileData[0];
      console.log("profile", profile);
      setProfile({
        id: profile.id || 0,
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        shippingAddress: profile.shipping_address || "",
        billingAddress: profile.billing_address || "",
        phoneNumber: profile.phone_number || "",
        user: profile.user || 0,
      });
      dispatch(setUserProfile(profile));
    }
  }, [userProfileData, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateProfile({
        id: profile.id,
        data: profile,
      }).unwrap();
      console.log("Profile updated:", response);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (isLoading)
    return (
      <p className="mt-10 text-center text-gray-500">Loading profile...</p>
    );
  if (error)
    return (
      <p className="mt-10 text-center text-red-500">Failed to load profile.</p>
    );

  console.log("profile", profile);
  console.log("userProfileData", userProfileData[0]);
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Billing Address", name: "billingAddress" },
          { label: "Shipping Address", name: "shippingAddress" },
          { label: "Phone Number", name: "phoneNumber" },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={profile[field.name as keyof UserProfileType] || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-2 text-white transition hover:bg-cyan-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
