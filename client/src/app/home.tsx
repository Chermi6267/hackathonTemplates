"use client";

import HexMapMenu from "@/components/hexMapMenu/hexMapMenu";
import Header from "@/components/header/header";
import { IAdminCenter } from "@/interfaces/landmark";
import AuthHandler from "@/components/auth/authHandler";
import Footer from "@/components/footer/footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home(props: { adminCenter: IAdminCenter }) {
  const { adminCenter } = props;
  const selectedRegion = useSelector((state: RootState) => {
    return state.hexMap.selectedRegion;
  });

  return (
    <>
      <AuthHandler />
      <Header />
      <main>
        <HexMapMenu initialAdminCenterData={adminCenter} />
      </main>
      <Footer />
    </>
  );
}
