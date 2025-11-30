import { useAuth } from '../contexts/AuthProvider';
import { User as UserIcon, Mail, Calendar } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 mt-2 capitalize">{user.role}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-md">
            <Mail className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-md">
            <Calendar className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
