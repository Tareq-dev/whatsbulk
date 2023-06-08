import React from "react";
import Header from "./../components/Home/Header";
import Marketing from "./../components/Home/Marketing";
import Features from "./../components/Home/Features";
import Testimonial from "./../components/Home/Testimonial";
import Happy from "./../components/Home/Happy";
import Footer from "./../components/Home/Footer";
import Navbar from "./../components/Navbar";

function Home({ admin, currentUser }) {
  return (
    <div className="bg-[#E0E8FF]">
      <Navbar admin={admin} currentUser={currentUser} />
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
