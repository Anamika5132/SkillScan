import { CommitMetrics } from '../types';

/**
 * Get strengths and weaknesses based on position and metrics
 */
export const getPositionStrengthsWeaknesses = (metrics: CommitMetrics, position: string) => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Common metrics evaluation - with lower thresholds for consistency
  if (metrics.codeQualityScore >= 75) {
    strengths.push('High code quality score indicates well-structured and maintainable code');
  } else if (metrics.codeQualityScore < 60) {
    weaknesses.push('Code quality metrics suggest room for improvement in code structure and maintainability');
  }
  
  // Lower threshold for consistency score
  if (metrics.consistencyScore >= 70) {
    strengths.push('Consistent contribution pattern shows reliability and dedication');
  } else if (metrics.consistencyScore < 50) {
    weaknesses.push('Inconsistent contribution pattern may indicate sporadic engagement');
  }
  
  if (metrics.collaborationScore >= 75) {
    strengths.push('Strong collaboration metrics suggest good teamwork abilities');
  } else if (metrics.collaborationScore < 60) {
    weaknesses.push('Lower collaboration score may indicate limited experience with team projects');
  }
  
  if (metrics.technicalDiversityScore >= 75) {
    strengths.push('Excellent technical diversity shows adaptability across different technologies');
  } else if (metrics.technicalDiversityScore < 60) {
    weaknesses.push('Limited technical diversity may restrict versatility in different project contexts');
  }
  
  // Position-specific evaluation
  switch (position) {
    case 'frontend':
      evaluateFrontendDeveloper(metrics, strengths, weaknesses);
      break;
    case 'backend':
      evaluateBackendDeveloper(metrics, strengths, weaknesses);
      break;
    case 'fullstack':
      evaluateFullstackDeveloper(metrics, strengths, weaknesses);
      break;
    case 'webdesigner':
      evaluateWebDesigner(metrics, strengths, weaknesses);
      break;
    case 'uxui':
      evaluateUXUIDesigner(metrics, strengths, weaknesses);
      break;
    case 'devops':
      evaluateDevOpsEngineer(metrics, strengths, weaknesses);
      break;
    default:
      // Default case, no additional evaluations
      break;
  }
  
  // Ensure we have at least 3 strengths and weaknesses
  ensureMinimumFeedback(strengths, weaknesses, position);
  
  return { strengths, weaknesses };
};

/**
 * Evaluate frontend developer specific metrics
 */
const evaluateFrontendDeveloper = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for frontend languages
  const hasJavaScript = hasLanguage(metrics, 'JavaScript');
  const hasTypeScript = hasLanguage(metrics, 'TypeScript');
  const hasHTML = hasLanguage(metrics, 'HTML');
  const hasCSS = hasLanguage(metrics, 'CSS');
  const hasReactOrVue = hasLanguage(metrics, 'React') || hasLanguage(metrics, 'Vue');
  
  if (hasJavaScript || hasTypeScript) {
    strengths.push('Proficient in JavaScript/TypeScript, essential for frontend development');
  } else {
    weaknesses.push('Limited evidence of JavaScript/TypeScript usage, which is crucial for frontend roles');
  }
  
  if (hasHTML && hasCSS) {
    strengths.push('Experience with HTML and CSS demonstrates fundamental frontend skills');
  } else {
    weaknesses.push('More focus on HTML/CSS would strengthen frontend capabilities');
  }
  
  if (hasReactOrVue) {
    strengths.push('Experience with modern frontend frameworks (React/Vue) is valuable for complex UIs');
  } else {
    weaknesses.push('Consider gaining experience with popular frontend frameworks like React or Vue');
  }
  
  if (metrics.consistencyScore > metrics.technicalDiversityScore + 20) {
    weaknesses.push('While consistency is strong, expanding technical diversity would be beneficial for frontend roles');
  }
};

/**
 * Evaluate backend developer specific metrics
 */
const evaluateBackendDeveloper = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for backend languages
  const hasServerLanguages = hasAnyLanguage(metrics, ['Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', 'Node']);
  const hasSQL = hasLanguage(metrics, 'SQL');
  const hasJavaScript = hasLanguage(metrics, 'JavaScript') || hasLanguage(metrics, 'TypeScript');
  
  if (hasServerLanguages) {
    strengths.push('Experience with server-side languages suitable for backend development');
  } else {
    weaknesses.push('Limited evidence of server-side programming languages in repositories');
  }
  
  if (hasSQL) {
    strengths.push('Knowledge of SQL indicates database management capabilities');
  } else {
    weaknesses.push('Consider strengthening database skills for backend roles');
  }
  
  if (hasJavaScript && !hasServerLanguages) {
    weaknesses.push('While JavaScript knowledge is useful, more focus on backend technologies would be beneficial');
  }
  
  if (metrics.codeQualityScore > 70 && metrics.consistencyScore > 70) {
    strengths.push('High code quality and consistency are excellent traits for backend development');
  }
};

/**
 * Evaluate fullstack developer specific metrics
 */
const evaluateFullstackDeveloper = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for fullstack balance
  const hasFrontendLanguages = hasAnyLanguage(metrics, ['JavaScript', 'TypeScript', 'HTML', 'CSS']);
  const hasBackendLanguages = hasAnyLanguage(metrics, ['Python', 'Java', 'Go', 'Ruby', 'PHP', 'C#', 'Node']);
  
  if (hasFrontendLanguages && hasBackendLanguages) {
    strengths.push('Balanced experience with both frontend and backend technologies');
  } else if (hasFrontendLanguages) {
    weaknesses.push('Strong frontend skills, but could benefit from more backend experience');
  } else if (hasBackendLanguages) {
    weaknesses.push('Strong backend skills, but could benefit from more frontend experience');
  } else {
    weaknesses.push('Consider developing both frontend and backend skills for fullstack roles');
  }
  
  if (metrics.technicalDiversityScore >= 70) {
    strengths.push('Excellent technical diversity is ideal for fullstack development');
  } else {
    weaknesses.push('Expanding technical diversity would strengthen fullstack capabilities');
  }
  
  if (metrics.collaborationScore >= 70) {
    strengths.push('Good collaboration skills are valuable for fullstack roles that bridge different teams');
  }
};

/**
 * Evaluate web designer specific metrics
 */
const evaluateWebDesigner = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for design-related languages
  const hasHTML = hasLanguage(metrics, 'HTML');
  const hasCSS = hasLanguage(metrics, 'CSS') || hasLanguage(metrics, 'SCSS') || hasLanguage(metrics, 'Less');
  const hasJavaScript = hasLanguage(metrics, 'JavaScript');
  
  if (hasHTML && hasCSS) {
    strengths.push('Strong foundation in HTML and CSS, essential for web design');
  } else {
    weaknesses.push('More focus on HTML and CSS would be beneficial for web design roles');
  }
  
  if (hasJavaScript) {
    strengths.push('JavaScript knowledge enhances ability to create interactive designs');
  } else {
    weaknesses.push('Adding JavaScript skills would strengthen interactive design capabilities');
  }
  
  if (metrics.collaborationScore >= 70) {
    strengths.push('Good collaboration indicates ability to work effectively with developers and stakeholders');
  }
  
  if (metrics.consistencyScore < 60) {
    weaknesses.push('More consistent contribution patterns would demonstrate reliability in design work');
  }
};

/**
 * Evaluate UX/UI designer specific metrics
 */
const evaluateUXUIDesigner = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for UX/UI related skills
  const hasCSS = hasLanguage(metrics, 'CSS') || hasLanguage(metrics, 'SCSS');
  const hasJavaScript = hasLanguage(metrics, 'JavaScript');
  
  if (hasCSS) {
    strengths.push('CSS experience indicates understanding of styling and visual design');
  } else {
    weaknesses.push('Strengthening CSS skills would be valuable for UI design');
  }
  
  if (hasJavaScript) {
    strengths.push('JavaScript knowledge enables creation of interactive prototypes');
  } else {
    weaknesses.push('Adding JavaScript skills would enhance ability to create interactive UI components');
  }
  
  if (metrics.collaborationScore >= 75) {
    strengths.push('Strong collaboration skills are essential for UX/UI designers working with diverse stakeholders');
  } else if (metrics.collaborationScore < 65) {
    weaknesses.push('Improving collaboration would enhance effectiveness in UX/UI design roles');
  }
  
  if (metrics.technicalDiversityScore < 65) {
    weaknesses.push('Expanding technical diversity would provide more tools for UX/UI design challenges');
  }
};

/**
 * Evaluate DevOps engineer specific metrics
 */
const evaluateDevOpsEngineer = (metrics: CommitMetrics, strengths: string[], weaknesses: string[]) => {
  // Check for DevOps related skills
  const hasScriptingLanguages = hasAnyLanguage(metrics, ['Python', 'Shell', 'Ruby', 'Go']);
  const hasInfrastructureAsCode = hasAnyLanguage(metrics, ['YAML', 'HCL', 'Terraform', 'Docker']);
  
  if (hasScriptingLanguages) {
    strengths.push('Experience with scripting languages is valuable for automation in DevOps');
  } else {
    weaknesses.push('Adding scripting language skills would strengthen DevOps capabilities');
  }
  
  if (hasInfrastructureAsCode) {
    strengths.push('Knowledge of infrastructure as code tools indicates modern DevOps practices');
  } else {
    weaknesses.push('Consider gaining experience with infrastructure as code tools');
  }
  
  if (metrics.consistencyScore >= 70) {
    strengths.push('High consistency is excellent for maintaining reliable infrastructure');
  } else if (metrics.consistencyScore < 60) {
    weaknesses.push('Improving consistency would be beneficial for DevOps reliability');
  }
  
  if (metrics.codeQualityScore >= 70) {
    strengths.push('Good code quality suggests ability to create maintainable automation scripts');
  }
};

/**
 * Check if metrics include a specific language
 */
const hasLanguage = (metrics: CommitMetrics, language: string): boolean => {
  return metrics.languageDistribution.some(lang => 
    lang.language.toLowerCase().includes(language.toLowerCase()) && lang.percentage > 0.05
  );
};

/**
 * Check if metrics include any of the specified languages
 */
const hasAnyLanguage = (metrics: CommitMetrics, languages: string[]): boolean => {
  return languages.some(language => hasLanguage(metrics, language));
};

/**
 * Ensure we have at least 3 strengths and weaknesses
 */
const ensureMinimumFeedback = (strengths: string[], weaknesses: string[], position: string) => {
  // Generic strengths to add if needed
  const genericStrengths = [
    'Shows dedication to coding through regular GitHub activity',
    'Demonstrates ability to work on multiple projects',
    'Has experience with version control best practices',
    'Shows initiative through personal projects',
    'Maintains active engagement with the development community'
  ];
  
  // Generic weaknesses to add if needed
  const genericWeaknesses = [
    `Could benefit from more experience with technologies common in ${position} roles`,
    'Consider contributing to more open source projects to demonstrate collaboration',
    'More diverse project types would showcase adaptability',
    'Building a more consistent contribution pattern would demonstrate reliability',
    'Consider showcasing more complex projects that demonstrate problem-solving abilities'
  ];
  
  // Add generic strengths if needed
  while (strengths.length < 3) {
    const newStrength = genericStrengths[strengths.length % genericStrengths.length];
    if (!strengths.includes(newStrength)) {
      strengths.push(newStrength);
    } else {
      break; // Avoid infinite loop if all generic strengths are already used
    }
  }
  
  // Add generic weaknesses if needed
  while (weaknesses.length < 3) {
    const newWeakness = genericWeaknesses[weaknesses.length % genericWeaknesses.length];
    if (!weaknesses.includes(newWeakness)) {
      weaknesses.push(newWeakness);
    } else {
      break; // Avoid infinite loop if all generic weaknesses are already used
    }
  }
};