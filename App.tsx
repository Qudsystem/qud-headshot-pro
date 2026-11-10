import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { StyleSelector, STYLES } from './components/StyleSelector';
import { PromptInput, SocialMediaData } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { LandingPage } from './components/LandingPage';
import { generateHeadshotApi } from './services/api';
import type { HeadshotRequest } from './types/api';
import { ArrowRight, Loader2, AlertCircle, Sparkles, ArrowLeft, X, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  // View State: 'landing' or 'app'
  const [showLanding, setShowLanding] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  // Default to Corporate Pro for a professional headshot app
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>('corporate-pro');

  // Custom Inputs
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [socialData, setSocialData] = useState<SocialMediaData>({
    headline: '',
    topic: '',
    colorTheme: 'Modern Blue & White'
  });

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Customize Workflow State: 'style' (Step 2) -> 'edit' (Step 3)
  const [customizeStep, setCustomizeStep] = useState<'style' | 'edit'>('style');

  // Animation Step State for the Process Indicator
  const [animStep, setAnimStep] = useState(0);

  const progressIntervalRef = useRef<number | null>(null);

  const handleImageSelect = useCallback((base64: string, mimeType: string) => {
    setSelectedImage(base64);
    setImageMimeType(mimeType);
    setGeneratedImage(null);
    setError(null);
    setCustomizeStep('style'); // Reset to style selection on new image
  }, []);

  const handleClear = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setError(null);
    setCustomizeStep('style');
  };

  // Handle Global Paste (Ctrl+V)
  useEffect(() => {
    // Only listen for paste if we are in the app view
    if (showLanding) return;

    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          // Found an image in the clipboard
          event.preventDefault(); // Prevent default paste behavior
          const blob = item.getAsFile();

          if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              // Extract base64 data and mime type
              const matches = result.match(/^data:(.+);base64,(.+)$/);
              if (matches && matches.length === 3) {
                const mimeType = matches[1];
                const base64Data = matches[2];
                handleImageSelect(base64Data, mimeType);
              }
            };
            reader.readAsDataURL(blob);
          }
          break; // Only process the first image found
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleImageSelect, showLanding]);

  // Sync Animation Step with Application State
  useEffect(() => {
    if (showLanding) {
      setAnimStep(0);
      return;
    }

    // Calculate target step based on state (4 Steps Total)
    // 1: Upload Point
    // 2: Line 1
    // 3: Style Point
    // 4: Line 2
    // 5: Edit Point
    // 6: Line 3
    // 7: Result Point

    let target = 1; // Default: Step 1 (Upload) visible

    if (generatedImage) {
      target = 7; // Step 4 (Result) visible
    } else if (loading) {
      target = 6; // Line 3 filling (Transitioning to Result)
    } else if (selectedImage) {
      if (customizeStep === 'edit') {
        target = 5; // Step 3 (Edit) visible
      } else {
        target = 3; // Step 2 (Style) visible
      }
    }

    // Use a small timeout to allow CSS transitions to play (especially on initial mount)
    const timer = setTimeout(() => {
      setAnimStep(target);
    }, 100);

    return () => clearTimeout(timer);
  }, [showLanding, selectedImage, generatedImage, loading, customizeStep]);

  const handleGenerate = async () => {
    if (!selectedImage) return;

    // Reset generated image to trigger loading state in UI
    setGeneratedImage(null);
    setLoading(true);
    setError(null);
    setProgress(0);

    // Simulate progress bar
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        // Slower progress as it gets higher
        const increment = prev < 50 ? 5 : prev < 80 ? 2 : 0.5;
        return prev + increment;
      });
    }, 200);

    // Construct the prompt based on style and custom input
    const selectedStyle = STYLES.find(s => s.id === selectedStyleId);
    let fullPrompt = "";

    // Logic for Social Media Ad Context Awareness
    if (selectedStyleId === 'social-media-ad') {
      fullPrompt = `
        ACTION: Generate a professional social media advertisement image integrating the user's face.
        CONTEXT/TOPIC: ${socialData.topic || 'General Professional Update'}.
        
        DESIGN REQUIREMENTS:
        - HEADLINE TEXT TO DISPLAY: "${socialData.headline || 'NEW POST'}" (Render this text clearly and artistically on the image).
        - COLOR THEME: ${socialData.colorTheme}.
        - STYLE DEFINITION: ${selectedStyle?.promptSuffix}.
        
        USER IDENTITY PRESERVATION:
        - Retain the person's facial features exactly but blend them into the design professionally.
        - Ensure high quality 4K resolution.
      `;
    } else {
      // Standard Logic
      const stylePrompt = selectedStyle ? selectedStyle.promptSuffix : '';
      fullPrompt = `Retain the facial features and identity of the person in the image exactly. `;
      if (stylePrompt) fullPrompt += `${stylePrompt} `;
    }

    // Append custom manual instructions for all styles
    if (customPrompt.trim()) {
      fullPrompt += ` ADDITIONAL INSTRUCTIONS: ${customPrompt}. `;
    }

    if (!selectedStyle && !customPrompt.trim()) {
      fullPrompt += "Enhance this image to look like a professional headshot. Improve lighting and background.";
    }

    try {
      const request: HeadshotRequest = {
        imageBase64: selectedImage,
        mimeType: imageMimeType,
        prompt: fullPrompt,
      };
      const { imageBase64: resultBase64 } = await generateHeadshotApi(request);
      setProgress(100);
      // Small delay to let the progress bar finish visually
      setTimeout(() => {
        setGeneratedImage(resultBase64);
        setLoading(false);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }, 500);
    } catch (err) {
      console.error(err);
      const message = (err as any)?.message || "Failed to generate image. Please try again.";
      setError(message);
      setLoading(false);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
  };

  const getSelectedStyleLabel = () => {
    const style = STYLES.find(s => s.id === selectedStyleId);
    return style ? style.label : 'Custom Style';
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 animate-in fade-in duration-500">
      <Header />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setShowLanding(true)}
            className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </button>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 tracking-tight">
            Create Your Headshot
          </h2>

          {/* Animated Process Indicator - 4 Steps */}
          <div className="flex items-center justify-between w-full max-w-2xl mx-auto mt-8 select-none">

            {/* Step 1: Upload */}
            <div className="relative flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${animStep >= 1 ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-gray-300 text-gray-400'}`}>
                1
              </div>
              <span className={`absolute -bottom-6 text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-500 ${animStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                Upload
              </span>
            </div>

            {/* Line 1 */}
            <div className="flex-1 h-1 mx-2 rounded-full relative overflow-hidden bg-gray-200">
              <div className={`absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-700 ease-out ${animStep >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Step 2: Style */}
            <div className="relative flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${animStep >= 3 ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-gray-300 text-gray-400'}`}>
                2
              </div>
              <span className={`absolute -bottom-6 text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-500 ${animStep >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                Style
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex-1 h-1 mx-2 rounded-full relative overflow-hidden bg-gray-200">
              <div className={`absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-700 ease-out ${animStep >= 4 ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Step 3: Edit */}
            <div className="relative flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${animStep >= 5 ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-gray-300 text-gray-400'}`}>
                3
              </div>
              <span className={`absolute -bottom-6 text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-500 ${animStep >= 5 ? 'text-indigo-600' : 'text-gray-400'}`}>
                Edit
              </span>
            </div>

            {/* Line 3 */}
            <div className="flex-1 h-1 mx-2 rounded-full relative overflow-hidden bg-gray-200">
              <div className={`absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-700 ease-out ${animStep >= 6 ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Step 4: Result */}
            <div className="relative flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${animStep >= 7 ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white border-gray-300 text-gray-400'}`}>
                4
              </div>
              <span className={`absolute -bottom-6 text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-500 ${animStep >= 7 ? 'text-indigo-600' : 'text-gray-400'}`}>
                Result
              </span>
            </div>

          </div>
        </div>

        {/* MAIN CARD AREA - Changes based on State */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-h-[500px] relative">

          {error && (
            <div className="absolute top-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-top-2">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3 shadow-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
                <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STATE 1: UPLOAD */}
          {!selectedImage && (
            <div className="h-full p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Step 1: Upload your photo</h3>
              <div className="w-full max-w-md">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onClear={handleClear}
                  selectedImage={selectedImage}
                />
              </div>
            </div>
          )}

          {/* STATE 2 & 3: CUSTOMIZE (STYLE & EDIT) */}
          {selectedImage && !loading && !generatedImage && (
            <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* SUB-STATE: STYLE SELECTION ONLY (Preview & Edit Hidden) */}
              {customizeStep === 'style' && (
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900">Choose your style</h3>
                    <p className="text-sm text-gray-500">Select a professional look for your headshot</p>
                  </div>

                  <div className="flex-1 overflow-y-auto min-h-[400px] mb-6">
                    <StyleSelector
                      selectedStyleId={selectedStyleId}
                      onSelectStyle={setSelectedStyleId}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={handleClear}
                      className="py-4 px-6 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={() => setCustomizeStep('edit')}
                      className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Next Step
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-STATE: REFINE & EDIT (Preview & Edit Visible) */}
              {customizeStep === 'edit' && (
                <div className="flex flex-col md:flex-row gap-6 animate-in slide-in-from-right-4 duration-500">
                  {/* Sidebar: Source Image Preview */}
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="sticky top-6">
                      <button
                        onClick={() => setCustomizeStep('style')}
                        className="mb-3 flex items-center text-sm text-indigo-600 font-medium hover:underline"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back to Styles
                      </button>
                      <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 aspect-[3/4] bg-gray-100 group">
                        <img src={`data:image/jpeg;base64,${selectedImage}`} className="w-full h-full object-cover" alt="Source" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={handleClear}
                            className="bg-white/90 hover:bg-white text-red-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform scale-95 group-hover:scale-100 transition-all"
                          >
                            Change Photo
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center font-medium backdrop-blur-sm">
                          Original Photo
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main: Configuration */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Finalize Details</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                          Style: {getSelectedStyleLabel()}
                        </span>
                      </div>

                      <PromptInput
                        value={customPrompt}
                        onChange={setCustomPrompt}
                        selectedStyleId={selectedStyleId}
                        socialData={socialData}
                        onSocialDataChange={setSocialData}
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        onClick={() => setCustomizeStep('style')}
                        className="py-4 px-6 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Generate Headshot
                        <Sparkles className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STATE 4: LOADING */}
          {loading && (
            <div className="h-[600px] flex flex-col items-center justify-center p-8 relative animate-in fade-in duration-700">
              {/* Background Ambience */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
              </div>

              <div className="relative z-10 w-full max-w-sm text-center">
                <div className="inline-flex relative mb-8">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-indigo-600 p-5 rounded-full shadow-xl">
                    <Sparkles className="w-10 h-10 text-white animate-spin-slow" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Creating Magic
                </h3>
                <p className="text-gray-500 mb-8">
                  Applying <span className="font-semibold text-indigo-600">{getSelectedStyleLabel()}</span> style to your photo...
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden border border-gray-200">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span className={progress > 10 ? 'text-indigo-600 transition-colors' : ''}>Analyzing</span>
                  <span className={progress > 50 ? 'text-indigo-600 transition-colors' : ''}>Generating</span>
                  <span className={progress > 90 ? 'text-indigo-600 transition-colors' : ''}>Finishing</span>
                </div>
              </div>
            </div>
          )}

          {/* STATE 5: RESULT */}
          {generatedImage && (
            <div className="p-8 flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Generation Complete</span>
              </div>

              <div className="w-full max-w-md">
                <ResultDisplay
                  image={generatedImage}
                  onReset={() => setGeneratedImage(null)}
                  onRegenerate={handleGenerate}
                />
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 w-full text-center">
                <p className="text-gray-500 text-sm mb-4">Not happy with the result?</p>
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="text-indigo-600 font-medium hover:underline text-sm"
                >
                  Back to Customization
                </button>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default App;