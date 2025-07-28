import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Navigation from '../components/Navigation';
import { getCurrentUser } from '../lib/auth';
import { trainingData } from '../data/trainingData';
import { areAllTracksCompleted } from '../lib/progress';

export default function Reflection() {
  const [, setLocation] = useLocation();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      setLocation('/');
      return;
    }

    const coreModules = trainingData.core.map(m => m.id);
    const departmentalModules = (trainingData.departmental[user.department] || []).map(m => m.id);
    const hrModules = trainingData.hr.map(m => m.id);

    const allCompleted = areAllTracksCompleted(coreModules, departmentalModules, hrModules);
    
    if (!allCompleted) {
      setLocation('/dashboard');
    }
  }, [user, setLocation]);

  if (!user) return null;

  // Google Form URL - Replace with actual form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfExample/viewform?embedded=true";

  return (
    <div className="min-h-screen bg-steampro-light">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-steampro-dark mb-2">Training Reflection</h1>
          <p className="text-gray-600">Share your learning experience with us</p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-steampro-dark mb-4">
            <i className="fas fa-video text-steampro-blue mr-2"></i>
            Video Reflection Instructions
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-steampro-dark mb-3">Please record a 5-minute video covering:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <i className="fas fa-check text-blue-600 mt-1"></i>
                <span>Key learnings from Core Training modules</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check text-blue-600 mt-1"></i>
                <span>Insights gained from your Departmental Training</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check text-blue-600 mt-1"></i>
                <span>How HR policies will guide your daily work</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check text-blue-600 mt-1"></i>
                <span>Specific ways you'll apply this knowledge at work</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-check text-blue-600 mt-1"></i>
                <span>Your commitment to SteamPRO's values and mission</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <i className="fas fa-lightbulb text-yellow-600 mt-1"></i>
              <div>
                <p className="font-semibold text-yellow-800">Tips for a great reflection:</p>
                <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                  <li>• Speak clearly and maintain good lighting</li>
                  <li>• Be authentic and share genuine insights</li>
                  <li>• Include specific examples where possible</li>
                  <li>• Keep it within the 5-minute timeframe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Google Form Embed */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-steampro-dark">Submit Your Reflection</h3>
            <p className="text-gray-600 text-sm">Complete the form below to submit your video reflection</p>
          </div>
          
          {/* Form Container */}
          <div className="h-96 md:h-[600px]">
            <iframe
              src={googleFormUrl}
              className="w-full h-full border-0"
              title="Training Reflection Form"
            >
              Loading form...
            </iframe>
          </div>
          
          {/* Fallback for when iframe doesn't load */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="text-center">
              <i className="fas fa-external-link-alt text-steampro-blue text-2xl mb-2"></i>
              <p className="text-gray-600 mb-4">
                If the form doesn't load above, you can access it directly:
              </p>
              <a
                href={googleFormUrl.replace('?embedded=true', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-steampro-blue text-white px-6 py-3 rounded-lg hover:bg-steampro-blue/90 transition-all"
              >
                <span>Open Form in New Tab</span>
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
          <i className="fas fa-check-circle text-green-600 text-3xl mb-4"></i>
          <h3 className="text-xl font-semibold text-steampro-dark mb-2">Almost Done!</h3>
          <p className="text-gray-700 mb-4">
            After submitting your reflection video, you'll have completed the entire SteamPRO training program.
          </p>
          <p className="text-sm text-gray-600">
            Our team will review your submission and provide feedback within 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
