export interface FormData {
  summary: string;
  transcript?: string;
  contactName: string;
  companyName: string;
  tone: 'Friendly' | 'Formal' | 'Concise';
}

export interface EmailData {
  subject: string;
  body: string;
  summary: string;
  contactName: string;
  companyName: string;
  tone: string;
}

export interface EmailResponse {
  subject: string;
  body: string;
}