import { create } from "zustand";

export const useJobsPageStore = create<TJobsPageStore>((set) => ({
    showAppliedJobs: false,
    setShowAppliedJobs: (p) => set(() => ({ showAppliedJobs: p })),
    currentPage: 1,
    totalPages: 0,
    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
    prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTotalPages: (pageNumber) => set({ totalPages: pageNumber }),
}));

export const useAppliedJobsStore = create<TAppliedJobsStore>((set) => ({
    appliedJobs: [],
    add: (job) => set((state) => ({ appliedJobs: [...state.appliedJobs, job] })),
    addMany: (jobs) => set((state) => ({ appliedJobs: [...state.appliedJobs, ...jobs] })),
    remove: (jobId) => set((state) => ({ 
        appliedJobs: state.appliedJobs.filter(job => job.id !== jobId) 
    })),
}));