import { getCurrentUser, logout } from '../lib/auth';
import { useLocation } from 'wouter';

export default function Navigation() {
  const user = getCurrentUser();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-steampro-blue rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-steampro-dark">SteamPRO</h1>
              <p className="text-xs text-gray-500">Training Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <div className="w-8 h-8 bg-steampro-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{initials}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
