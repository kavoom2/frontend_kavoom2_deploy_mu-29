import styles from "./styles.module.scss";

export default function ProductsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return <section className={styles["page-layout"]}>{children}</section>;
}
