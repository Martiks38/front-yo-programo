interface EffectDecrypting {
  animate(): void;
  decryptLetter(options: OptionsEffect, count: number): void;
  encryptText(): string;
  generateRandomLetter(): string;
}

interface Knowledge {
  knowledge_id?: number;
  name_knowledge: string;
  url_img: string;
}

interface OptionsEffect {
  letter: string;
  elementLetter: HTMLElement;
}

interface Project {
  project_id?: number;
  description: string;
  made?: string;
  title: string;
  url_page: string;
  url_code: string;
  url_img: string;
}

interface Action<T> {
  action: string;
  element: T;
}

export { Action, EffectDecrypting, Knowledge, OptionsEffect, Project };
