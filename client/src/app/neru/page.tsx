"use client";

import Footer from "@/components/footer/footer";
import GigaChatComponent from "@/components/gigaChat/gigaChatComponent";
import HeaderComponent from "@/components/header/header";
import Main from "@/components/main/main";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import Course from "@/components/course/course";

const data = [
  {
    id: 0,
    img: "0.png",
    name: "Нерюнгринский разрез",
    description:
      "Нерюнгринский угольный разрез — крупнейший в России, расположенный в Забайкалье. Добывает антрацит с высокими запасами угля, используется в энергетике и промышленности",
  },
  {
    id: 1,
    img: "1.png",
    name: "Карьер",
    description:
      "Карьер Нерюнгринского разреза — это открытое угольное месторождение, где уголь добывается с использованием экскаваторов и грузового транспорта. Он состоит из нескольких рабочих горизонтов и обеспечивает высокие объемы добычи угля",
  },
  {
    id: 2,
    img: "2.png",
    name: "Цех отгрузки угля",
    description:
      "Цех отгрузки Нерюнгринского разреза обеспечивает подготовку угля для транспортировки, включая его загрузку в вагоны и автотранспорт. Он оснащён современным оборудованием для автоматизации и ускорения процесса отгрузки",
  },
  {
    id: 3,
    img: "3.png",
    name: "Обогатительный цех",
    description:
      "В обогатительном цехе уголь проходит через технологические установки, которые повышают его качество, удаляя ненужные примеси и улучшая энергетическую ценность. Цех оснащён современными системами для контроля эффективности обогащения",
  },
  {
    id: 4,
    img: "4.png",
    name: "Сушильный цех",
    description:
      "Сушильный цех Нерюнгринского разреза служит для уменьшения влажности угля, что повышает его энергетическую ценность. В цехе используется современное оборудование для контроля температуры и влажности в процессе сушки",
  },
  {
    id: 5,
    img: "5.png",
    name: "Цех погрузки угля",
    description:
      "Цех погрузки Нерюнгринского разреза оснащён современными механизмами для эффективной загрузки угля в транспорт. В его составе — экскаваторы, конвейеры и другое оборудование, обеспечивающее бесперебойную работу и безопасность",
  },
];

export default function Page() {
  const [state, setState] = useState(0);
  const trigger = data[state].name;

  const {
    data: courseData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["courseData"],
    queryFn: () => api.get("/course").then((res) => res.data),
    enabled: true,
  });

  return (
    <>
      <HeaderComponent />
      <main>
        <Main
          data={data}
          state={state}
          setState={(n) => {
            setState(n);
          }}
        />
        <GigaChatComponent trigger={trigger} />

        <h1>Доступные мероприятия</h1>
        <h2 style={{ width: "100%", textAlign: "left" }}>Онлайн</h2>
        {courseData ? (
          <Course refetch={() => refetch()} course={courseData[0]} />
        ) : null}

        <h2 style={{ width: "100%", textAlign: "left" }}>Оффлайн</h2>
        {courseData ? (
          <Course refetch={() => refetch()} course={courseData[1]} />
        ) : null}
      </main>

      <Footer />
    </>
  );
}
