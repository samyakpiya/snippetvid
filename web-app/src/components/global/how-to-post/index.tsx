import parse from "html-react-parser";

interface Props {
  title: string;
  html: string;
}

const HowToPost = ({ title, html }: Props) => {
  return (
    <div className="flex flex-col gap-y-10 lg:col-span-2 mt-10">
      <h2 className="text-5xl font-bold">{title}</h2>
      <div
        className="prose prose-slate max-w-none
        [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4
        [&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-3
        [&>p]:text-base [&>p]:my-4
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-4 [&>ul>li]:my-2
        [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-4 [&>ol>li]:my-2
        [&>hr]:my-8
        [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800
      "
      >
        {parse(html?.replace(/\n\n\n/g, "\n") || "")}
      </div>
    </div>
  );
};

export default HowToPost;
