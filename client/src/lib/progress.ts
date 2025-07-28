export interface ModuleProgress {
  moduleId: string;
  videoWatched: boolean;
  readingCompleted: boolean;
  quizCompleted: boolean;
  quizScore: number;
  completedAt?: string;
}

export interface UserProgress {
  [moduleId: string]: ModuleProgress;
}

export const getUserProgress = (): UserProgress => {
  const progressStr = localStorage.getItem('steampro_progress');
  if (progressStr) {
    try {
      return JSON.parse(progressStr);
    } catch (error) {
      console.error('Error parsing progress data:', error);
      return {};
    }
  }
  return {};
};

export const updateModuleProgress = (moduleId: string, updates: Partial<ModuleProgress>): void => {
  const currentProgress = getUserProgress();
  const moduleProgress = currentProgress[moduleId] || {
    moduleId,
    videoWatched: false,
    readingCompleted: false,
    quizCompleted: false,
    quizScore: 0
  };

  const updatedProgress = { ...moduleProgress, ...updates };
  
  // Mark as completed if all sections are done
  if (updatedProgress.videoWatched && updatedProgress.readingCompleted && updatedProgress.quizCompleted) {
    updatedProgress.completedAt = new Date().toISOString();
  }

  currentProgress[moduleId] = updatedProgress;
  localStorage.setItem('steampro_progress', JSON.stringify(currentProgress));
};

export const getModuleProgress = (moduleId: string): ModuleProgress => {
  const progress = getUserProgress();
  return progress[moduleId] || {
    moduleId,
    videoWatched: false,
    readingCompleted: false,
    quizCompleted: false,
    quizScore: 0
  };
};

export const isModuleUnlocked = (moduleId: string, allModules: string[]): boolean => {
  const moduleIndex = allModules.indexOf(moduleId);
  if (moduleIndex === 0) return true; // First module is always unlocked
  
  const previousModuleId = allModules[moduleIndex - 1];
  const previousProgress = getModuleProgress(previousModuleId);
  return previousProgress.quizCompleted;
};

export const getTrackProgress = (moduleIds: string[]): { completed: number; total: number; percentage: number } => {
  const progress = getUserProgress();
  const completed = moduleIds.filter(id => progress[id]?.quizCompleted).length;
  const total = moduleIds.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const areAllTracksCompleted = (coreModules: string[], departmentalModules: string[], hrModules: string[]): boolean => {
  const coreProgress = getTrackProgress(coreModules);
  const departmentalProgress = getTrackProgress(departmentalModules);
  const hrProgress = getTrackProgress(hrModules);
  
  return coreProgress.percentage === 100 && departmentalProgress.percentage === 100 && hrProgress.percentage === 100;
};
