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
  appliedJobs: TJob[];
};

// Zustand
type TAppliedJobsStore = {
  appliedJobs: TJob[];
  add: (job: TJob) => void;
  addMany: (job: TJob[]) => void;
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
