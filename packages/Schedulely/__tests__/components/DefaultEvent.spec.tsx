import { DefaultEvent } from '@/components';
import { EventComponentProps, InternalCalendarEvent } from '@/types';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import chance from 'chance';

const testEvent: InternalCalendarEvent = {
  id: chance().string({ length: 32 }),
  start: new Date(),
  end: new Date(),
  summary: chance().string({ length: 32 }),
  color: chance().color({ format: 'rgb' }),
  visible: false,
};
const onClickHandler = vi.fn((event: InternalCalendarEvent) => null);
const defaults: EventComponentProps = {
  event: testEvent,
  isHovered: false,
  onClick: onClickHandler,
};

describe('DefaultEvent', () => {
  describe('summary', () => {
    let testObject: RenderResult;

    beforeEach(() => {
      testObject = render(<DefaultEvent {...defaults} />);
    });

    it('displays correct text', () =>
      expect(
        testObject.getByRole('listitem').querySelector('div')?.textContent
      ).toEqual(testEvent.summary));
  });

  describe('color', () => {
    let testObject: RenderResult;

    beforeEach(() => {
      testObject = render(<DefaultEvent {...defaults} />);
    });

    it('displays correct color', () =>
      expect(
        testObject
          .getByRole('listitem')
          .style.backgroundColor.replaceAll(' ', '') // trim spaces
      ).toEqual(testEvent.color));
  });

  describe('onClick handler', () => {
    let testObject: RenderResult;

    beforeEach(() => {
      testObject = render(<DefaultEvent {...defaults} />);
      fireEvent.click(testObject.getByRole('listitem'));
    });

    it('fires', () => expect(onClickHandler).toHaveBeenCalled());

    it('passes events as args', () =>
      expect(onClickHandler.mock.calls[0][0]).toEqual(testEvent));
  });

  describe('onHover', () => {
    describe('is true', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultEvent {...defaults} isHovered={true} />);
      });
      it('contains correct class', () =>
        expect(testObject.getByRole('listitem').className).toContain(
          'event-selected'
        ));
    });

    describe('is false', () => {
      let testObject: RenderResult;

      beforeEach(() => {
        testObject = render(<DefaultEvent {...defaults} />);
      });
      it('contains correct class', () =>
        expect(testObject.getByRole('listitem').className).not.toContain(
          'event-selected'
        ));
    });
  });
});
