import { FormData } from '../types';

export async function generateEmail(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tone: formData.tone,
        contactName: formData.contactName,
        companyName: formData.companyName,
        summary: formData.summary,
        transcript: formData.transcript
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating email:', error);
    throw error;
  }
}