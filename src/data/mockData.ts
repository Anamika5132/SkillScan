import { Candidate, Job } from '../types';

// Empty array for candidates - we'll only use real data from the database
export const mockCandidates: Candidate[] = [];

export const mockJobs: Job[] = [
  // Frontend Jobs
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    requiredSkills: ['React', 'TypeScript', 'GraphQL'],
    description: 'We are looking for a Senior Frontend Developer to join our team and help build our next-generation web applications.',
    candidates: 12,
    position: 'frontend',
    salary: '$120,000 - $150,000',
    experience: '5+ years',
    remote: true
  },
  {
    id: '2',
    title: 'React Developer',
    department: 'Product',
    location: 'San Francisco, CA',
    requiredSkills: ['React', 'JavaScript', 'CSS'],
    description: 'Join our product team to build beautiful and responsive user interfaces using React.',
    candidates: 8,
    position: 'frontend',
    salary: '$100,000 - $130,000',
    experience: '3+ years',
    remote: false
  },
  {
    id: '3',
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    requiredSkills: ['JavaScript', 'Vue.js', 'Webpack'],
    description: 'Looking for a talented Frontend Engineer to help us build and maintain our Vue.js applications.',
    candidates: 6,
    position: 'frontend',
    salary: '$110,000 - $140,000',
    experience: '4+ years',
    remote: false
  },
  {
    id: '4',
    title: 'UI Developer',
    department: 'Design',
    location: 'Remote',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    description: 'Work closely with our design team to implement pixel-perfect user interfaces.',
    candidates: 10,
    position: 'frontend',
    salary: '$90,000 - $120,000',
    experience: '2+ years',
    remote: true
  },
  {
    id: '5',
    title: 'Angular Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    requiredSkills: ['Angular', 'TypeScript', 'RxJS'],
    description: 'Join our team to build and maintain enterprise-grade Angular applications.',
    candidates: 5,
    position: 'frontend',
    salary: '$100,000 - $130,000',
    experience: '3+ years',
    remote: false
  },
  // Backend Jobs
  {
    id: '11',
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    requiredSkills: ['Node.js', 'Python', 'AWS'],
    description: 'Join our backend team to design and implement scalable APIs and services.',
    candidates: 8,
    position: 'backend',
    salary: '$130,000 - $160,000',
    experience: '5+ years',
    remote: false
  },
  {
    id: '12',
    title: 'Java Developer',
    department: 'Engineering',
    location: 'Remote',
    requiredSkills: ['Java', 'Spring Boot', 'Microservices'],
    description: 'Build and maintain our Java-based microservices architecture.',
    candidates: 7,
    position: 'backend',
    salary: '$120,000 - $150,000',
    experience: '4+ years',
    remote: true
  },
  {
    id: '13',
    title: 'Python Backend Developer',
    department: 'Data',
    location: 'New York, NY',
    requiredSkills: ['Python', 'Django', 'PostgreSQL'],
    description: 'Develop and maintain our data processing pipelines and APIs.',
    candidates: 9,
    position: 'backend',
    salary: '$110,000 - $140,000',
    experience: '3+ years',
    remote: false
  },
  // Fullstack Jobs
  {
    id: '21',
    title: 'Full Stack Developer',
    department: 'Product',
    location: 'New York, NY',
    requiredSkills: ['React', 'Node.js', 'MongoDB'],
    description: 'Looking for a versatile developer who can work across the entire stack to deliver features end-to-end.',
    candidates: 15,
    position: 'fullstack',
    salary: '$120,000 - $150,000',
    experience: '4+ years',
    remote: false
  },
  {
    id: '22',
    title: 'MERN Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    requiredSkills: ['MongoDB', 'Express', 'React', 'Node.js'],
    description: 'Build and maintain our MERN stack applications.',
    candidates: 10,
    position: 'fullstack',
    salary: '$110,000 - $140,000',
    experience: '3+ years',
    remote: true
  }
];