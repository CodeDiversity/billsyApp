enum ErrorCode {
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

const errorMessages: { [key in ErrorCode]?: string } = {
  [ErrorCode.EMAIL_ALREADY_EXISTS]: "This email is already in use. Please choose another email.",
  [ErrorCode.USERNAME_ALREADY_EXISTS]: "This username is already in use. Please choose another username.",
  [ErrorCode.INVALID_CREDENTIALS]: "Invalid username or password.",
};


export const getErrorMessage = (code: ErrorCode | string): string => {
  const message = errorMessages[code as ErrorCode];

  return message || "An unexpected error occurred. Please try again.";
}
