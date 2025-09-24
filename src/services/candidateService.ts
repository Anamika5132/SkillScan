// candidateService.ts

import { Candidate, AnalysisResult } from '../types';
import { v4 as uuidv4 } from '../utils/uuid';

import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { app,firestore  } from './firebase';

const db = firestore

// In-memory candidates cache
let candidates: Candidate[] = [];

/**
 * Fetch all candidates from Firestore
 */
export const fetchAllCandidates = async (): Promise<Candidate[]> => {
  const q = query(collection(db, 'candidates'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Candidate));
};

/**
 * Fetch a candidate by ID from Firestore
 */
export const fetchCandidateById = async (id: string): Promise<Candidate | undefined> => {
  const docRef = doc(db, 'candidates', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Candidate;
  }
  return undefined;
};

/**
 * Fetch a candidate by GitHub username
 */
export const getCandidateByGithubUsername = async (githubUsername: string): Promise<Candidate | undefined> => {
  const q = query(collection(db, 'candidates'), where('githubUsername', '==', githubUsername));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Candidate;
  }
  return undefined;
};

/**
 * Create a candidate document in Firestore
 */
export async function createCandidateInFirebase(candidateData: Candidate): Promise<string> {
  const docRef = await addDoc(collection(db, 'candidates'), candidateData);
  return docRef.id;
}

/**
 * Update candidate document in Firestore
 */
export const updateCandidateInFirebase = async (id: string, updatedData: Partial<Candidate>): Promise<Candidate | undefined> => {
  const docRef = doc(db, 'candidates', id);
  await updateDoc(docRef, updatedData);
  const updatedDoc = await getDoc(docRef);
  if (updatedDoc.exists()) {
    return { id: updatedDoc.id, ...updatedDoc.data() } as Candidate;
  }
  return undefined;
};

/**
 * Delete candidate document from Firestore
 */
export const deleteCandidateInFirebase = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'candidates', id));
    return true;
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return false;
  }
};

/**
 * Get all candidates (from Firestore or in-memory cache)
 */
export const getAllCandidates = async (): Promise<Candidate[]> => {
  try {
    const dbCandidates = await fetchAllCandidates();
    if (dbCandidates.length > 0) {
      candidates = dbCandidates;
      return dbCandidates;
    }
    return candidates;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return candidates;
  }
};

/**
 * Get candidate by ID (Firestore or cache)
 */
export const getCandidateById = async (id: string): Promise<Candidate | undefined> => {
  try {
    const dbCandidate = await fetchCandidateById(id);
    if (dbCandidate) {
      return dbCandidate;
    }
    return candidates.find(c => c.id === id);
  } catch (error) {
    console.error('Error fetching candidate by ID:', error);
    return candidates.find(c => c.id === id);
  }
};

/**
 * Add or update candidate from analysis result
 */
export const addCandidateFromAnalysis = async (analysisResult: AnalysisResult): Promise<Candidate> => {
  const { profile, metrics, matchScore, benchmark } = analysisResult;

  // Try to find existing candidate
  let existingCandidate = candidates.find(c => c.githubUsername === profile.githubUsername);

  if (!existingCandidate) {
    try {
      existingCandidate = await getCandidateByGithubUsername(profile.githubUsername);
    } catch (error) {
      console.warn('Error checking existing candidate:', error);
    }
  }

  if (existingCandidate) {
    // Update candidate
    const updatedCandidateData: Candidate = {
      ...existingCandidate,
      matchScore,
      commitMetrics: metrics,
      position: benchmark,
    };
    try {
      await updateCandidateInFirebase(existingCandidate.id, updatedCandidateData);
    } catch (error) {
      console.error('Error updating candidate in Firebase:', error);
    }
    candidates = candidates.map(c =>
      c.githubUsername === profile.githubUsername ? updatedCandidateData : c
    );
    return updatedCandidateData;
  } else {
    // Create new candidate
    const newCandidate: Candidate = {
      id: uuidv4(),
      name: profile.name || profile.githubUsername,
      email: profile.email || `${profile.githubUsername}@example.com`,
      githubUsername: profile.githubUsername,
      avatarUrl: profile.avatarUrl,
      matchScore,
      status: 'pending',
      commitMetrics: metrics,
      createdAt: new Date().toISOString(),
      position: benchmark,
    };
    try {
      await createCandidateInFirebase(newCandidate);
    } catch (error) {
      console.error('Error creating candidate in Firebase:', error);
    }
    candidates = [newCandidate, ...candidates];
    return newCandidate;
  }
};

/**
 * Update candidate status
 */
export const updateCandidateStatus = async (
  id: string,
  status: 'pending' | 'reviewed' | 'hired' | 'rejected'
): Promise<Candidate | undefined> => {
  try {
    const updatedCandidate = await updateCandidateInFirebase(id, { status });
    candidates = candidates.map(c => (c.id === id ? { ...c, status } : c));
    return updatedCandidate || candidates.find(c => c.id === id);
  } catch (error) {
    console.error('Error updating candidate status:', error);
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      const updatedCandidate = { ...candidate, status };
      candidates = candidates.map(c => (c.id === id ? updatedCandidate : c));
      return updatedCandidate;
    }
    return undefined;
  }
};

/**
 * Delete candidate
 */
export const deleteCandidate = async (id: string): Promise<boolean> => {
  try {
    const success = await deleteCandidateInFirebase(id);
    candidates = candidates.filter(c => c.id !== id);
    return success;
  } catch (error) {
    console.error('Error deleting candidate:', error);
    candidates = candidates.filter(c => c.id !== id);
    return true;
  }
};

/**
 * Filter candidates by various filters
 */
export const filterCandidates = (
  candidatesList: Candidate[],
  searchTerm = '',
  statusFilter = 'all',
  positionFilter = 'all',
  scoreFilter = 'all'
): Candidate[] => {
  return candidatesList.filter(candidate => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.githubUsername.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter;

    let matchesScore = true;
    if (scoreFilter === 'high') {
      matchesScore = candidate.matchScore >= 85;
    } else if (scoreFilter === 'medium') {
      matchesScore = candidate.matchScore >= 70 && candidate.matchScore < 85;
    } else if (scoreFilter === 'low') {
      matchesScore = candidate.matchScore < 70;
    }

    return matchesSearch && matchesStatus && matchesPosition && matchesScore;
  });
};

/**
 * Compare two candidates and return a detailed comparison
 */
export const compareCandidates = (candidate1Id: string, candidate2Id: string) => {
  const candidate1 = candidates.find(c => c.id === candidate1Id);
  const candidate2 = candidates.find(c => c.id === candidate2Id);

  if (!candidate1 || !candidate2) return null;

  const comparison = {
    matchScore: {
      difference: candidate1.matchScore - candidate2.matchScore,
      winner: candidate1.matchScore > candidate2.matchScore ? candidate1.id : candidate2.id,
    },
    codeQuality: {
      difference: candidate1.commitMetrics.codeQualityScore - candidate2.commitMetrics.codeQualityScore,
      winner: candidate1.commitMetrics.codeQualityScore > candidate2.commitMetrics.codeQualityScore ? candidate1.id : candidate2.id,
    },
    consistency: {
      difference: candidate1.commitMetrics.consistencyScore - candidate2.commitMetrics.consistencyScore,
      winner: candidate1.commitMetrics.consistencyScore > candidate2.commitMetrics.consistencyScore ? candidate1.id : candidate2.id,
    },
    collaboration: {
      difference: candidate1.commitMetrics.collaborationScore - candidate2.commitMetrics.collaborationScore,
      winner: candidate1.commitMetrics.collaborationScore > candidate2.commitMetrics.collaborationScore ? candidate1.id : candidate2.id,
    },
    technicalDiversity: {
      difference: candidate1.commitMetrics.technicalDiversityScore - candidate2.commitMetrics.technicalDiversityScore,
      winner: candidate1.commitMetrics.technicalDiversityScore > candidate2.commitMetrics.technicalDiversityScore ? candidate1.id : candidate2.id,
    },
    overallScore: {
      difference: candidate1.commitMetrics.overallScore - candidate2.commitMetrics.overallScore,
      winner: candidate1.commitMetrics.overallScore > candidate2.commitMetrics.overallScore ? candidate1.id : candidate2.id,
    },
    totalCommits: {
      difference: candidate1.commitMetrics.totalCommits - candidate2.commitMetrics.totalCommits,
      winner: candidate1.commitMetrics.totalCommits > candidate2.commitMetrics.totalCommits ? candidate1.id : candidate2.id,
    },
  };

  // Count wins
  let candidate1Wins = 0;
  let candidate2Wins = 0;

  Object.values(comparison).forEach(metric => {
    if (metric.winner === candidate1.id) candidate1Wins++;
    else if (metric.winner === candidate2.id) candidate2Wins++;
  });

  const overallWinner = candidate1Wins > candidate2Wins ? candidate1 : candidate2;

  return {
    candidate1,
    candidate2,
    metrics: comparison,
    candidate1Wins,
    candidate2Wins,
    overallWinner,
  };
};
