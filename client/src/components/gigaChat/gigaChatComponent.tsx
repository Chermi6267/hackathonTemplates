"use client";

import { useEffect, useRef, useState } from "react";
import GigaChatMenu from "./gigaChatMenu";
import styles from "./styles.module.scss";
import { handleMessage } from "./handleMessage";
import { socket } from "@/socket/socket";
import { useDebounce } from "@/hook/useDebounce";

interface Props {
  trigger: string;
}

function GigaChatComponent(props: Props) {
  const { trigger } = props;
  const [gigaText, setGigaText] = useState("");
  const gigaTextRef = useRef<HTMLDivElement | null>(null);
  const [isGigaFetching, setIsGigaFetching] = useState(false);
  const [isGigaError, setIsGigaError] = useState(false);
  const debounce = useDebounce(trigger, 5000);

  useEffect(() => {
    const onMessageHandler = (text: string) => {
      handleMessage({
        text,
        gigaTextRef,
        setGigaText,
        setIsGigaFetching,
        setIsGigaError,
      });
    };

    socket.on("message", onMessageHandler);

    return () => {
      socket.off("message", onMessageHandler);
    };
  }, []);

  useEffect(() => {
    onClickHandler();
  }, [debounce]);

  const onClickHandler = () => {
    socket.emit("giga", { text: debounce });
    setGigaText("");
    setIsGigaFetching(true);
    setIsGigaError(false);

    return () => {
      socket.off("giga");
      setIsGigaFetching(false);
    };
  };

  return (
    <div style={{ width: "100%" }}>
      <h1 className={styles.giga_chat__title}>Giga Chat</h1>

      <GigaChatMenu
        text={gigaText}
        gigaTextRef={gigaTextRef}
        isFetching={isGigaFetching}
        isError={isGigaError}
      />
    </div>
  );
}

export default GigaChatComponent;
