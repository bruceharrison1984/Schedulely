import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { PropsWithChildren, isValidElement } from 'react';
import ReactDOMServer from 'react-dom/server';

export type LiveCodeBlockProps = {
  live?: boolean;
  className: string;
};

export const Pre = (props: PropsWithChildren<LiveCodeBlockProps>) => {
  if (isValidElement(props.children) && props.children.type.name === 'Code') {
    console.log(props);
    const language = props['data-language'];

    return (
      <LiveProvider
        code={ReactDOMServer.renderToString(props.children)}
        language={language}
      >
        <LivePreview />
        <LiveError />
        <LiveEditor
          code={ReactDOMServer.renderToString(props.children)}
          language={language}
        />
      </LiveProvider>
    );
  }

  return <pre {...props}>{props.children}</pre>;
};
