import { RefObject, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface Props {
  ref?: RefObject<HTMLDivElement>;
}

function Footer(props: Props) {
  const { ref } = props;
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 7) {
      window.location.href = "https://youtu.be/W3q8Od5qJio?t=18";
    }
  }, [state]);

  return (
    <footer className={styles.footer} ref={ref}>
      <p className={styles.footer__logo}>
        <Image
          src={"/logo.png"}
          width={70}
          height={70}
          alt={"Quantum School"}
          onClick={() => {
            console.log("du hast");
            setState(state + 1);
          }}
        />
        © Designed by D4C in 2024. Все права защищены.
      </p>
      <div className={styles.footer__contacts}>
        <p>
          Разработка<br></br>+7-999-173-05-87
        </p>
        <p>
          Дизайн<br></br>+7-924-164-46-98
        </p>
        <p>
          Менеджмент<br></br>+7-924-768-40-35
        </p>
      </div>
    </footer>
  );
}

export default Footer;
