"use client";

import { useEffect, useRef, useState } from "react";
import GigaChatMenu from "./gigaChatMenu";
import styles from "./styles.module.scss";
import { handleMessage } from "./handleMessage";
import { socket } from "@/socket/socket";
import { useDebounce } from "@/hook/useDebounce";

interface Props {}

function GigaChatComponent(props: Props) {
  const {} = props;
  const [gigaText, setGigaText] = useState("");
  const gigaTextRef = useRef<HTMLDivElement | null>(null);
  const [isGigaFetching, setIsGigaFetching] = useState(false);
  const [isGigaError, setIsGigaError] = useState(true);
  const [text, setText] = useState("");
  const [forDebounce, setForDebounce] = useState(1);
  const debounceValue = useDebounce(forDebounce, 1000);

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
    if (text === "") {
      console.log("BLANK");
      return;
    } else {
      socket.emit("giga", { text: text });
      setGigaText("");
      setIsGigaFetching(true);
      setIsGigaError(false);

      return () => {
        socket.off("giga");
        setIsGigaFetching(false);
      };
    }
  }, [debounceValue]);

  return (
    <div style={{ width: "100%" }}>
      <h1 className={styles.giga_chat__title}>Giga Chat</h1>

      <GigaChatMenu
        text={gigaText}
        gigaTextRef={gigaTextRef}
        isFetching={isGigaFetching}
        isError={isGigaError}
      />

      <input
        style={{ marginTop: 15 }}
        type="text"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
      />

      <button
        onClick={() => {
          setForDebounce(forDebounce + 1);
        }}
      >
        OK
      </button>
    </div>
  );
}

export default GigaChatComponent;
