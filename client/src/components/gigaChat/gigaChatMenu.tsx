import { MutableRefObject } from "react";
import styles from "./styles.module.scss";

interface Props {
  text: string;
  isFetching: boolean;
  isError: boolean;
  gigaTextRef: MutableRefObject<HTMLDivElement | null>;
}

function GigaChatMenu(props: Props) {
  const { text, gigaTextRef, isFetching, isError } = props;

  return (
    <div className={styles.giga_chat}>
      <p ref={gigaTextRef} className={styles.giga_chat__text}>
        {isError ? (
          "Ошибка: giga chat — ленивая жомпа"
        ) : (
          <>
            {text}
            {isFetching && <span className={styles.blinking_cursor}></span>}
          </>
        )}
      </p>
    </div>
  );
}

export default GigaChatMenu;
