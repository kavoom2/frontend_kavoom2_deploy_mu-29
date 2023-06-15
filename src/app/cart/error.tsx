"use client";

import Button from "@/components/Button";
import styles from "./styles.module.scss";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className={styles["page-error-layout"]}>
      <h2>콘텐츠를 불러오지 못했습니다. :(</h2>

      <Button label="다시 시도하기" onClick={reset} />
    </div>
  );
}
