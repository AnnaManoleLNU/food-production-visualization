"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type GraphProps = {
  selectedCountry: string | null;
  onSelectedFood: (food: string, quantity: number) => void;
};

type Country = {
  name: string;
  foodName: string;
  foodQuantityInTons: number;
};

export default function FoodBarChart({
  selectedCountry,
  onSelectedFood,
}: GraphProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [countryData, setCountryData] = useState<Country[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      setIsVisible(true);
      const fetchData = async () => {
        const response = await fetch(
          `https://food-production-visualisation-api.vercel.app/elastic/countries/${selectedCountry}`
        );
        if (!response.ok) {
          console.error("Failed to fetch:", response.statusText);
          return;
        }
        const jsonData = await response.json();
        setCountryData(jsonData.documents);
      };
      fetchData();
    } else {
      setIsVisible(false);
      setCountryData([]);
    }
  }, [selectedCountry]);

  // Chart color configuration
  const chartConfig = {
    foodQuantityInTons: {
      label: "Food Quantity (tons)",
      color: "#1E3A8A",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col justify-center items-center  text-center ">
      {isVisible && (
        <>
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Data summary for {selectedCountry}</h2>
            <p className="text-sm font-medium leading-none mb-6  text-muted-foreground">
              Click on any bar to display more information in relation to global
              production.
            </p>
          </div>

          <ChartContainer config={chartConfig} className="h-[500px] w-full">
            <ResponsiveContainer>
              <BarChart
                data={countryData}
                margin={{ top: 30, right: 30, bottom: 70, left: 70 }}
              >
                <XAxis
                  dataKey="foodName"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-white border border-blue-800 rounded px-2 py-1 text-sm">
                          {label} {data.value} tons
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar
                  dataKey="foodQuantityInTons"
                  fill={chartConfig.foodQuantityInTons.color}
                  radius={[2, 2, 0, 0]}
                  onClick={(data) => {
                    onSelectedFood(data.foodName, data.foodQuantityInTons);
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </>
      )}
    </div>
  );
}
