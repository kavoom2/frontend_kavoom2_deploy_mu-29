import styles from "./styles.module.scss";

export default function CartLayout({ children }: React.PropsWithChildren<{}>) {
  return <section className={styles["page-layout"]}>{children}</section>;
}
