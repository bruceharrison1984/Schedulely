import { Resizable } from 're-resizable';
import { Schedulely, WeekDay, createDefaultAdapter } from 'schedulely';
import { storyEvents } from './helpers.stories';
import { useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

const HomepageSchedulely = () => {
  const [theme, setTheme] = useState<string>('default');
  const [startDay, setStartDay] = useState<WeekDay>(WeekDay.Sunday);
  const { theme: nextraTheme } = useTheme();

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1em',
        }}
      >
        <div
          style={{
            marginTop: '0.5em',
            textAlign: 'center',
          }}
        >
          <label htmlFor="theme-selector">Theme: </label>
          <select
            id="theme-selector"
            onChange={(e) => setTheme(e.target.value)}
            style={{
              border: '1px solid black',
              borderRadius: '0.2em',
            }}
          >
            <option>default</option>
            <option>minimal</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '0.5em',
            textAlign: 'center',
          }}
        >
          <label htmlFor="start-of-week-selector">Start Of Week: </label>
          <select
            id="start-of-week-selector"
            onChange={(e) => setStartDay(Number.parseInt(e.target.value))}
            style={{
              border: '1px solid black',
              borderRadius: '0.2em',
            }}
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </div>
      </div>
      <div
        style={{
          margin: 'auto',
          height: '100%',
          paddingTop: '1em',
        }}
      >
        <Resizable
          defaultSize={{
            width: '100%',
            height: '100%',
          }}
          maxHeight={'100%'}
          maxWidth={'100%'}
          minHeight={'71%'}
          minWidth={'40%'}
          handleStyles={{
            bottom: {
              border: '1px',
              borderStyle: 'none none dashed none',
            },
            left: {
              border: '1px',
              borderStyle: 'none none none dashed',
            },
            top: {
              border: '1px',
              borderStyle: 'dashed none none none',
            },
            right: {
              border: '1px',
              borderStyle: 'none dashed none none',
            },
          }}
        >
          <Schedulely
            events={storyEvents}
            dark={nextraTheme === 'dark'}
            theme={theme}
            actions={{
              onEventClick: (event) => console.log(event),
              onMoreEventsClick: (events) => console.log(events),
            }}
            dateAdapter={createDefaultAdapter('en', startDay)}
          />
          <div
            style={{
              fontSize: '0.7em',
              width: '100%',
              textAlign: 'end',
              fontWeight: 'bold',
            }}
          >
            Test{' '}
            <a href="https://github.com/bokuweb/re-resizable" target={'_blank'}>
              live resize
            </a>{' '}
            by dragging the dashed line
          </div>
        </Resizable>
      </div>
    </>
  );
};

export default HomepageSchedulely;
