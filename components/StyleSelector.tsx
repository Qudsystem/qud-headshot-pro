import React from 'react';
import { Wand2 } from 'lucide-react';

export interface StyleOption {
  id: string;
  label: string;
  description: string;
  promptSuffix: string;
  icon: string; // Emoji character
  isPaid: boolean;
}

export const STYLES: StyleOption[] = [
  // --- Professional & Clean ---
  {
    id: 'corporate-pro',
    label: 'Corporate Pro',
    description: 'Professional studio headshot, grey backdrop, soft lighting',
    promptSuffix: 'professional corporate headshot, grey studio background, soft uniform lighting, confident expression, business attire, 85mm lens',
    icon: '👔',
    isPaid: false,
  },
  {
    id: 'minimalist-clean',
    label: 'Minimalist',
    description: 'Clean white aesthetic, high-key lighting, modern',
    promptSuffix: 'minimalist portrait, pure white background, high-key lighting, clean lines, modern aesthetic, soft shadows',
    icon: '📐',
    isPaid: false,
  },
  {
    id: 'bw-editorial',
    label: 'B&W Editorial',
    description: 'High contrast, magazine style, dramatic monochrome',
    promptSuffix: 'black and white photography, high contrast, editorial magazine style, dramatic lighting, sharp details, monochrome masterpiece',
    icon: '📰',
    isPaid: false,
  },
  
  // --- Fashion & Cinematic ---
  {
    id: 'fashion-editorial',
    label: 'Fashion Editorial',
    description: 'Studio lighting, perfect retouch, Vogue style',
    promptSuffix: 'fashion editorial shot, soft studio lighting, perfect skin retouch, 85mm lens portrait realism, magazine cover quality',
    icon: '👗',
    isPaid: true,
  },
  {
    id: 'cinematic-real',
    label: 'Cinematic Real',
    description: 'Movie scene lighting, 50mm lens, depth of field',
    promptSuffix: 'cinematic photorealistic shot, 50mm lens, shallow depth of field, dramatic movie lighting, color graded, emotional atmosphere',
    icon: '🎥',
    isPaid: true,
  },
  {
    id: 'vintage-film',
    label: 'Vintage Film',
    description: 'Retro Kodak look, grain, light leaks, nostalgic',
    promptSuffix: 'vintage film photography, kodak portra 400, film grain, light leaks, retro aesthetic, nostalgic mood, 90s style',
    icon: '🎞️',
    isPaid: false,
  },
  {
    id: 'luxury-beauty',
    label: 'Luxury Beauty',
    description: 'High-end retouch, glossy highlights, 4D depth',
    promptSuffix: 'luxury beauty retouch, glossy highlights, perfect skin microtexture, 4D depth lighting, cosmetic advertisement style',
    icon: '💎',
    isPaid: true,
  },

  // --- Artistic & Illustrative ---
  {
    id: 'ghibli-master',
    label: 'Ghibli Illustration',
    description: 'Authentic Studio Ghibli style, soft shading, magical',
    promptSuffix: 'Studio Ghibli Illustration Style. Create an illustration in the authentic Studio Ghibli style: soft painterly shading, rich handcrafted textures, cinematic lighting, anime-inspired proportions, expressive eyes, warm color palette, gentle gradients, detailed backgrounds, and whimsical fantasy atmosphere. Maintain natural skin tones, clean line art, and a magical storytelling mood. High detail, soft brush strokes, atmospheric depth, 4K output. (Avoid: distorted anatomy, harsh shadows, oversaturated colors, sharp 3D rendering, plastic textures, low detail, noise, messy lineart)',
    icon: '🎏',
    isPaid: true,
  },
  {
    id: 'ghibli-flat-2d',
    label: '2D Cartoon Ghibli',
    description: 'Clean 2D anime, cel shaded, character design',
    promptSuffix: 'Studio Ghibli 2D Cartoon Style. Create a high-quality 2D anime character portrait. Style: Hayao Miyazaki / Studio Ghibli character design. Key features: Clean black outlines, flat cel-shaded coloring, vibrant and warm colors, expressive anime eyes, simple nose and mouth. The image should look like a screencap from "Kiki\'s Delivery Service" or "My Neighbor Totoro". Hand-drawn 2D animation aesthetic. Background: detailed watercolor style background. (Avoid: 3D render, realistic skin texture, painterly heavy shading on face, noise, photorealism, semi-realism, cgi)',
    icon: '🍃',
    isPaid: true,
  },
  {
    id: 'watercolor-art',
    label: 'Watercolor',
    description: 'Soft brushstrokes, pastel colors, artistic paper',
    promptSuffix: 'artistic watercolor painting, soft brushstrokes, pastel colors, white background paper texture, dreamy, wet-on-wet technique',
    icon: '🎨',
    isPaid: false,
  },
  {
    id: 'marvel-comic',
    label: 'Marvel Comic',
    description: 'American comic ink, dynamic action, bold colors',
    promptSuffix: 'Marvel comic-style inking, dynamic action lines, bold saturated colors, dramatic hero poses, graphic novel aesthetic',
    icon: '💥',
    isPaid: true,
  },
  {
    id: 'shonen-anime',
    label: 'Shonen Anime',
    description: 'High-end anime, dynamic lighting, glowing effects',
    promptSuffix: 'cinematic shonen anime, dynamic lighting, crisp outlines, expressive action, glowing effects, high production value',
    icon: '🔥',
    isPaid: true,
  },

  // --- 3D & Creative ---
  {
    id: 'soft-blobs-3d',
    label: 'Soft Blobs 3D',
    description: 'Floating blobs, pastel gradients, friendly 3D cartoon',
    promptSuffix: 'Soft Blobs 3D Style. Generate a modern soft 3D cartoon design using floating blobs, rounded shapes, soft ambient lighting, pastel gradients, smooth materials, glossy reflections, minimal shadows, vibrant clean colors, and a gentle playful aesthetic. Characters should look friendly, rounded, expressive, and softly shaded with high-end UI illustration vibes. (Avoid: hard edges, sharp shadows, cluttered backgrounds, harsh lighting, grain, noise, plastic over-shine)',
    icon: '🫧',
    isPaid: true,
  },
  {
    id: 'claymorphic-3d',
    label: 'Claymorphic',
    description: 'Inflated clay forms, matte texture, modern 3D',
    promptSuffix: 'Claymorphic 3D Style. Create a claymorphic 3D illustration with soft, rounded shapes, inflated clay-like forms, subtle inner and outer shadows, matte clay texture, pastel colors, clean flat gradients, friendly cartoon proportions, smooth interfaces, and soft volumetric lighting. The scene should feel handcrafted and modern. (Avoid: sharp details, metallic textures, hard plastic surfaces, thin lines, overcomplicated backgrounds)',
    icon: '🧱',
    isPaid: true,
  },
  {
    id: 'realistic-clay',
    label: 'Realistic Clay',
    description: 'Stop-motion animation look, sculpted details',
    promptSuffix: 'Realistic Clay 3D Style. Design a realistic clay 3D character with smooth sculpted shapes, handcrafted clay texture, slight imperfections, natural matte finish, soft ambient shadows, warm lighting, and expressive facial features. Stop-motion clay animation look with clean modeling and cinematic depth. (Avoid: unnatural gloss, rigid details, metal, rubber-like surfaces, plastic textures)',
    icon: '🗿',
    isPaid: true,
  },
  {
    id: 'soft-3d-ui',
    label: 'Soft 3D UI',
    description: 'Modern SaaS aesthetic, floating elements, glossy',
    promptSuffix: 'Soft 3D UI Style. Generate a soft 3D UI illustration with rounded components, pastel gradients, smooth shadows, floating UI cards, minimal icons, modern SaaS aesthetic, soft volumetric lighting, glossy highlights, and clean tech-friendly colors. Maintain a polished, premium interface look with floating elements. (Avoid: harsh contrast, busy layout, saturated neon colors, heavy outlines, noise)',
    icon: '🔮',
    isPaid: true,
  },
  {
    id: 'pixar-3d',
    label: 'Pixar Character',
    description: '3D character, subsurface scattering, rim light',
    promptSuffix: 'Pixar-style 3D character, subsurface scattering, soft cinematic rim light, expressive stylized proportions, cute, 3D render',
    icon: '🧚‍♂️',
    isPaid: true,
  },
  {
    id: 'cyberpunk-neon',
    label: 'Cyberpunk',
    description: 'Neon glow, futuristic, night city, blue & pink',
    promptSuffix: 'cyberpunk neon future, night city background, neon glow, futuristic holograms, blue and pink lighting, high tech vibe',
    icon: '⚡',
    isPaid: true,
  },
  {
    id: 'isometric-ui',
    label: 'Isometric 3D',
    description: 'Tech illustration, smooth gradients, clean UI',
    promptSuffix: 'isometric 3D illustration, smooth gradients, soft depth, clean tech aesthetic, professional UI look, 3D icon style',
    icon: '🧊',
    isPaid: true,
  },
  {
    id: 'game-pbr',
    label: 'RPG Game Asset',
    description: 'Stylized PBR, fantasy textures, hero lighting',
    promptSuffix: 'stylized PBR game asset, fantasy texture detailing, sharp stylized edges, hero lighting, RPG character portrait',
    icon: '🛡️',
    isPaid: true,
  },

  // --- Specialty & Commercial ---
  {
    id: 'social-media-ad',
    label: 'Social Media Ad',
    description: 'EdTech/AI poster style, layered composition, modern',
    promptSuffix: 'Professional EdTech Social Media Poster Design. LAYERED COMPOSITION: [Background] Clean white and light blue gradient waves, soft abstract fluid shapes. [Graphics] A central stylized "AI Brain" circuit icon, surrounded by floating tech elements (microchips, code symbols, robot icons) in a balanced constellation. [Subject Integration] The person is prominently featured on the side, smiling, friendly, looking confident, seamlessly blended with professional lighting that matches the poster\'s clean aesthetic. [Typography Layout] Modern bold headline text layout area (simulated text), clear hierarchy, with a distinct green "Free" or "CTA" button badge. [Style] Corporate modern, educational technology vibe, vibrant blue and white palette with green accents, high-quality vector art style, 8k resolution.',
    icon: '📱',
    isPaid: true,
  },
  {
    id: 'luxury-gold',
    label: 'Luxury Gold',
    description: 'Gold accents, royal patterns, premium dark',
    promptSuffix: 'luxury gold aesthetic, black and gold palette, premium royal textures, elegant lighting, expensive atmosphere',
    icon: '👑',
    isPaid: true,
  },
  {
    id: 'arch-viz',
    label: 'Arch Viz 8K',
    description: 'Hyper-realistic architecture, PBR materials',
    promptSuffix: 'architectural 8K render, PBR materials, HDRI global illumination, realistic shadows, clean modern design, architectural visualization',
    icon: '🏛️',
    isPaid: true,
  },
  {
    id: 'dark-moody',
    label: 'Dark Moody',
    description: 'Rembrandt lighting, deep shadows, mystery',
    promptSuffix: 'dark moody dramatic lighting, rembrandt lighting, deep shadows, cinematic atmosphere, mystery, emotional portrait',
    icon: '🕯️',
    isPaid: false,
  },
];

interface StyleSelectorProps {
  selectedStyleId: string | null;
  onSelectStyle: (id: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelectStyle }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Wand2 className="w-4 h-4 text-indigo-600" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Select Style</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={`relative flex items-start p-3 rounded-xl border-2 text-left transition-all duration-200 group h-full
              ${selectedStyleId === style.id
                ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600 shadow-sm'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 hover:shadow-sm'}
            `}
          >
            <div className="text-2xl mr-3 select-none flex-shrink-0 mt-0.5 filter drop-shadow-sm">
              {style.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className={`font-semibold text-sm ${selectedStyleId === style.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                  {style.label}
                </p>
                {style.isPaid ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider ml-2 shadow-sm">
                     Pro
                  </span>
                ) : (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider ml-2">
                    Free
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                {style.description}
              </p>
            </div>
            {selectedStyleId === style.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-sm"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};