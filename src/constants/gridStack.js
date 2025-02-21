

export const BREAKPOINTS = [
  { c: 1, w: 700 },
  { c: 3, w: 850 },
  { c: 6, w: 950 },
  { c: 8, w: 1100 },
];
const cellHeight = 120;

export const SUB_GRID_OPTIONS = {
  handle: '.MuiCardHeader-root',
  acceptWidgets: true,
  columnOpts: {
    breakpoints: BREAKPOINTS,
    layout: 'moveScale',
  },
  margin: 8,
  minRow: 2,
  cellHeight,
};

export const GRID_OPTIONS = {
  handle: '.MuiCardHeader-content',
  float: true,
  acceptWidgets: true,
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: 'moveScale',
  },
  margin: 8,
  cellHeight,
  // subGridOpts: SUB_GRID_OPTIONS,
};