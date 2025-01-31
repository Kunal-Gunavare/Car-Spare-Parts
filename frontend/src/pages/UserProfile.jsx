import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;
      try {
        const response = await axios.get('https://car-spare-parts-backend.vercel.app/auth/UserProfile', {
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

      <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
      
        <img className='rounded-lg' width={85} height={85} src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />
        <p className="text-lg">
          <strong>{profile.name}</strong> 
        </p>
        <p className="text-lg">
          <strong>{profile.email}</strong> 
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
