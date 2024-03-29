interface PageMap {
  [lang: string]: {
    [page: string]: string;
  };
}

interface IPage {
  ua: UserAgent;
  page: keyof PageMap;
  pageData: unknown;
  userLoggedIn: boolean;
}

type TUser = {
  id: string;
  email: string;
  profileImage: string;
  appliedJobs: string[];
};

// Zustand
type TJobsPageStore = {
  showAppliedJobs: boolean;
  setShowAppliedJobs: (p: boolean) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pageNumber: number) => void;
};

type TAppliedJobsStore = {
  appliedJobs: TJob[];
  add: (job: TJob) => void;
  addMany: (jobs: TJob[]) => void;
  remove: (jobId: string) => void;
};

// Services
type TAPIErrorResponse = {
  message: string;
};

type TLoginSuccesResponse = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  user: TUser;
};

type TLoginRequestBody = {
  email: string;
  password: string;
};

type TJob = {
  companyName: string;
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
  keywords: string[];
};

type TJobsSuccesResponse = {
  data: TJob[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
};
