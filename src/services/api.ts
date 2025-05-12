import { EmailResponse, FormData } from '../types';

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
    const emailContent = parseEmailResponse(data.email);

    return {
      ...emailContent,
      summary: formData.summary,
      contactName: formData.contactName,
      companyName: formData.companyName,
      tone: formData.tone
    };
  } catch (error) {
    console.error('Error generating email:', error);
    throw error;
  }
}

function parseEmailResponse(responseText: string): EmailResponse {
  const subjectMatch = responseText.match(/Subject:\s*(.*?)(?:\n|$)/);
  const bodyMatch = responseText.match(/(?:Hi|Hello|Dear).*?(?:Best regards,|$)/s);

  const subject = subjectMatch ? subjectMatch[1].trim() : 'Follow-up on our conversation';
  const body = bodyMatch ? bodyMatch[0].trim() : responseText;

  return { subject, body };
}