import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

const mdxComponents: MDXRemoteProps["components"] = {
  h2: (props) => <h2 className="mt-10 text-2xl font-bold text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-foreground" {...props} />,
  p: (props) => <p className="mt-4 leading-7 text-muted-foreground" {...props} />,
  a: (props) => <a className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-brand-500 bg-brand-50 py-3 pl-5 pr-4 italic text-brand-900"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
};

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div>
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
