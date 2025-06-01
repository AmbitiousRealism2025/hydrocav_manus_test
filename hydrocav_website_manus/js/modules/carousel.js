import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; // Correct import for modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initTestimonialCarousel() {
  const testimonialSwiper = new Swiper('.testimonial-swiper', {
    modules: [Navigation, Pagination], // Enable Navigation and Pagination
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Breakpoints for multiple slides on larger screens (optional)
    // breakpoints: {
    //   768: {
    //     slidesPerView: 2,
    //     spaceBetween: 40
    //   },
    //   1024: {
    //     slidesPerView: 3,
    //     spaceBetween: 50
    //   }
    // }
  });
}
