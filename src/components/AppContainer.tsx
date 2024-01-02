import { NavigationBar } from "@/components/SearchBar";
import { ContentArea } from "@/components/ContentArea";

export const Main = () => {
  return (
    <div key="1" className="flex flex-col h-screen items-center">
      <NavigationBar></NavigationBar>
      <ContentArea></ContentArea>
    </div>
  );
};
