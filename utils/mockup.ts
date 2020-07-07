import { userInfo } from "os";

export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    const res = {
      id: "crongro",
      name: "윤지수",
      email: "crongro@woowa.com",
      phoneNumber: "010-1234-5678",
    };

    setTimeout(() => resolve(res), 500);
  });
};
