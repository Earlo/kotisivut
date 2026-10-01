interface TapauspainikeProps {
  tapausId: string;
  text: string;
}

const Tapauspainike = ({ tapausId, text }: TapauspainikeProps) => {
  return (
    <a
      href={`#${tapausId}`}
      data-tapaus-id={tapausId}
      className="inline border-b border-dotted border-sky-300/50 p-0 align-baseline font-medium text-sky-200/90 transition-colors hover:border-sky-200 hover:text-sky-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
    >
      {text}
    </a>
  );
};

export default Tapauspainike;
