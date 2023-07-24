import { Highlight, themes } from 'prism-react-renderer';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Schedulely } from 'schedulely';
import { generateEvents } from './helpers.stories';
import React, {
  PropsWithChildren,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import ReactDOMServer from 'react-dom/server';
import he from 'he';

export const LivePre = (props: PropsWithChildren) => {
  const children = props.children as JSX.Element;
  const options = children.props.className.split(',');
  const language = options[0].replace(/language-/, '');
  const live = !!options[1];
  const code = he.decode(
    ReactDOMServer.renderToString(children.props.children)
  );

  if (live && isValidElement(props.children) && children.type.name === 'Code') {
    return (
      <LiveProvider
        code={code}
        language={language}
        scope={{ React, generateEvents, Schedulely }} // <-- inject objects you need access to
        noInline={true}
        theme={themes.vsDark}
      >
        <LivePreview />
        <LiveError />
        <LiveEditor
          code={code}
          language={language}
          style={{ borderRadius: '0.5em', overflow: 'hidden' }}
        />
      </LiveProvider>
    );
  }

  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, borderRadius: '0.5em' }}>
          {tokens.map((line, i) => {
            if (line[0].empty) return;
            return (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
