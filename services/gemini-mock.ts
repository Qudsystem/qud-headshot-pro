/**
 * Mock/Demo version of the Gemini service for testing without API quota
 * This simulates the headshot generation process with a placeholder
 */

export const generateHeadshotMock = async (
    imageBase64: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    console.log('🎭 DEMO MODE - Using mock headshot generation');
    console.log('Prompt:', prompt);

    // Simulate API delay (realistic experience)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // In demo mode, we'll return a modified version of the original image
    // with a canvas overlay indicating it's a demo
    return createDemoImage(imageBase64, mimeType);
};

/**
 * Creates a demo/watermarked version of the uploaded image
 */
async function createDemoImage(base64: string, mimeType: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Add demo overlay/watermark
            ctx.fillStyle = 'rgba(99, 102, 241, 0.15)'; // Semi-transparent indigo
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add "DEMO MODE" text
            ctx.font = 'bold 48px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.9)';
            ctx.lineWidth = 4;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const text = 'DEMO MODE';
            const x = canvas.width / 2;
            const y = canvas.height / 2;

            ctx.strokeText(text, x, y);
            ctx.fillText(text, x, y);

            // Add subtitle
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            const subtitle = 'Add your Gemini API Key';
            ctx.strokeText(subtitle, x, y + 60);
            ctx.fillText(subtitle, x, y + 60);

            // Apply some basic image filters to simulate "processing"
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Slight brightness/contrast adjustment
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 1.1);     // R
                data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
                data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
            }

            ctx.putImageData(imageData, 0, 0);

            // Convert to base64 (without the data:image prefix)
            const dataUrl = canvas.toDataURL(mimeType);
            const base64Data = dataUrl.split(',')[1];

            resolve(base64Data);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image for demo processing'));
        };

        img.src = `data:${mimeType};base64,${base64}`;
    });
}
