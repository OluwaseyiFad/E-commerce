import { useState, useEffect } from "react";
import { usePatchCurrentUserProfileMutation } from "@/services/userApi";
import { useAppDispatch } from "@/utils/hooks";
import { useGetCurrrentUserProfileQuery } from "@/services/userApi";
import { setUserProfile } from "@/store/slices/authSlice";
import { UserProfileType } from "@/utils/types";
import { al } from "node_modules/react-router/dist/development/route-data-CGHGzi13.d.mts";

const initialState: UserProfileType = {
  id: 0,
  first_name: "",
  last_name: "",
  shipping_address: "",
  billing_address: "",
  phone_number: "",
  user: 0,
};

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<UserProfileType>(initialState);
  const {
    data: userProfileData,
    isLoading,
    error,
  } = useGetCurrrentUserProfileQuery({});
  const [updateProfile] = usePatchCurrentUserProfileMutation();

  useEffect(() => {
    // If userProfileData is available, update the profile state
    if (userProfileData) {
      setProfile({
        id: userProfileData.id || 0,
        first_name: userProfileData.first_name || "",
        last_name: userProfileData.last_name || "",
        shipping_address: userProfileData.shipping_address || "",
        billing_address: userProfileData.billing_address || "",
        phone_number: userProfileData.phone_number || "",
        user: userProfileData.user || 0,
      });
    }
  }, [userProfileData, dispatch]);

  // Handle input changes for profile fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await updateProfile({
        id: profile.id,
        data: profile,
      }).unwrap();
      dispatch(setUserProfile(response)); // Update the Redux store with the new profile data
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );
  if (error) {
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No Profile found!</strong>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Edit Profile
      </h1>
      {/* Form to update user profile */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "First Name", name: "first_name" },
          { label: "Last Name", name: "last_name" },
          { label: "Billing Address", name: "billing_address" },
          { label: "Shipping Address", name: "shipping_address" },
          { label: "Phone Number", name: "phone_number" },
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
