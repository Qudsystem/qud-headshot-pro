import React from 'react';
import { MessageSquarePlus, Type, Palette, LayoutTemplate, Plus } from 'lucide-react';

export interface SocialMediaData {
  headline: string;
  topic: string;
  colorTheme: string;
}

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedStyleId: string | null;
  socialData: SocialMediaData;
  onSocialDataChange: (data: SocialMediaData) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  selectedStyleId,
  socialData,
  onSocialDataChange
}) => {
  const isSocialMedia = selectedStyleId === 'social-media-ad';

  const QUICK_ACTIONS = [
    "Make me smile",
    "Fix lighting",
    "Remove glasses",
    "Business casual",
    "Blue background"
  ];

  const handleAddQuickAction = (action: string) => {
    const newValue = value ? `${value}, ${action}` : action;
    onChange(newValue);
  };

  const handleSocialChange = (key: keyof SocialMediaData, val: string) => {
    onSocialDataChange({ ...socialData, [key]: val });
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2">
        <MessageSquarePlus className="w-4 h-4 text-indigo-600" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {isSocialMedia ? 'Design Configuration' : 'Custom Edits (Optional)'}
        </h3>
      </div>

      {/* Social Media Structured Inputs */}
      {isSocialMedia && (
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-1">
                <Type className="w-3 h-3" /> Headline Text (Crucial)
              </label>
              <input
                type="text"
                value={socialData.headline}
                onChange={(e) => handleSocialChange('headline', e.target.value)}
                placeholder="e.g., SALE 50% OFF"
                className="w-full px-3 py-2 rounded-lg border border-indigo-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-1">
                <Palette className="w-3 h-3" /> Color Theme
              </label>
              <select
                value={socialData.colorTheme}
                onChange={(e) => handleSocialChange('colorTheme', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-indigo-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="Modern Blue & White">Modern Blue & White</option>
                <option value="Vibrant & Colorful">Vibrant & Colorful</option>
                <option value="Dark Mode & Neon">Dark Mode & Neon</option>
                <option value="Minimalist Black & White">Minimalist Black & White</option>
                <option value="Corporate Navy & Gold">Corporate Navy & Gold</option>
                <option value="Warm & Cozy">Warm & Cozy</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-1">
              <LayoutTemplate className="w-3 h-3" /> Ad Context / Topic
            </label>
            <input
              type="text"
              value={socialData.topic}
              onChange={(e) => handleSocialChange('topic', e.target.value)}
              placeholder="e.g., Launching a new AI course, Summer Sale, Personal Branding..."
              className="w-full px-3 py-2 rounded-lg border border-indigo-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      )}

      {/* Quick Actions (Visible for standard styles) */}
      {!isSocialMedia && (
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action}
              onClick={() => handleAddQuickAction(action)}
              className="text-xs font-medium bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 px-3 py-1.5 rounded-full border border-gray-200 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              {action}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isSocialMedia 
            ? "Any extra details? (e.g., 'Place me on the right', 'Add floating code icons')..." 
            : "Describe specific changes... (e.g. 'Make me smile more', 'Change background to office')"}
          className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none h-24 text-sm shadow-sm transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 pointer-events-none">
          Gemini 2.5 Flash Image
        </div>
      </div>
    </div>
  );
};