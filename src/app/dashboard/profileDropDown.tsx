// components/ProfileDropDown.tsx
import { FunctionComponent } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface ProfileDropDownProps {
  name: string;
  role: string;
}

const ProfileDropDown: FunctionComponent<ProfileDropDownProps> = ({ name, role }) => {
  return (
    <div className="flex items-center">
      <FaUserCircle className="text-4xl text-gray-600 mr-4" /> {/* Use the icon component */}
      <div>
        <h1 className="text-sm font-bold">{name}</h1>
        <span className="block text-sm">{role}</span>
      </div>
    </div>
  );
};

export default ProfileDropDown;
