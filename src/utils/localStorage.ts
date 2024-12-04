interface RememberedCredentials {
  username: string;
  password: string;
}

export const storageUtils = {
  setRememberMe: (username: string, password: string): void => {
    localStorage.setItem("rememberedCredentials", JSON.stringify({ username, password }));
  },

  getRememberMe: (): RememberedCredentials | null => {
    const credentials = localStorage.getItem("rememberedCredentials");
    return credentials ? JSON.parse(credentials) : null;
  },

  clearRememberMe: (): void => {
    localStorage.removeItem("rememberedCredentials");
  },
};
