import React from "react";
import Header from "./../components/Home/Header";
import Marketing from "./../components/Home/Marketing";
import Features from "./../components/Home/Features";
import Testimonial from "./../components/Home/Testimonial";
import Happy from "./../components/Home/Happy";
import Footer from "./../components/Home/Footer";
import Navbar from "./../components/Navbar";

function Home() {
  return (
    <div className="bg-[#d2e6f0]">
      <Navbar />
      <Header />
      <Marketing />
      <Features />
      <Testimonial />
      <Happy />
      <Footer />
    </div>
  );
}

export default Home;
