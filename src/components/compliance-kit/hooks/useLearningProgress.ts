
import { useState, useEffect } from "react";

export const useLearningProgress = () => {
  const [learningProgress, setLearningProgress] = useState(0);
  
  useEffect(() => {
    // Get completed modules from localStorage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    // Calculate progress based on completed modules
    if (completedModules.length > 0) {
      const progress = (completedModules.length / 3) * 100;
      setLearningProgress(progress);
    } else {
      // Set a default progress for new users
      setLearningProgress(0);
    }
  }, []);
  
  return learningProgress;
};
