import { useState, useEffect } from "react";
import { usePatchCurrentUserProfileMutation } from "@/services/userApi";
import { useAppDispatch } from "@/utils/hooks";
import { useGetCurrrentUserProfileQuery } from "@/services/userApi";
import { setUserProfile } from "@/store/slices/authSlice";
import { UserProfileType } from "@/utils/types";

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
  const { data: userProfileData, isLoading } = useGetCurrrentUserProfileQuery(
    {},
  );
  const [updateProfile] = usePatchCurrentUserProfileMutation();

  useEffect(() => {
    console.log("userProfileData", userProfileData);

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
      dispatch(setUserProfile(response));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (isLoading)
    return (
      <p className="mt-10 text-center text-gray-500">Loading profile...</p>
    );

  if (!userProfileData)
    return (
      <p className="mt-10 text-center text-red-500">Failed to load profile.</p>
    );

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Edit Profile
      </h1>

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
