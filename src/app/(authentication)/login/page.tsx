// import type { GetServerSidePropsContext } from "next";

import { DefaultLayout } from "~/src/components/Layout";
import { OAuthButton } from "~/src/components/ui/oauth-button";
import { paths } from "~/src/lib/constant";
// import { getServerAuthSession } from "~/src/server/auth";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const session = await getServerAuthSession(context);

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

const Signin = () => {
  return (
    <DefaultLayout title={paths.signin.label}>
      <div className="items-center justify-center flex-1 w-full container-custom">
        <div className="flex flex-col gap-6 px-8 py-12 border rounded lg:px-10 border-vprimary-200">
          <h1 className="font-medium text-center">Enjoy Seamless Access</h1>
          <div className="flex flex-col gap-3">
            <OAuthButton provider="github">
              Continue with <span className="font-medium">Github</span>
            </OAuthButton>
            <OAuthButton provider="google">
              Continue with <span className="font-medium">Google</span>
            </OAuthButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Signin;
