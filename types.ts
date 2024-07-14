export interface UserData {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  password: string | null;
  otp: string | null;
  otpExpiry: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
