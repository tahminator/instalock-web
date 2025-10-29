// import { SJ } from "@instalock/sj";
// import { ApiDefault } from "@instalock/types";
// import { useMutation } from "@tanstack/react-query";

// const useAuthMutation = () =>
//   useMutation({
//     mutationKey: ["auth", "login"],
//     mutationFn: authenticationCallbackFlow,
//   });

// const authenticationCallbackFlow = async ({
//   code,
//   state,
// }: {
//   code: string;
//   state: string;
// }) => {
//   try {
//     const res = await fetch(
//       `/api/auth/v1/discord/callback?code=${code}&state=${state}`,
//       {
//         method: "POST",
//       }
//     );

//     if (!res.ok) {
//       return {
//         success: false,
//         message: "Hmm, something went wrong. Please try logging in again.",
//       };
//     }

//     const { success, message } = SJ.parse(
//       await res.text()
//     ) as ApiDefault<object>;

//     return { success, message };
//   } catch {
//     return {
//       success: false,
//       message: "Hmm, something went wrong. Please try logging in again.",
//     };
//   }
// };

// export default useAuthMutation;
