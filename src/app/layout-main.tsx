import MainContainer from "@/layouts/MainContainer";

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

export default LayoutMain;
