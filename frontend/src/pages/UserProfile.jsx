import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      console.log("Hello");
      try {
        const response = await axios.get('http://localhost:3000/api/v1/auth/UserProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Profile</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-lg">
          <strong>Name:</strong> {profile.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
