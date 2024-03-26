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
}

interface IJobsPageProps {
  ua: UserAgent;
}

interface IErrorProps {
  status: number;
  ua: UserAgent;
}
