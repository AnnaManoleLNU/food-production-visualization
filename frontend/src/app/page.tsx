"use client";
import Title from "./components/Title";
import Visualizer from "./components/Visualizer";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Title title="Global Food Production 2018" />
      <Visualizer />
    </main>
  );
}
