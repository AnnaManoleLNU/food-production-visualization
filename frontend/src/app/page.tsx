"use client" 
import Overview from "./components/Overview";
import Title from "./components/Title"
import Visualizer from "./components/Visualizer"

export default function Home() {
  return (
    <main  className="flex flex-col justify-center items-center">
      <Title>Global Food Production 2018</Title>
      <Visualizer />
      {/* <Overview /> */}
    </main>
  );
}
