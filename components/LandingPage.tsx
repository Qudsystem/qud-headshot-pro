import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Shield, Zap, Camera, Layers, Check, Sliders, Upload, Wand2, Edit3, Download, Image as ImageIcon } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

// Diverse set of professional headshots for the marquee
const HEADSHOTS = [
  // Set 1
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  
  // Set 2
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",

  // Set 3
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1589571894960-20bbe2815d22?auto=format&fit=crop&w=400&q=80",

  // Set 4
  "https://images.unsplash.com/photo-1619380061814-58f03707f082?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1485206412256-701b86c32796?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1580518337843-f959e992563b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80"
];

// Shuffle utility
const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

const MarqueeColumn = ({ images, duration, direction = 'up' }: { images: string[], duration: string, direction?: 'up' | 'down' }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div 
        className={`absolute top-0 left-0 w-full ${direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'}`}
        style={{ animationDuration: duration }}
      >
        {/* Doubled list for seamless loop. We use margin-bottom instead of gap for precise height calculation */}
        {[...images, ...images].map((src, i) => (
          <div key={i} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-gray-100/50 mb-4">
            <img src={src} alt={`Headshot ${i}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Prepare columns with distinct shuffled subsets
  const [col1] = useState(() => shuffle(HEADSHOTS).slice(0, 8));
  const [col2] = useState(() => shuffle(HEADSHOTS).slice(8, 16));
  const [col3] = useState(() => shuffle(HEADSHOTS).slice(16, 24));
  const [col4] = useState(() => shuffle(HEADSHOTS).slice(24, 32));

  // Dynamic Active Users State
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: 2, url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
    { id: 3, url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" },
  ]);

  // Effect for rotating active users
  useEffect(() => {
    const interval = setInterval(() => {
      const newId = Date.now();
      const randomImg = HEADSHOTS[Math.floor(Math.random() * HEADSHOTS.length)];
      setActiveUsers(prev => [{ id: newId, url: randomImg }, ...prev.slice(0, 2)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runAnimationLoop = () => {
      setAnimationStep(0); // Reset to start
      
      // Timeline of animation steps
      const sequence = [
        { step: 1, delay: 500 },    // Upload UI appears
        { step: 2, delay: 2000 },   // Uploading state
        { step: 3, delay: 3500 },   // Style Grid appears
        { step: 4, delay: 5000 },   // Style Selected
        { step: 5, delay: 6500 },   // Edit UI appears
        { step: 6, delay: 8000 },   // Generating state
        { step: 7, delay: 9500 },   // Result appears
      ];

      sequence.forEach(({ step, delay }) => {
        timeouts.push(setTimeout(() => setAnimationStep(step), delay));
      });

      // Restart loop after viewing result (4.5s display time)
      timeouts.push(setTimeout(runAnimationLoop, 14000));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimationLoop();
          observer.disconnect(); // Start the loop once when visible
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const steps = [
    { title: "Upload your photo", desc: "Take a selfie or upload a casual photo from your gallery." },
    { title: "Choose your style", desc: "Select from over 20 professional, artistic, or creative styles." },
    { title: "Customize details", desc: "Refine the look with specific prompts like 'Make me smile' or 'Fix lighting'." },
    { title: "Get results instantly", desc: "Download your high-quality headshot in seconds." }
  ];

  // --- DYNAMIC INTERFACE VISUALIZATION HELPERS ---

  const getStepTitle = (step: number) => {
    if (step < 3) return "1. Upload Photo";
    if (step < 5) return "2. Select Style";
    if (step < 7) return "3. Finalize Details";
    return "4. Result";
  };

  const renderMockInterface = () => {
    // Phase 1: Upload (Steps 1-2)
    const isUpload = animationStep < 3;
    // Phase 2: Style (Steps 3-4)
    const isStyle = animationStep >= 3 && animationStep < 5;
    // Phase 3: Edit (Steps 5-6)
    const isEdit = animationStep >= 5 && animationStep < 7;
    // Phase 4: Result (Step 7+)
    const isResult = animationStep >= 7;

    return (
      <div className="relative h-[400px] w-full bg-gray-900 rounded-xl overflow-hidden flex flex-col">
         {/* Interface Header */}
         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest transition-all duration-300">
               {getStepTitle(animationStep)}
            </div>
            <div className="w-4"></div> {/* Spacer */}
         </div>

         {/* Interface Body - Dynamic Content */}
         <div className="flex-1 relative p-6">
            
            {/* --- COMPONENT 1: UPLOAD UI --- */}
            <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-500 transform ${isUpload ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
               <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center bg-gray-800/30 gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center animate-bounce">
                     <Upload className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-center">
                     <div className="text-gray-300 font-medium mb-1">Upload your selfie</div>
                     <div className="text-gray-600 text-xs">JPG, PNG, WEBP</div>
                  </div>
                  {/* Cursor Simulation */}
                  {animationStep === 2 && (
                     <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur px-3 py-1 rounded text-xs text-white animate-pulse">
                        Uploading...
                     </div>
                  )}
               </div>
            </div>

            {/* --- COMPONENT 2: STYLE GRID --- */}
            <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-500 transform ${isStyle ? 'opacity-100 translate-x-0' : isUpload ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
               <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Wand2 className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase">Select Style</span>
               </div>
               <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className={`rounded-lg border p-3 flex flex-col gap-2 transition-all duration-300 ${i === 1 ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500' : 'border-gray-700 bg-gray-800/50'}`}>
                        <div className="w-8 h-8 rounded bg-gray-700/50 flex items-center justify-center text-lg">
                           {i === 1 ? '👔' : i === 2 ? '📐' : i === 3 ? '🎞️' : '🎥'}
                        </div>
                        <div className="h-2 w-16 bg-gray-700 rounded"></div>
                        <div className="h-1.5 w-10 bg-gray-800 rounded"></div>
                        {/* Selection Animation */}
                        {i === 1 && isStyle && (
                           <div className="absolute inset-0 border-2 border-indigo-400 rounded-lg animate-ping opacity-20"></div>
                        )}
                     </div>
                  ))}
               </div>
               <div className="mt-4 h-10 bg-indigo-600 rounded-lg w-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-900/50">
                  Next Step
               </div>
            </div>

            {/* --- COMPONENT 3: EDIT & REFINE --- */}
            <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-500 transform ${isEdit ? 'opacity-100 translate-x-0' : isStyle ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
               <div className="flex gap-4 h-full">
                  {/* Mini Preview */}
                  <div className="w-1/3 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                     <img src={HEADSHOTS[0]} alt="Preview" className="w-full h-full object-cover opacity-50" />
                     <div className="absolute bottom-2 left-2 text-[8px] bg-black/50 text-white px-1 rounded">Original</div>
                  </div>
                  {/* Inputs */}
                  <div className="flex-1 flex flex-col gap-3">
                     <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Edit3 className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-bold uppercase">Finalize Details</span>
                     </div>
                     {/* Fake Inputs */}
                     <div className="h-8 w-full bg-gray-800 border border-gray-700 rounded-md flex items-center px-2">
                        <div className="w-1.5 h-4 bg-indigo-500 animate-pulse"></div>
                        <span className="text-gray-500 text-xs ml-1">Fix lighting...</span>
                     </div>
                     <div className="h-8 w-full bg-gray-800 border border-gray-700 rounded-md"></div>
                     
                     <div className="flex-1"></div>
                     
                     {/* Generate Button */}
                     <div className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg w-full flex items-center justify-center text-white text-sm font-bold gap-2 shadow-lg shadow-indigo-900/50 animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        Generate Headshot
                     </div>
                  </div>
               </div>
            </div>

            {/* --- COMPONENT 4: RESULT --- */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${isResult ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
               <div className="relative w-full h-full">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Result" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  
                  {/* Success Badge */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-500/20 backdrop-blur-md border border-green-500/50 text-green-400 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-4 fade-in duration-700">
                     <Check className="w-3 h-3" /> Generation Complete
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
                     <div className="flex-1 bg-white text-gray-900 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-xl">
                        <Download className="w-4 h-4 mr-2" /> Download
                     </div>
                     <div className="w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-lg flex items-center justify-center text-white">
                        <ImageIcon className="w-4 h-4" />
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100">
      <style>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: marquee-up linear infinite;
        }
        .animate-marquee-down {
          animation: marquee-down linear infinite;
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 2s infinite cubic-bezier(0, 0.2, 0.8, 1);
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onGetStarted}>
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">AI Headshot<span className="text-indigo-600">Pro</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block transition-colors">
              How it works
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-95 transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-purple-50/50 to-white"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-8 shadow-sm animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Powered by QudMind
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Turn your selfies into <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Professional Headshots</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop paying hundreds for photographers. Use AI to generate studio-quality profile photos for LinkedIn, resumes, and social media in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-200 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
            >
              Create Your Headshot
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Dynamic Active Users / Social Proof */}
            <div className="flex items-center gap-4 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-default group">
              <div className="flex -space-x-3 rtl:space-x-reverse pl-1">
                {activeUsers.map((user, idx) => (
                  <img 
                    key={user.id}
                    className={`w-10 h-10 rounded-full border-2 border-white ring-2 ring-indigo-50 object-cover shadow-sm ${idx === 0 ? 'animate-in fade-in zoom-in slide-in-from-left-3 duration-500' : 'transition-all duration-500'}`} 
                    src={user.url} 
                    alt="User" 
                  />
                ))}
                {/* Plus New Circle */}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-bold relative z-10 shadow-sm group-hover:bg-indigo-200 transition-colors">
                  <span className="animate-pulse">+2k</span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm leading-none">10k+ Pros</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ripple absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active now</span>
              </div>
            </div>
          </div>

          {/* Dynamic Marquee Image Grid */}
          <div className="relative max-w-6xl mx-auto mt-12 h-[600px] w-full">
            {/* Gradient Masks */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-white via-transparent to-transparent h-32 bottom-0 top-auto w-full"></div>
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white via-transparent to-transparent h-32 top-0 w-full"></div>
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-white via-transparent to-transparent w-16 left-0 h-full"></div>
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-l from-white via-transparent to-transparent w-16 right-0 h-full"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full overflow-hidden mask-linear-fade">
              {/* Column 1: Moves Up */}
              <MarqueeColumn images={col1} duration="45s" direction="up" />
              
              {/* Column 2: Moves Down */}
              <MarqueeColumn images={col2} duration="55s" direction="down" />
              
              {/* Column 3: Moves Up */}
              <div className="hidden md:block h-full">
                 <MarqueeColumn images={col3} duration="50s" direction="up" />
              </div>

              {/* Column 4: Moves Down */}
              <div className="hidden md:block h-full">
                 <MarqueeColumn images={col4} duration="60s" direction="down" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to look professional</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our advanced AI understands lighting, composition, and style to deliver perfect results every time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                title: "Lightning Fast",
                desc: "Get results in under 10 seconds with Gemini 2.5 Flash technology.",
                color: "bg-amber-500 shadow-amber-200"
              },
              {
                icon: <Layers className="w-6 h-6 text-white" />,
                title: "20+ Premium Styles",
                desc: "From Corporate to Studio Ghibli, choose the perfect look for your brand.",
                color: "bg-indigo-600 shadow-indigo-200"
              },
              {
                icon: <Shield className="w-6 h-6 text-white" />,
                title: "Private & Secure",
                desc: "Your photos are processed securely and deleted after generation.",
                color: "bg-green-500 shadow-green-200"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                 <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-3xl -rotate-2 group-hover:-rotate-1 transition-transform duration-500"></div>
                    <div className="relative bg-gray-900 rounded-2xl shadow-2xl text-white ring-1 ring-gray-800 overflow-hidden">
                       {/* Dynamic Mock Interface */}
                       {renderMockInterface()}
                    </div>
                 </div>
              </div>
              
              <div className="order-1 lg:order-2 pl-0 lg:pl-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-4">
                   Simple Process
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">How it works</h2>
                
                <div className="relative flex flex-col">
                  {steps.map((step, idx) => {
                    const showStep = animationStep >= (idx * 2) + 1;
                    const showLine = animationStep >= (idx * 2) + 2;
                    const isLast = idx === steps.length - 1;
                    
                    // Dynamic state logic
                    const isCompleted = animationStep > (idx * 2) + 1;
                    const isActive = animationStep === (idx * 2) + 1 || (animationStep === (idx * 2) + 2);

                    return (
                      <div key={idx} className="relative flex gap-8 pb-16 last:pb-0 group">
                        {/* Connecting Line */}
                        {!isLast && (
                          <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-100 -ml-px">
                             <div 
                               className={`w-full bg-indigo-600 transition-all duration-700 ease-out origin-top ${showLine ? 'h-full' : 'h-0'}`}
                             ></div>
                          </div>
                        )}

                        {/* Number Circle */}
                        <div className={`relative flex-shrink-0 z-10 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${showStep ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                          <div className={`
                             w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500
                             ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300 ring-4 ring-indigo-100 scale-110' : ''}
                             ${isCompleted ? 'bg-indigo-600 text-white ring-4 ring-white' : ''}
                             ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-400' : ''}
                          `}>
                            {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                          </div>
                          
                          {/* Ripple effect for active item */}
                          {isActive && (
                            <div className="absolute inset-0 -m-2 rounded-full bg-indigo-600/20 animate-ripple z-0"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`pt-1 transition-all duration-700 delay-200 ${showStep ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-indigo-700' : 'text-gray-900'}`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={onGetStarted}
                  className={`mt-12 px-8 py-3.5 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all duration-500 shadow-lg flex items-center gap-2 group ${animationStep >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  Start Creating Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
               <div className="bg-gray-900 p-1.5 rounded-lg">
                 <Camera className="w-4 h-4 text-white" />
               </div>
               <span className="font-bold text-gray-900">AI Headshot<span className="text-indigo-600">Pro</span></span>
            </div>
            
            {/* Made In / Powered By */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm group hover:border-yellow-200 transition-colors cursor-default">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Made in Egypt</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm font-bold text-gray-900">Powered by Qudsystem</span>
                <div className="relative flex items-center justify-center">
                   <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                   {/* Electric Glow Animation */}
                   <div className="absolute inset-0 bg-yellow-400 blur-md rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
                   <div className="absolute inset-0 bg-yellow-500 blur-[1px] rounded-full opacity-40 animate-ripple"></div>
                </div>
            </div>

            {/* Links */}
            <div className="flex gap-8 text-sm text-gray-500 font-medium">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-50 pt-8">
            <p>© 2025-2026 AI Headshot Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}