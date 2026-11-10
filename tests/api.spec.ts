import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateHeadshotApi, getApiUsageInfo } from '../services/api';

// Mock env
const setGeminiKey = (value: string | undefined) => {
  // @ts-ignore
  import.meta.env = { ...(import.meta.env || {}), VITE_GEMINI_API_KEY: value };
};

// Mock underlying services
vi.mock('../services/gemini', () => ({
  generateHeadshot: vi.fn(async () => 'base64-from-gemini'),
}));

vi.mock('../services/gemini-mock', () => ({
  generateHeadshotMock: vi.fn(async () => 'base64-from-mock'),
}));

describe('API service', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns usage info with env var name', () => {
    const info = getApiUsageInfo();
    expect(info.envVar).toBe('VITE_GEMINI_API_KEY');
    expect(info.requiresApiKey).toBe(true);
  });

  it('uses mock when API key missing', async () => {
    setGeminiKey(undefined);
    const res = await generateHeadshotApi({ imageBase64: 'x', mimeType: 'image/png', prompt: 'p' });
    expect(res.imageBase64).toBe('base64-from-mock');
  });

  it('uses gemini when API key present', async () => {
    setGeminiKey('AIzaSyValidKey');
    const res = await generateHeadshotApi({ imageBase64: 'x', mimeType: 'image/png', prompt: 'p' });
    expect(res.imageBase64).toBe('base64-from-gemini');
  });

  it('propagates typed errors', async () => {
    setGeminiKey('AIzaSyValidKey');
    const { generateHeadshot } = await import('../services/gemini');
    // @ts-ignore
    generateHeadshot.mockRejectedValueOnce(new Error('API_KEY_INVALID'));
    await expect(generateHeadshotApi({ imageBase64: 'x', mimeType: 'image/png', prompt: 'p' }))
      .rejects.toMatchObject({ code: 'AUTH_ERROR' });
  });
});