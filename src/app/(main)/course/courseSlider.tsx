"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CourseCard from "@/components/courseCard";
import { MdOutlineArrowBackIos } from "@react-icons/all-files/md/MdOutlineArrowBackIos";
import { MdOutlineArrowForwardIos } from "@react-icons/all-files/md/MdOutlineArrowForwardIos";
import { ICourse } from "@/types/course";

interface IProps {
  id: string;
  courses?: Array<ICourse>;
}

export default function CourseSlider({ id, courses }: IProps) {
  return (
    <div className="absolute w-full h-full flex">
      <button className={`${"swiper-prev-" + id} disabled:hidden`}>
        <MdOutlineArrowBackIos size={24} />
      </button>

      <Swiper
        className="h-full w-full"
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        navigation={{
          prevEl: ".swiper-prev-" + id,
          nextEl: ".swiper-next-" + id,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
          1792: {
            slidesPerView: 5,
          },
        }}
      >
        {courses?.map((course) => (
          <SwiperSlide key={course._id} className="p-2">
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`${"swiper-next-" + id} disabled:hidden`}>
        <MdOutlineArrowForwardIos size={24} />
      </button>
    </div>
  );
}
