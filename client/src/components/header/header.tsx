"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthHandler from "../auth/authHandler";

interface Props {}

function HeaderComponent(props: Props) {
  const { isAuth, user } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(20);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 250);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <AuthHandler />
      <header>
        <div
          className={`${styles.header} ${
            isVisible ? styles.visible : styles.hidden
          }`}
        >
          <Image
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
            src={"/logo.png"}
            width={50}
            height={50}
            priority={false}
            alt={"D4C"}
          />

          <ul className={styles.header__panel}>
            <li
              onClick={() => {
                router.push("/about");
              }}
              className={styles.panel__item}
            >
              О нас
            </li>

            <li
              onClick={() => {
                if (isAuth) {
                  router.push("/profile");
                } else {
                  router.push("/auth");
                }
              }}
              className={styles.panel__item}
            >
              {isAuth ? user.email : "Авторизуйтесь"}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default HeaderComponent;
