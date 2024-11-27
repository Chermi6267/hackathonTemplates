import styles from "./styles.module.scss";

interface Props {
  data: {
    id: number;
    name: string;
    img: string;
    description: string;
  }[];
  state: number;
  setState: (b: number) => void;
}

function Main(props: Props) {
  const { data, state, setState } = props;

  return (
    <>
      <h1 style={{ marginTop: 50 }}>Нерюнгринский разрез</h1>
      <div className={styles.d3_cont}>
        <div className={styles.d3_cont__btns}>
          Фазы производства
          {data.map((item) => {
            return (
              <button
                key={item.id}
                style={item.id === state ? { backgroundColor: "#ffbc8f" } : {}}
                className={styles.d3_cont__btn}
                onMouseEnter={() => {
                  setState(item.id);
                }}
                onClick={() => {
                  setState(item.id);
                }}
              >
                {item.id + 1}
              </button>
            );
          })}
        </div>

        <div className={styles.d3_cont__img_cont}>
          {data.map((item) => {
            return (
              <div
                key={`${item.id}2`}
                className={styles.img}
                style={
                  state === item.id
                    ? {
                        backgroundImage: `url(/quarry/${item.img})`,
                        opacity: 1,
                      }
                    : {
                        backgroundImage: `url(/quarry/${item.img})`,
                        opacity: 0,
                      }
                }
              />
            );
          })}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <h1 className={styles.description__title}>{data[state].name}</h1>

        <div className={styles.description}>
          <p className={styles.description__text}>
            {data.map((item) => {
              if (item.id === state) {
                return item.description;
              }
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default Main;
