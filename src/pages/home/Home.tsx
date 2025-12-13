import { Header, HomeHeader, Main } from "@components/index.ts";
import { Context } from "@context/Context.ts";
import { Services } from "./Services.tsx";
import { ServiceArea } from "./ServiceArea.tsx";
import { Carousel } from "./Carousel.tsx";

export const Home: React.FC = () => {
  const featuredPhotos = Context.instance.stores().home.featuredPhotos();

  return (
    <>
      <HomeHeader />
      <Header />
      <Main>
        <Carousel featuredPhotos={featuredPhotos} />
        <ServiceArea />
        <Services />
      </Main>
    </>
  );
};

export default Home;
