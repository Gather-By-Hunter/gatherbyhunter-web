import { Header, HomeHeader, Main } from "@components/index.ts";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Home: React.FC = () => {
  return (
    <>
      <HomeHeader />
      <Header />
      <Main>
        <Swiper
          navigation
          loop
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <div className="h-[300vh]"></div>
      </Main>
    </>
  );
};

export default Home;
