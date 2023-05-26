export interface UserModel {
  email: string;
  name: string;
  unit_id: number;
  password: string;
  password_confirmation: string;
}

export async function register(user: UserModel) {
  const response = await fetch("http://127.0.0.1:3001/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log(user);
  console.log(typeof user.unit_id);
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  console.log("response from userService working");
}
