export type Collection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
};

export const collections: Collection[] = [
  { id: "col_1", name: "React Patterns", description: "Reusable React component patterns", isFavorite: true },
  { id: "col_2", name: "AI Prompt Engineering", description: "Prompts for GPT, Claude, and Gemini", isFavorite: false },
  { id: "col_3", name: "DevOps Scripts", description: "Deployment and infrastructure scripts", isFavorite: false },
  { id: "col_4", name: "Interview Prep", description: "Coding interview questions and answers", isFavorite: false },
];
