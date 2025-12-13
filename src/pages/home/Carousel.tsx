import { Image } from "@components/index.ts";
import { HomePhoto } from "@stores/home/HomeStore.ts";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Carousel = ({
  featuredPhotos,
}: {
  featuredPhotos: HomePhoto[];
}) => (
  <Swiper
    navigation
    loop
    modules={[Pagination, Navigation]}
    pagination={{ clickable: true }}
    className="overflow-hidden rounded-lg shadow-lg"
  >
    {featuredPhotos.map((photo) => (
      <SwiperSlide>
        <Image
          src={photo.url}
          alt={photo.alt}
          className="w-full max-h-[85vh] aspect-square object-cover"
          style={{ objectPosition: photo.objectPosition }}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
