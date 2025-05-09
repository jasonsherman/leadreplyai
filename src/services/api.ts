import { EmailResponse, FormData } from '../types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateEmail(formData: FormData): Promise<any> {
  try {
    const prompt = constructPrompt(formData);
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Lead Reply AI'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-prover-v2:free',
        messages: [
          {
            role: 'system',
            content: 'You are a sales professional writing a follow-up email. Write in a natural, conversational style with two clear paragraphs. The first paragraph should acknowledge the conversation and show understanding of their needs. The second paragraph should focus on specific next steps and solutions. End with a clear, actionable call to action on its own line, followed by "Best regards," and a blank line for the signature. Keep it concise and personal. Do not include any placeholders or instructions in the output.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate email');
    }

    const data = await response.json();
    const emailContent = parseEmailResponse(data.choices[0].message.content);

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

function constructPrompt(formData: FormData): string {
  let prompt = `Write a ${formData.tone.toLowerCase()} follow-up email to ${formData.contactName} from ${formData.companyName}.

Conversation Summary:
${formData.summary}`;

  if (formData.transcript) {
    prompt += `\n\nChat Transcript:\n${formData.transcript}`;
  }

  prompt += '\n\nWrite a natural email with two clear paragraphs. The first paragraph should acknowledge the conversation and show understanding. The second paragraph should focus on specific next steps. End with a clear, actionable call to action on its own line. Sign off with "Best regards," followed by a blank line for the signature.';

  return prompt;
}

function parseEmailResponse(responseText: string): EmailResponse {
  const subjectMatch = responseText.match(/Subject:\s*(.*?)(?:\n|$)/);
  const bodyMatch = responseText.match(/(?:Hi|Hello|Dear).*?(?:Best regards,|$)/s);

  const subject = subjectMatch ? subjectMatch[1].trim() : 'Follow-up on our conversation';
  const body = bodyMatch ? bodyMatch[0].trim() : responseText;

  return { subject, body };
}