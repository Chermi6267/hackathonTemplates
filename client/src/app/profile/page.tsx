"use client";

import HeaderComponent from "@/components/header/header";
import Profile from "@/components/profile/profile";
import useAuth from "@/hook/useAuth";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const { isAuth, user } = useAuth();

  return (
    <>
      <HeaderComponent />
      <main>{isAuth ? <Profile user={user} /> : null}</main>
    </>
  );
}

export default Page;
