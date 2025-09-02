
export interface PromptTechnique {
  id: string;
  title: string;
  categoryKey: string;
  explanation: string;
  analogy: string;
  diagram: React.ReactNode;
  example: {
    prompt: string;
    template: string;
  };
}
