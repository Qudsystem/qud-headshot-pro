export interface HeadshotRequest {
  imageBase64: string;
  mimeType: string;
  prompt: string;
}

export interface HeadshotResponse {
  imageBase64: string;
}

export interface ApiOptions {
  provider?: 'gemini' | 'mock';
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiUsageInfo {
  requiresApiKey: boolean;
  envVar: string;
  docsUrl?: string;
}