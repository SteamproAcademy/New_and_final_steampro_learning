import { useLocation } from 'wouter';
import { type TrainingModule } from '../data/trainingData';
import { getModuleProgress, isModuleUnlocked } from '../lib/progress';

interface ModuleCardProps {
  module: TrainingModule;
  isUnlocked: boolean;
  allModuleIds: string[];
}

export default function ModuleCard({ module, isUnlocked, allModuleIds }: ModuleCardProps) {
  const [, setLocation] = useLocation();
  const progress = getModuleProgress(module.id);

  const handleClick = () => {
    if (isUnlocked) {
      setLocation(`/module/${module.id}`);
    }
  };

  const getStatusIcon = () => {
    if (!isUnlocked) {
      return <i className="fas fa-lock text-gray-400 text-sm"></i>;
    }
    if (progress.quizCompleted) {
      return <i className="fas fa-check text-green-600 text-sm"></i>;
    }
    return <i className="fas fa-play text-steampro-blue text-sm"></i>;
  };

  const getStatusColor = () => {
    if (!isUnlocked) return "bg-gray-100";
    if (progress.quizCompleted) return "bg-green-100";
    return "bg-blue-100";
  };

  return (
    <div 
      className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 ${
        isUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50'
      } transition-colors`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 ${getStatusColor()} rounded-full flex items-center justify-center`}>
          {getStatusIcon()}
        </div>
        <div>
          <p className={`font-medium ${isUnlocked ? 'text-steampro-dark' : 'text-gray-400'}`}>
            {module.title}
          </p>
          <p className={`text-xs ${isUnlocked ? 'text-gray-500' : 'text-gray-400'}`}>
            {module.duration}
          </p>
        </div>
      </div>
      {isUnlocked ? (
        <button className="text-steampro-blue hover:text-blue-700 transition-colors">
          <i className="fas fa-play-circle text-xl"></i>
        </button>
      ) : (
        <i className="fas fa-lock text-gray-300"></i>
      )}
    </div>
  );
}
