export interface Theme {
  currentMonthBgColor: string;
  siblingMonthBgColor: string;
  gridGap: string;
  dayOfWeekHeaderBgColor: string;
  dayOfWeekTextHeaderTextColor: string;
  dayHeight: string;
}

export const defaultTheme: Theme = {
  currentMonthBgColor: 'white',
  siblingMonthBgColor: '#eff2f1',
  gridGap: '0em',
  dayOfWeekHeaderBgColor: 'black',
  dayOfWeekTextHeaderTextColor: 'white',
  dayHeight: '7em',
};

/** Create a theme by merging partial keys with the default theme */
export const makeCssTheme = (theme: Partial<Theme>, namespace: string) => {
  const customTheme = Object.entries(theme).reduce(
    (cssTheme, [key, value]) => ({
      ...cssTheme,
      [`--${namespace}-${key}`]: value,
    }),
    {}
  );

  return { ...defaultTheme, ...customTheme };
};
