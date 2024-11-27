"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { fetchRegionData } from "@/queries/fetchRegionData";
import { useSelector } from "react-redux";
import HexMap from "./hexMap/hexMap";
import styles from "./styles.module.scss";
import SubData from "./info/subData";
import { IAdminCenter } from "@/interfaces/landmark";
import { useRouter } from "next/navigation";

function HexMapMenu(props: { initialAdminCenterData: IAdminCenter }) {
  const selectedRegion = useSelector(
    (state: RootState) => state.hexMap.selectedRegion
  );
  const router = useRouter();
  const { initialAdminCenterData } = props;
  const [isGigaFetching, setIsGigaFetching] = useState(false);
  const catFilter = useSelector((state: RootState) => {
    return state.filters.categories;
  });
  const debounceCatFilter = useDebounce(catFilter, 5000);

  // ================================

  const {
    data: regionData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["regionData"],
    initialData: {
      adminCenter: initialAdminCenterData,
    },
    queryFn: () => fetchRegionData(selectedRegion, debounceCatFilter.join(",")),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [selectedRegion]);

  const nerComp = (
    <>
      <h1 style={{ margin: "2vh auto", textAlign: "center" }}>
        {regionData.adminCenter.name}
      </h1>
      <h2 style={{ margin: "2vh auto", textAlign: "center" }}>
        Нерюнгринский разрез
      </h2>
      <div
        style={{
          backgroundImage: `url(/quarry/0.png)`,
          width: "80%",
          height: "286px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          margin: "0 auto",
          borderRadius: 15,
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "3vh 0",
        }}
      >
        <button
          className={styles.hex_neru_btn}
          style={{
            width: "70%",
            height: 30,
            border: "none",
            borderRadius: 15,
            color: "black",
            fontFamily: "var(--comfortaa)",
            outline: "2px solid #ff6600",
          }}
          onClick={() => router.push("/neru")}
        >
          Посмотреть
        </button>
      </div>
    </>
  );

  return (
    <div className={styles.hex_map_menu}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "1.5vw",
        }}
      >
        <div className={styles.hex_map_menu__map_container}>
          {useMemo(() => {
            return <HexMap isGigaFetching={isGigaFetching} />;
          }, [isGigaFetching])}
        </div>

        <div className={styles.hex_map_menu__info_container}>
          <div className={styles.info_container__sub_data}>
            <SubData data={regionData} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className={styles.hex_map_menu__right_panel}>
        {selectedRegion === "NER" ? (
          nerComp
        ) : (
          <h1 style={{ textAlign: "center" }}>
            {regionData.adminCenter.name}
            <br></br> Находиться в разработке
          </h1>
        )}
      </div>
    </div>
  );
}

export default HexMapMenu;
