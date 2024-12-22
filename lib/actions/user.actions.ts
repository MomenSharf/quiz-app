// import { getCurrentUser } from "../auth";
// import { db } from "../db";

// export const checkSession = async () => {
//   const session = await getCurrentUser();

//   if (!session) {
//     return { success: false, message: "Unauthorized: User is not logged in." };
//   }

//   return { success: true, session };
// };
// export const getUserByEmail = async (email: string) => {
//   try {
//     const lowerCaseEmail = email.toLowerCase();
//     const user = await db.user.findUnique({
//       where: {
//         email: lowerCaseEmail,
//       },
//     });

//     return user;
//   } catch (error) {
//     return null;
//   }
// };

// export const getUserById = async (id: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         id,
//       },
//     });

//     return user;
//   } catch (error) {
//     return null;
//   }
// };
