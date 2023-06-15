import classNames from "classnames";
import Image from "next/image";
import styles from "./Logo.module.scss";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <span className={mainClassNames}>
      <Image
        src="/assets/logos/logo-brand.png"
        alt="logo"
        width={60}
        height={16}
        priority
      />
    </span>
  );
};

export default Logo;
