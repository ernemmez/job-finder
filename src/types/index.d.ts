type TUser = {
  id: string;
  email: string;
  profileImage: string;
  appliedJobs: string[];
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
