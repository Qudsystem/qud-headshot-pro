import { HeadshotRequest, HeadshotResponse, ApiOptions, ApiError, ApiUsageInfo } from '../types/api';
import { generateHeadshot } from './gemini';
import { generateHeadshotMock } from './gemini-mock';

const hasGeminiKey = () => {
  // Prefer Vite env, fallback to process.env for test environments
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  const nodeKey = (typeof process !== 'undefined' ? process.env.VITE_GEMINI_API_KEY : undefined);
  const key = viteKey ?? nodeKey;
  return !!key && key !== '' && key !== 'your_api_key_here';
};

export const getApiUsageInfo = (): ApiUsageInfo => ({
  requiresApiKey: true,
  envVar: 'VITE_GEMINI_API_KEY',
  docsUrl: 'https://ai.google.dev/gemini-api/docs',
});

export async function generateHeadshotApi(
  req: HeadshotRequest,
  options?: ApiOptions
): Promise<HeadshotResponse> {
  const provider = options?.provider ?? (hasGeminiKey() ? 'gemini' : 'mock');

  try {
    const result = provider === 'gemini'
      ? await generateHeadshot(req.imageBase64, req.mimeType, req.prompt)
      : await generateHeadshotMock(req.imageBase64, req.mimeType, req.prompt);

    return { imageBase64: result };
  } catch (e: any) {
    const err: ApiError = {
      code: inferErrorCode(e?.message),
      message: e?.message || 'Generation failed',
    };
    throw err;
  }
}

function inferErrorCode(message?: string): string {
  if (!message) return 'UNKNOWN_ERROR';
  if (message.includes('quota') || message.includes('429')) return 'QUOTA_EXCEEDED';
  if (message.includes('API key') || message.includes('API_KEY_INVALID') || message.includes('Unauthorized')) return 'AUTH_ERROR';
  if (message.includes('No image data') || message.includes('Failed to generate image')) return 'GENERATION_ERROR';
  return 'UNKNOWN_ERROR';
}