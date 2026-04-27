import React, { useState } from 'react';
import { Heart, Star, Globe, Coins, Plus, X, ArrowRight, ArrowLeft, RefreshCcw, CheckCircle } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  // State to hold the user's "sticky notes" for each category
  const [ikigaiData, setIkigaiData] = useState({
    love: [],
    goodAt: [],
    needs: [],
    paidFor: []
  });

  const [finalStatement, setFinalStatement] = useState('');
  const [showPreviousInputs, setShowPreviousInputs] = useState(false);

  // Step definitions mapped to Ikigai circles
  const steps = [
    {
      id: 'intro',
      title: 'Discover Your Ikigai',
      subtitle: 'A simple tool to help you find your "Core Strengths" and turn them into a community enterprise.',
      icon: <Star className="w-12 h-12 text-purple-500 mb-4" />
    },
    {
      id: 'love',
      title: 'What You Love',
      subtitle: 'What activities make you lose track of time? What do you enjoy doing? What are your hobbies and passions?',
      placeholder: 'e.g., Gardening, Talking to people, Cooking...',
      color: 'bg-pink-100 text-pink-800 border-pink-300',
      btnColor: 'bg-pink-500 hover:bg-pink-600',
      icon: <Heart className="w-6 h-6 text-pink-500" />
    },
    {
      id: 'goodAt',
      title: 'Your Core Strengths',
      subtitle: 'What are you good at? What "everyday skills" do family and friends ask you for help with?',
      placeholder: 'e.g., Organising, Translating, Fixing things...',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      btnColor: 'bg-blue-500 hover:bg-blue-600',
      icon: <Star className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'needs',
      title: 'The Community Need',
      subtitle: 'Look at the skills and passions you just listed. What are the problems or needs in my community right now, and how can I help?',
      placeholder: 'e.g., Lonely elderly people, Litter, Need for translators...',
      color: 'bg-green-100 text-green-800 border-green-300',
      btnColor: 'bg-green-500 hover:bg-green-600',
      icon: <Globe className="w-6 h-6 text-green-500" />
    },
    {
      id: 'paidFor',
      title: 'Making an Income',
      subtitle: 'How could you turn these skills into a service or product people can pay for?',
      placeholder: 'e.g., Selling lunch boxes, Freelance translating...',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      btnColor: 'bg-yellow-500 hover:bg-yellow-600',
      icon: <Coins className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 'result',
      title: 'Your Ikigai',
      subtitle: 'Look at your ideas below. How do they overlap to create your unique Ikigai?',
      icon: <CheckCircle className="w-12 h-12 text-purple-500 mb-4" />
    }
  ];

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const currentCategory = steps[currentStep].id;
    setIkigaiData({
      ...ikigaiData,
      [currentCategory]: [...ikigaiData[currentCategory], inputValue.trim()]
    });
    setInputValue('');
  };

  const handleRemoveTag = (category, indexToRemove) => {
    setIkigaiData({
      ...ikigaiData,
      [category]: ikigaiData[category].filter((_, index) => index !== indexToRemove)
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    setShowPreviousInputs(false);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    setShowPreviousInputs(false);
  };

  const resetApp = () => {
    setIkigaiData({ love: [], goodAt: [], needs: [], paidFor: [] });
    setFinalStatement('');
    setCurrentStep(0);
    setShowPreviousInputs(false);
  };

  // Intro Screen Component
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center border-t-4 border-purple-500">
          <div className="flex justify-center">{steps[0].icon}</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{steps[0].title}</h1>
          <p className="text-slate-600 mb-8 text-lg">{steps[0].subtitle}</p>
          <button 
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-200 flex items-center justify-center w-full text-lg"
          >
            Start Finding My Skills <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
        <p className="mt-6 text-xs text-slate-400/80 tracking-wide font-medium">built by Wai Yi Wong</p>
      </div>
    );
  }

  // Result Screen Component
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-8 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-purple-500">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{steps[5].title}</h1>
            <p className="text-slate-600 mb-6">{steps[5].subtitle}</p>
            
            {/* Ikigai Venn Diagram */}
            <div className="relative w-72 h-72 mx-auto my-10 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-pink-400/40 rounded-full mix-blend-multiply flex items-start justify-center pt-6 shadow-lg border border-pink-200 backdrop-blur-sm">
                <span className="text-pink-900 font-bold text-xs uppercase tracking-wider">Passions</span>
              </div>
              <div className="absolute top-[25%] -left-4 w-44 h-44 bg-blue-400/40 rounded-full mix-blend-multiply flex items-center justify-start pl-4 shadow-lg border border-blue-200 backdrop-blur-sm">
                 <span className="text-blue-900 font-bold text-xs uppercase tracking-wider -rotate-90">Strengths</span>
              </div>
              <div className="absolute top-[25%] -right-4 w-44 h-44 bg-green-400/40 rounded-full mix-blend-multiply flex items-center justify-end pr-4 shadow-lg border border-green-200 backdrop-blur-sm">
                 <span className="text-green-900 font-bold text-xs uppercase tracking-wider rotate-90">Needs</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-yellow-400/40 rounded-full mix-blend-multiply flex items-end justify-center pb-6 shadow-lg border border-yellow-200 backdrop-blur-sm">
                 <span className="text-yellow-900 font-bold text-xs uppercase tracking-wider">Income</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 flex flex-col items-center">
                <span className="font-black text-slate-800 tracking-widest text-xl drop-shadow-md">IKIGAI</span>
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider drop-shadow-sm mt-0.5 text-center leading-tight">A Reason<br/>For Being</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left mt-8">
              {/* Review Cards */}
              <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="text-pink-500 w-5 h-5" />
                  <h3 className="font-semibold text-pink-900">Passions</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ikigaiData.love.length === 0 ? <span className="text-sm text-pink-400 italic">None added</span> : 
                    ikigaiData.love.map((item, i) => <span key={i} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-pink-200 text-pink-800">{item}</span>)}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-blue-500 w-5 h-5" />
                  <h3 className="font-semibold text-blue-900">Strengths</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ikigaiData.goodAt.length === 0 ? <span className="text-sm text-blue-400 italic">None added</span> : 
                    ikigaiData.goodAt.map((item, i) => <span key={i} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-blue-200 text-blue-800">{item}</span>)}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="text-green-500 w-5 h-5" />
                  <h3 className="font-semibold text-green-900">Community Needs</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ikigaiData.needs.length === 0 ? <span className="text-sm text-green-400 italic">None added</span> : 
                    ikigaiData.needs.map((item, i) => <span key={i} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-green-200 text-green-800">{item}</span>)}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="text-yellow-500 w-5 h-5" />
                  <h3 className="font-semibold text-yellow-900">Income Ideas</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ikigaiData.paidFor.length === 0 ? <span className="text-sm text-yellow-400 italic">None added</span> : 
                    ikigaiData.paidFor.map((item, i) => <span key={i} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-yellow-200 text-yellow-800">{item}</span>)}
                </div>
              </div>
            </div>

            {/* The Synthesis Statement */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-left">
              <h3 className="font-bold text-purple-900 mb-2">My Enterprise Statement</h3>
              <p className="text-sm text-purple-700 mb-4">Write a sentence combining your cards above (e.g., "I will use my skill of [Strength] to help [Need] by [Income Idea]").</p>
              <textarea 
                className="w-full p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none resize-none"
                rows="3"
                placeholder="My enterprise idea is..."
                value={finalStatement}
                onChange={(e) => setFinalStatement(e.target.value)}
              ></textarea>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="flex items-center text-slate-500 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>
              <button onClick={resetApp} className="flex items-center text-purple-600 hover:text-purple-800 font-semibold">
                <RefreshCcw className="w-4 h-4 mr-1" /> Start Again
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400/80 tracking-wide font-medium mt-4">built by Wai Yi Wong</p>
        </div>
      </div>
    );
  }

  // Active Question Step
  const step = steps[currentStep];
  const currentCategory = step.id;
  const currentTags = ikigaiData[currentCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div 
            className={`h-2 transition-all duration-500 ${step.btnColor.split(' ')[0]}`} 
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            {step.icon}
            <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">Step {currentStep} of 4</span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h2>
          <p className="text-slate-600 mb-6">{step.subtitle}</p>

          {/* Optional Show Previous Inputs for Step 3 */}
          {step.id === 'needs' && (
            <div className="mb-6 -mt-2">
              <button
                type="button"
                onClick={() => setShowPreviousInputs(!showPreviousInputs)}
                className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center transition-colors"
              >
                {showPreviousInputs ? 'Hide' : 'Show'} my listed skills and passions
              </button>
              
              {showPreviousInputs && (
                <div className="mt-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 animate-fade-in-up">
                  <div>
                    <span className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2 block">Passions (What I Love)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ikigaiData.love.length === 0 ? <span className="text-sm text-slate-400 italic">None added</span> : 
                        ikigaiData.love.map((item, i) => <span key={`love-${i}`} className="bg-pink-50 px-2.5 py-1 rounded-md text-sm border border-pink-100 text-pink-700">{item}</span>)}
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 block">Strengths (What I'm Good At)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {ikigaiData.goodAt.length === 0 ? <span className="text-sm text-slate-400 italic">None added</span> : 
                        ikigaiData.goodAt.map((item, i) => <span key={`good-${i}`} className="bg-blue-50 px-2.5 py-1 rounded-md text-sm border border-blue-100 text-blue-700">{item}</span>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleAddTag} className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step.placeholder}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-shadow focus:ring-slate-400"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className={`${step.btnColor} text-white p-3 rounded-lg flex items-center justify-center disabled:opacity-50 transition-colors`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {/* Digital Sticky Notes (Tags) */}
          <div className="min-h-[120px] bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-wrap gap-2 content-start mb-8">
            {currentTags.length === 0 ? (
              <p className="text-slate-400 italic text-sm w-full text-center mt-8">Add your ideas above to create sticky notes...</p>
            ) : (
              currentTags.map((tag, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${step.color} shadow-sm animate-fade-in-up`}
                >
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(currentCategory, index)}
                    className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button 
              onClick={prevStep}
              className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <button 
              onClick={nextStep}
              className={`${step.btnColor} text-white font-semibold py-2 px-6 rounded-lg shadow-sm flex items-center transition-colors`}
            >
              {currentStep === 4 ? 'See Results' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-slate-400/80 tracking-wide font-medium">built by Wai Yi Wong</p>
    </div>
  );
}