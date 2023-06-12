"use client";

import { SSRQueryClientProvider } from "@/libs/reactQuery";

interface ComposerProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

const Composer = (props: ComposerProps) => {
  const { components = [], children, ...rest } = props;

  return (
    <>
      {components.reduceRight((acc, Component) => {
        return <Component {...rest}>{acc}</Component>;
      }, children)}
    </>
  );
};

const GlobalContextProviders = ({ children }: React.PropsWithChildren) => {
  return <Composer components={[SSRQueryClientProvider]}>{children}</Composer>;
};

export default GlobalContextProviders;
