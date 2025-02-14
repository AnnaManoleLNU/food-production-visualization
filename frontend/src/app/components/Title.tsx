type TitleProps = {
  children: string
}

export default function TitleComponent(props: TitleProps) {
  return (
    <>
    <h1 className="mt-20 mb-2 text-7xl font-black text-blue-900">{props.children}</h1>
    
    <p className="text-sm font-medium leading-none mb-6  text-muted-foreground"> Note that the data may be innacurate.
    </p>
    </>
  )
}