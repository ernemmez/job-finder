import { create } from "zustand";

export const useAppliedJobsStore = create<TAppliedJobsStore>((set) => ({
    appliedJobs: [],
    add: (job) => set((state) => ({ appliedJobs: [...state.appliedJobs, job] })),
    addMany: (jobs) => set((state) => ({ appliedJobs: [...state.appliedJobs, ...jobs] })),
}));