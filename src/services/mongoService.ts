import { Candidate, Job, User } from '../types';
import { mockCandidates, mockJobs } from '../data/mockData';
import { v4 as uuidv4 } from '../utils/uuid';
import { 
  getAllCandidates as firebaseGetAllCandidates,
  getCandidateById as firebaseGetCandidateById,
  getCandidateByGithubUsername as firebaseGetCandidateByGithubUsername,
  createCandidateInFirebase as firebaseCreateCandidate,
  updateCandidateInFirebase as firebaseUpdateCandidate,
  deleteCandidate as firebaseDeleteCandidate,
  
} from './candidateService';




// Flag to track if we should use Firebase
let useFirebase = true;

export const connectMongoDB = async () => {
  // Since we're using Firebase, always return true
  return true;
};

// Initialize database with mock data
export const initializeDatabase = async (mockCandidates: Candidate[], mockJobs: Job[]) => {
  try {
    console.log('Using Firebase Realtime Database instead of MongoDB');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
};

// User operations
  // Mock admin user
  
export const findUserByEmail = async (email: string) => {
  if (email === 'admin@example.com') {
    return {
      _id: 'admin-id',
      name: 'Admin User',
      email: email,
      password: '$2a$10$XQCg1z4YSl5K1PYqQVGE8eOGRjm0ZmvlVx5t5XGGbLJ9WfIrFJ3Aq', // hashed 'admin123'
      role: 'admin',
      createdAt: new Date().toISOString()
    };
  }



  return null;
};


export const createUser = async (userData: Partial<User>) => {
  return {
    _id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString()
  };
};

// Candidate operations
export const getAllCandidates = async () => {
  if (useFirebase) {
    try {
      console.log('Fetching candidates from Firebase');
      const candidates = await firebaseGetAllCandidates();
      console.log(`Retrieved ${candidates.length} candidates from Firebase`);
      return candidates;
    } catch (error) {
      console.error('Error fetching candidates from Firebase:', error);
      return [];
    }
  }
  return [];
};

export const getCandidateById = async (id: string) => {
  if (useFirebase) {
    try {
      return await firebaseGetCandidateById(id);
    } catch (error) {
      console.error('Error fetching candidate by ID from Firebase:', error);
      return null;
    }
  }
  return null;
};

export const getCandidateByGithubUsername = async (githubUsername: string) => {
  if (useFirebase) {
    try {
      return await firebaseGetCandidateByGithubUsername(githubUsername);
    } catch (error) {
      console.error('Error fetching candidate by GitHub username from Firebase:', error);
      return null;
    }
  }
  return null;
};

export const createCandidate = async (candidateData: Partial<Candidate>) => {
  if (useFirebase) {
    try {
      return await firebaseCreateCandidate(candidateData as Candidate);
    } catch (error) {
      console.error('Error creating candidate in Firebase:', error);
      return candidateData as Candidate;
    }
  }
  return candidateData as Candidate;
};

export const updateCandidate = async (id: string, candidateData: Partial<Candidate>) => {
  if (useFirebase) {
    try {
      return await firebaseUpdateCandidate(id, candidateData);
    } catch (error) {
      console.error('Error updating candidate in Firebase:', error);
      return null;
    }
  }
  return null;
};

export const deleteCandidate = async (id: string) => {
  if (useFirebase) {
    try {
      return await firebaseDeleteCandidate(id);
    } catch (error) {
      console.error('Error deleting candidate from Firebase:', error);
      return false;
    }
  }
  return true;
};

// Job operations
export const getAllJobs = async () => {
  if (useFirebase) {
    try {
      return await firebaseGetAllJobs();
    } catch (error) {
      console.error('Error fetching jobs from Firebase:', error);
      return mockJobs;
    }
  }
  return mockJobs;
};

export const getJobById = async (id: string) => {
  return mockJobs.find(j => j.id === id) || null;
};

export const createJob = async (jobData: Partial<Job>) => {
  return jobData as Job;
};

export const updateJob = async (id: string, jobData: Partial<Job>) => {
  const job = mockJobs.find(j => j.id === id);
  if (job) {
    return { ...job, ...jobData };
  }
  return null;
};

export const deleteJob = async (id: string) => {
  return true;
};