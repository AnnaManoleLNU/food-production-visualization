type TitleProps = {
  children: string;
};

export default function TitleComponent({ title }: { title: string }) {
  return (
    <>
      <h1 className="mt-20 mb-2 text-7xl font-black text-blue-900">{title}</h1>

      <p className="text-sm font-medium leading-none mb-6  text-muted-foreground">
        {" "}
        Note that the data may be innacurate. Taken from the dataset{" "}
        <a
          href="https://www.kaggle.com/datasets/rafsunahmad/world-food-production"
          className="underline text-blue-900 hover:text-blue-700"
          target="_blank"
        >
          World Food Production
        </a>{" "}
        on Kaggle.{" "}
      </p>
    </>
  );
}
