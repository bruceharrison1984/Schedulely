/// <reference types="react" />
import { JSXElementConstructor, PropsWithChildren } from "react";
/**
 * This object represents an event that is supplied by the client
 */
interface CalendarEvent {
    /** Unique *external* ID of the event */
    id: string;
    /** Start date of the event (ISO format w/Timezone) */
    start: string;
    /** End date of the event  (ISO format w/Timezone) */
    end: string;
    /** Text that will be visible on the event */
    summary: string;
    /** Visible color of the event *(css color value)* */
    color: string;
}
/**
 * This object represents an event that is displayed on the calendar
 */
interface InternalCalendarEvent {
    /** Unique *external* ID of the event */
    id: string;
    /** Start date of the event */
    start: Date;
    /** End date of the event */
    end: Date;
    /** Text that will be visible on the event */
    summary: string;
    /** Visible color of the event *(css color value)* */
    color: string;
}
/** Represents the state of the ActionProvider */
interface ActionState {
    /** function that will run when an event is clicked on */
    onEventClick: (event: InternalCalendarEvent) => void;
    /** function that will run when the 'more events' indicator is clicked on */
    onMoreEventClick: (event: InternalCalendarEvent[]) => void;
    onMonthChangeClick: (firstOfMonth: Date, lastOfMonth: Date) => void;
}
interface InternalEventWeek {
    weekStart: Date;
    weekEnd: Date;
    daysInWeek: Date[];
    events: InternalCalendarEvent[];
    eventsOnDays: {
        date: Date;
        events: InternalCalendarEvent[];
    }[];
}
type CalendarState = {
    /** The current visible month */
    currentMonth: Date;
    /** The DateTimeAdapter that is being utilized */
    dateAdapter: DateTimeAdapter;
    /** Array with localized names of the days of the week */
    daysOfWeek: string[];
    /** Advance the calendar one month */
    onNextMonth: () => void;
    /** Decrease the calendar by one month */
    onPrevMonth: () => void;
    /** Advance the calendar one year */
    onNextYear: () => void;
    /** Decrease the calendar by one year */
    onPrevYear: () => void;
    /** Calendar with events that will be displayed */
    calendarWithEvents: InternalEventWeek[];
    calendarBoundingBox?: DOMRect;
    dayHeightPx?: number;
};
/**
 * Common interface for porting date libraries so they can be used with Schedulely
 */
interface DateTimeAdapter {
    /** Add the specified number of months to the date. Using a negative value will subtract that amount. */
    addMonthsToDate: (date: Date, amount: number) => Date;
    /** Returns all days in the month, split apart by week. Includes leading/trailing days. */
    getCalendarView: (date: Date) => Date[][];
    /** Get the day number component for a given date */
    getDayNumber: (date: Date) => number;
    /** Get full names of all days of the week */
    getDaysOfWeek: (displaySize: DisplaySize) => string[];
    /** Get the day of week grid index for the end of the event. Used for positioning within the Week css-grid. */
    getGridEndIndex: (eventEndDate: Date, endOfWeek: Date) => number;
    /** Get the day of week index for the start of the event. Used for positioning within the Week css-grid */
    getGridStartIndex: (eventDate: Date, startOfWeek: Date) => number;
    /** Get the full name of the month for a given date */
    getMonthName: (date: Date) => string;
    /** Get the year component for a given date */
    getYear: (date: Date) => number;
    /** Convert and ISO format string to a Date object */
    convertIsoToDate: (isoDate: string) => Date;
    /** Returns true if the date represent today */
    isDateToday: (date: Date) => boolean;
    /** Does the event fall within or span the supplied week */
    isEventInWeek: (eventStartDate: Date, eventEndDate: Date, week: Date[]) => boolean;
    /** Compare two dates, returns true if they are in the same month, in the same year */
    isSameMonth: (firstDate: Date, secondDate: Date) => boolean;
    /** Is the supplied month the same as the current month */
    isCurrentMonth: (date: Date) => boolean;
}
declare enum DisplaySize {
    tiny = 0,
    medium = 1,
    large = 2
}
interface HighlightEventState {
    /** Set the ID of the currently highlighted event */
    setHighlight: (eventId: string) => void;
    /** Clear the currently value for highlightedEvent */
    clearHighlight: () => void;
    /** Check if the eventId equals the currently highlighted event */
    isHighlighted: (eventId: string) => boolean;
}
/**
 * Props interface for creating Day components
 */
interface DayComponentProps {
    /** Does this date represent the current month (used for coloring trailing/leading days) */
    isCurrentMonth: boolean;
    /** The day number portion of the Date */
    dateNumber: number;
    /** Does this date represent today? */
    isToday: boolean;
    /** Does this date have more events than can fit in the grid? */
    isOverflowed: boolean;
    /** Events occuring on this date */
    events: InternalCalendarEvent[];
    /** Function executes when the indicator is clicked */
    onClick: (event: InternalCalendarEvent[]) => void;
}
/**
 * Type used for creating DayComponent
 */
type DayComponent = JSXElementConstructor<PropsWithChildren<DayComponentProps>>;
/**
 * Props interface for creating Event components
 */
interface EventComponentProps {
    /* The object that represents this event */
    event: InternalCalendarEvent;
    /* True when event is hovered. Can be used to control event display when spanning multiple weeks. */
    isHovered: boolean;
    /** Function executes when the event is clicked */
    onClick: (event: InternalCalendarEvent) => void;
}
/**
 * Type used for creating EventComponent
 */
type EventComponent = JSXElementConstructor<EventComponentProps>;
/** Props used when creating a Header */
interface HeaderProps {
    /** The current month the calendar is displaying */
    month: string;
    /** The current year the calendar is displaying */
    year: number;
    /** True if the selected month is the same as the current month */
    isCurrentMonth: boolean;
    /** Triggers moving forward one month */
    onNextMonth: () => void;
    /** Triggers moving forward one year */
    onNextYear: () => void;
    /** Triggers moving back one month */
    onPrevMonth: () => void;
    /** Triggers moving back one year */
    onPrevYear: () => void;
}
/** The month/year banner displayed at the top of the calendar */
type HeaderComponent = JSXElementConstructor<HeaderProps>;
interface SchedulelyComponents {
    dayComponent: DayComponent;
    headerComponent: HeaderComponent;
    eventComponent: EventComponent;
}
/** Properties used to initialize Schedulely */
interface SchedulelyProps {
    /** DateAdapter used to process dates */
    dateAdapter?: DateTimeAdapter;
    /** Component overrides */
    schedulelyComponents?: Partial<SchedulelyComponents>;
    /** List of events to display */
    events: CalendarEvent[];
    /** Additional class names to apply to the root div */
    additionalClassNames?: string[];
    /** Name of theme to display */
    theme?: string;
    /** Toggle dark theme (if available) */
    dark?: boolean;
    /** Schedulely actions */
    actions?: Partial<ActionState>;
    /** Initial Date that Schedulely should be opened to */
    initialDate?: string;
}
/**
 * Create an instance of Schedulely
 * @param {SchedulelyProps} param0 Schedulely configuration properties
 * @returns
 */
declare const Schedulely: ({ dateAdapter, schedulelyComponents, events, theme, additionalClassNames, actions, dark, initialDate }: SchedulelyProps) => JSX.Element;
/**
 * Create an instance of the default date adapter
 * @param locale Locale override
 * @returns DateTimeAdapter
 */
declare const createDefaultAdapter: (locale?: string) => DateTimeAdapter;
export { Schedulely, ActionState, CalendarState, DateTimeAdapter, DisplaySize, HighlightEventState, CalendarEvent, InternalCalendarEvent, InternalEventWeek, SchedulelyComponents, SchedulelyProps, DayComponentProps, DayComponent, EventComponentProps, EventComponent, HeaderProps, HeaderComponent, createDefaultAdapter };
//# sourceMappingURL=index.d.ts.map