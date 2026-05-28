export type User = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isPro: boolean;
};

// Current logged in user
export const currentUser: User = {
  id: "user_1",
  email: "reza@taprobanelabs.com",
  name: "Reza Mohamed",
  image: null,
  isPro: true,
};
