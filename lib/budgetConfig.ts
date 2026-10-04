export const rfpBudgetConfig: Record<string, { label: string; hint: string; opts: string[] }> = {
  marketing:{label:'Estimated Monthly Marketing Budget',hint:'This helps us recommend the right marketing scope. Monthly retainers depend on channels, competition and growth goals.',opts:['Not sure yet — I need guidance','Under $1,000/mo','$1,000 - $2,500/mo','$2,500 - $5,000/mo','$5,000 - $10,000/mo','$10,000 - $25,000/mo','$25,000+/mo']},
  website:{label:'Estimated Project Budget',hint:'This helps us recommend the right website or ecommerce scope. Final cost depends on pages, features, integrations and checkout.',opts:['Not sure yet — I need guidance','Under $2,500','$2,500 - $5,000','$5,000 - $10,000','$10,000 - $25,000','$25,000 - $50,000','$50,000+']},
  app:{label:'Estimated Project Budget',hint:'Apps, AI systems and custom software are scoped based on features, platforms, integrations and launch requirements.',opts:['Not sure yet — I need guidance','Under $5,000','$5,000 - $10,000','$10,000 - $25,000','$25,000 - $50,000','$50,000 - $100,000','Above $100,000','I have a fixed budget — I will share it on the call']},
  hybrid:{label:'Estimated Project & Marketing Budget',hint:'Hybrid projects include an initial build plus ongoing marketing.',opts:['Not sure yet — I need guidance','Under $5,000','$5,000 - $10,000','$10,000 - $25,000','$25,000 - $50,000','$50,000+','I have a fixed budget — I will share it on the call']},
  unsure:{label:'Estimated Investment Range (Optional)',hint:'No problem. Choose the closest option and describe your goals below.',opts:['Not sure yet — I need guidance','I have a small starting budget','I have a moderate growth budget','I have a serious launch/scaling budget','I prefer to discuss on a call']}
};

export const defaultRfpBudgetOpts: string[] = [
  'Not sure yet — I need guidance',
  'Under $1,000/mo',
  '$1,000 - $2,500/mo',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'I prefer to discuss on a call'
];

export const cfBudgetConfig: Record<string, { label: string; hint: string; opts: string[] }> = {
  marketing:{label:'Estimated Monthly Marketing Budget',hint:'This helps us recommend the right marketing scope and channels.',opts:['Not sure yet — I need guidance','Under $1,000/mo','$1,000 - $2,500/mo','$2,500 - $5,000/mo','$5,000 - $10,000/mo','$10,000 - $25,000/mo','$25,000+/mo']},
  website:{label:'Estimated Project Budget',hint:'Final cost depends on pages, features, integrations, checkout and SEO structure.',opts:['Not sure yet — I need guidance','Under $2,500','$2,500 - $5,000','$5,000 - $10,000','$10,000 - $25,000','$25,000 - $50,000','$50,000+']},
  app:{label:'Estimated Project Budget',hint:'Apps, AI and custom software are scoped by features, platforms and requirements.',opts:['Not sure yet — I need guidance','Under $5,000','$5,000 - $10,000','$10,000 - $25,000','$25,000 - $50,000','$50,000 - $100,000','Above $100,000']},
  unsure:{label:'Estimated Investment Range (Optional)',hint:'Choose the closest option and describe your goals in the message box.',opts:['Not sure yet — I need guidance','Small starting budget','Moderate growth budget','Serious launch/scaling budget','I prefer to discuss on a call']}
};
