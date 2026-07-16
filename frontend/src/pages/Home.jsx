import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import HomeEventSlider from "../components/HomeEventSlider";
import EventsSection from "../components/EventSection";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://evently-backend-yjtq.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Hero />

      <Statistics />

      <section id="upcoming-events">
        <HomeEventSlider events={events} />
      </section>

      <WhyChooseUs />
    </>
  );
}

export default Home;