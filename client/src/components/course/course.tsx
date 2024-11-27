import api from "@/http/api";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  course: any;
  refetch: () => void;
}

function Course(props: Props) {
  const { course, refetch } = props;
  const { isAuth } = useAuth();
  const [trigger, setTrigger] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  const subscribeHandler = (courseId: any) => {
    if (!isAuth) {
      router.push("/auth");
    } else {
      api
        .post(`/course/subscribe/${courseId}`, { subscribe: !isSubscribed })
        .then((res) => {
          refetch();
          setTrigger(trigger + 1);
          toast.success(`Информация об экскурсии отправлена на вашу почту `, {
            style: {
              background: "rgb(36, 36, 36)",
              color: "#fa812f",
            },

            iconTheme: {
              primary: "green",
              secondary: "#fa812f",
            },
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            style: {
              background: "rgb(36, 36, 36)",
              color: "#fa812f",
            },

            iconTheme: {
              primary: "#838383",
              secondary: "#fa812f",
            },
          });
        });
    }
  };

  useEffect(() => {
    api.get(`/course/isSubscribed/${course.id}`).then((res) => {
      setIsSubscribed(res.data && isAuth);
    });
  }, [trigger]);

  return (
    <>
      <div
        className={
          course.id === 2
            ? `${styles.course_cont__f}`
            : `${styles.course_cont__o}`
        }
      >
        <h3>{course.name}</h3>
        <p>{course.description}</p>
      </div>

      <div className={styles.course_cont__btn_cont}>
        <button
          style={isSubscribed ? { cursor: "not-allowed" } : {}}
          onClick={() => subscribeHandler(course.id)}
          className={styles.course_btn}
          // disabled={isSubscribed}
        >
          {isSubscribed ? "Записан" : "Записаться"}
        </button>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default Course;
