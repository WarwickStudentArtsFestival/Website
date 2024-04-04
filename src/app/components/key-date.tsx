export type KeyDateProps = {
  name: string;
  date: string;
  dateTime: string;
  description: string;
};

export default function KeyDate({
  name,
  date,
  dateTime,
  description,
}: {
  name: string;
  date: string;
  dateTime: string;
  description: string;
}) {
  return (
    <article className="relative group lg:even:mt-64 lg:odd:mb-64 flex flex-col">
      <div className="hidden group-odd:hidden lg:block">
        <div className="bg-secondary rounded-full w-6 h-6 -mb-3 mx-auto" />
        <div className="bg-secondary w-2 h-40 -mb-28 mx-auto" />
      </div>
      <div className="relative bg-secondary h-full lg:h-auto md:w-72 p-4 mx-4 flex flex-col group-even:mt-auto">
        <header>
          <h3 className="uppercase font-bold text-2xl">{name}</h3>
          <time className="text-accent font-bold text-lg" dateTime={dateTime}>
            {date}
          </time>
        </header>
        <div className="mt-auto">
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="hidden group-even:hidden lg:block mt-auto">
        <div className="bg-secondary w-2 h-40 -mt-28 mx-auto" />
        <div className="bg-secondary rounded-full w-6 h-6 -mt-3 mx-auto" />
      </div>
    </article>
  );
}