import React, { useState } from 'react'; // Removed useEffect as it's not used in this specific code
import { Heart, DollarSign, Users, MapPin, Calendar, Sun, Moon, Sparkles, Check, X, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Define types for your trip configuration state
interface TripConfig {
  mood: string;
  occasion: string;
  budget: 'low' | 'medium' | 'high'; // Use a union type for budget
  travelers: number;
  interests: string[]; // Explicitly define as string array
  activities: string[]; // Explicitly define as string array
  location: string;
  duration: 'weekend'; // Or a union if other durations are possible
}

// Define types for SectionHeader props
interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void; // A function that takes no arguments and returns nothing
}

// Main App Component
const App: React.FC = () => {
  // State for trip configuration
  const [tripConfig, setTripConfig] = useState<TripConfig>({
    mood: '',
    occasion: '',
    budget: 'medium', // low, medium, high
    travelers: 1,
    interests: [],
    activities: [],
    location: '',
    duration: 'weekend',
  });

  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [showOccasionSelector, setShowOccasionSelector] = useState(false);
  const [showBudgetSelector, setShowBudgetSelector] = useState(false);
  const [showTravelersSelector, setShowTravelersSelector] = useState(false);
  const [showInterestsSelector, setShowInterestsSelector] = useState(false);
  const [showActivitiesSelector, setShowActivitiesSelector] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  // Available options for various parameters
  const moods = [
    { name: 'Relaxed', icon: <Sun className="w-5 h-5" />, description: 'Chill and unwind' },
    { name: 'Adventurous', icon: <MapPin className="w-5 h-5" />, description: 'Explore and discover' },
    { name: 'Romantic', icon: <Heart className="w-5 h-5" />, description: 'For couples' },
    { name: 'Cultural', icon: <Sparkles className="w-5 h-5" />, description: 'History and traditions' },
    { name: 'Family-Friendly', icon: <Users className="w-5 h-5" />, description: 'Fun for all ages' },
    { name: 'Party', icon: <Moon className="w-5 h-5" />, description: 'Vibrant nightlife' },
  ];

  const occasions = [
    'None', 'Anniversary', 'Birthday', 'Graduation', 'Honeymoon', 'Friends Getaway', 'Solo Retreat', 'Family Reunion'
  ];

  const budgets = [
    { name: 'Low', value: 'low', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Medium', value: 'medium', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'High', value: 'high', icon: <DollarSign className="w-5 h-5" /> },
  ];

  const allInterests = [
    'Food & Gastronomy', 'History', 'Art & Crafts', 'Nature & Outdoors', 'Adventure Sports',
    'Nightlife', 'Wellness & Spa', 'Shopping', 'Architecture', 'Photography', 'Music', 'Festivals'
  ];

  const allActivities = [
    'Hiking', 'Cooking Class', 'Wine Tasting', 'Zip-lining', 'Museum Visit', 'Boat Ride',
    'Market Exploration', 'Spa Treatment', 'Local Festival', 'Art Workshop', 'Silver Shopping', 'Hot Air Balloon'
  ];

  // Handler for updating trip configuration
  const handleConfigChange = (key: keyof TripConfig, value: string | number) => {
    setTripConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest: string) => {
    setTripConfig(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const toggleActivity = (activity: string) => {
    setTripConfig(prev => {
      const newActivities = prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity];
      return { ...prev, activities: newActivities };
    });
  };

  // Function to simulate AI recommendation (placeholder)
  const getRecommendation = () => {
    // In a real application, this would trigger an API call to your AI backend
    console.log("Fetching recommendation for:", tripConfig);
    // For demonstration, we'll just show an alert
    alert("AI is processing your preferences! A personalized trip recommendation would appear here.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-10 my-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8">
          Pueblo Mágico Weekends
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Tell us about your ideal weekend getaway and let our AI find your perfect magic town!
        </p>

        {/* Mood Selector Section */}
        <SectionHeader
          title="1. What's your mood for this trip?"
          isOpen={showMoodSelector}
          onToggle={() => setShowMoodSelector(!showMoodSelector)}
        />
        {showMoodSelector && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-4 bg-blue-50 rounded-lg">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => handleConfigChange('mood', mood.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out
                  ${tripConfig.mood === mood.name ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100 hover:shadow-md'}
                  focus:outline-none focus:ring-4 focus:ring-indigo-300`}
              >
                <div className="mb-2">{mood.icon}</div>
                <span className="font-semibold text-sm md:text-base">{mood.name}</span>
                <span className="text-xs text-center opacity-80 mt-1">{mood.description}</span>
              </button>
            ))}
          </div>
        )}

        {/* Occasion Selector Section */}
        <SectionHeader
          title="2. Any special occasion?"
          isOpen={showOccasionSelector}
          onToggle={() => setShowOccasionSelector(!showOccasionSelector)}
        />
        {showOccasionSelector && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <select
              value={tripConfig.occasion}
              onChange={(e) => handleConfigChange('occasion', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
            >
              {occasions.map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>
        )}

        {/* Budget Selector Section */}
        <SectionHeader
          title="3. What's your budget level?"
          isOpen={showBudgetSelector}
          onToggle={() => setShowBudgetSelector(!showBudgetSelector)}
        />
        {showBudgetSelector && (
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-yellow-50 rounded-lg">
            {budgets.map(b => (
              <button
                key={b.value}
                onClick={() => handleConfigChange('budget', b.value as TripConfig['budget'])} // Type assertion here
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ease-in-out
                  ${tripConfig.budget === b.value ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-white text-purple-700 hover:bg-purple-100 hover:shadow-md'}
                  focus:outline-none focus:ring-4 focus:ring-purple-300`}
              >
                <div className="mb-2">{b.icon}</div>
                <span className="font-semibold text-sm md:text-base">{b.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Travelers Selector Section */}
        <SectionHeader
          title="4. How many travelers?"
          isOpen={showTravelersSelector}
          onToggle={() => setShowTravelersSelector(!showTravelersSelector)}
        />
        {showTravelersSelector && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg flex items-center justify-center space-x-4">
            <button
              onClick={() => handleConfigChange('travelers', Math.max(1, tripConfig.travelers - 1))}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold text-red-700">{tripConfig.travelers}</span>
            <button
              onClick={() => handleConfigChange('travelers', tripConfig.travelers + 1)}
              className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Interests Selector Section */}
        <SectionHeader
          title="5. What are your interests?"
          isOpen={showInterestsSelector}
          onToggle={() => setShowInterestsSelector(!showInterestsSelector)}
        />
        {showInterestsSelector && (
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-purple-50 rounded-lg">
            {allInterests.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${tripConfig.interests.includes(interest) ? 'bg-indigo-500 text-white shadow-md' : 'bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-100'}
                  focus:outline-none focus:ring-4 focus:ring-indigo-300`}
              >
                {interest}
              </button>
            ))}
          </div>
        )}

        {/* Activities Selector Section */}
        <SectionHeader
          title="6. Any specific activities in mind?"
          isOpen={showActivitiesSelector}
          onToggle={() => setShowActivitiesSelector(!showActivitiesSelector)}
        />
        {showActivitiesSelector && (
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-orange-50 rounded-lg">
            {allActivities.map(activity => (
              <button
                key={activity}
                onClick={() => toggleActivity(activity)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${tripConfig.activities.includes(activity) ? 'bg-teal-500 text-white shadow-md' : 'bg-white text-teal-700 border border-teal-300 hover:bg-teal-100'}
                  focus:outline-none focus:ring-4 focus:ring-teal-300`}
              >
                {activity}
              </button>
            ))}
          </div>
        )}

        {/* Location (Optional) */}
        <SectionHeader
          title="7. Starting Location (Optional)"
          isOpen={showLocationSelector}
          onToggle={() => setShowLocationSelector(!showLocationSelector)}
        />
        {showLocationSelector && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="e.g., Mexico City, Guadalajara"
              value={tripConfig.location}
              onChange={(e) => handleConfigChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
            <p className="text-sm text-gray-500 mt-2">This helps us find towns closer to you.</p>
          </div>
        )}

        {/* Trip Configuration Summary */}
        <div className="bg-indigo-700 text-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2" /> Your Trip Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <p><span className="font-semibold">Mood:</span> {tripConfig.mood || 'Not selected'}</p>
            <p><span className="font-semibold">Occasion:</span> {tripConfig.occasion || 'None'}</p>
            <p><span className="font-semibold">Budget:</span> {tripConfig.budget.charAt(0).toUpperCase() + tripConfig.budget.slice(1)}</p>
            <p><span className="font-semibold">Travelers:</span> {tripConfig.travelers}</p>
            <p><span className="font-semibold">Interests:</span> {tripConfig.interests.length > 0 ? tripConfig.interests.join(', ') : 'None'}</p>
            <p><span className="font-semibold">Activities:</span> {tripConfig.activities.length > 0 ? tripConfig.activities.join(', ') : 'None'}</p>
            <p><span className="font-semibold">Location:</span> {tripConfig.location || 'Any'}</p>
            <p><span className="font-semibold">Duration:</span> {tripConfig.duration.charAt(0).toUpperCase() + tripConfig.duration.slice(1)}</p>
          </div>
        </div>

        {/* Get Recommendation Button */}
        <div className="text-center">
          <button
            onClick={getRecommendation}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-xl md:text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center mx-auto"
          >
            <Search className="w-6 h-6 mr-3" /> Get My Pueblo Mágico Recommendation!
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Header Component
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isOpen, onToggle }) => (
  <button
    className="w-full flex justify-between items-center bg-indigo-500 text-white p-4 rounded-t-lg shadow-md mb-4 hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
    onClick={onToggle}
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
  </button>
);

export default App;