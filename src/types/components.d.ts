interface IHeaderProps {
  userLoggedIn: boolean;
}

interface ILoginModal {
  open: boolean;
  close: () => void;
  openSignUpModal: () => void;
}

interface ISignupModal {
  open: boolean;
  close: () => void;
  openLoginModal: () => void;
}

interface IContentProps {
  children: ReactNode;
  userLoggedIn: boolean;
  pagePath: string;
}

interface IJobsPageProps {
  ua: UserAgent;
  pageData: TJobsSuccesResponse;
  userLoggedIn: boolean;
}

interface IErrorProps {
  status?: number;
  ua?: UserAgent;
  result?: string;
}

interface ISidebarProps {
  userLoggedIn: boolean;
}

interface IResultProps {
  result: TJob[];
  isLoading: boolean;
}

interface IJobItemProps {
  job: TJob;
}

interface IJobsPaginationProps {
  maxVisiblePages: number;
}
