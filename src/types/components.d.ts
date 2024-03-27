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
  pageData: unknown;
  userLoggedIn: boolean;
}

interface IErrorProps {
  status: number;
  ua: UserAgent;
}

interface ISidebarProps {
  userLoggedIn: boolean;
}
