import { useEffect, useState } from "react";

interface TotalFood {
  name: string;
  totalQuantity: number;
}

export default function Overview() {
  const [data, setData] = useState<TotalFood[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-production-visualisation-api.vercel.app/elastic/total-food"
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [data]);

  const sortData = (items: TotalFood[]) => {
    return items.sort((a, b) => a.totalQuantity - b.totalQuantity);
  };

  return (
    <div>
      <p>Overview:</p>
      <div>
        {sortData(data).map((elem, index) => (
          <p key={index}>
            {elem.name} - {elem.totalQuantity}
          </p>
        ))}
      </div>
    </div>
  );
}
