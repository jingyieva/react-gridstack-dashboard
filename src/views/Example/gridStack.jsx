import { useRef, useState, Fragment } from 'react';
import { GRID_OPTIONS, SUB_GRID_OPTIONS } from 'constants/gridStack';
import { GridstackItem, GridstackProvider } from 'components/GridStack';
import Button from '@mui/material/Button';
// import './style.css';

const gridOptions = {
  children: [
    { h: 2, id: 'item1', w: 2, x: 1, y: 1 },
    { h: 2, id: 'item2', w: 2, x: 2, y: 0 },
    {
      h: 5,
      id: 'sub-grid-1',
      noResize: true,
      sizeToContent: true,
      subGridOpts: {
        ...SUB_GRID_OPTIONS,
        children: [
          {
            h: 1,
            id: 'sub-grid-1-title',
            locked: true,
            noMove: true,
            noResize: true,
            w: 12,
            x: 0,
            y: 0,
          },
          { h: 2, id: 'item3', w: 2, x: 0, y: 0 },
          { h: 2, id: 'item4', w: 2, x: 0, y: 0 },
        ],
      },
      w: 12,
      x: 0,
      y: 0,
    },
  ],
  ...GRID_OPTIONS,
};


const gridOptions2 = {
  children: [
    { h: 2, id: 'item6', w: 4, x: 0, y: 0 },
    { h: 2, id: 'item7', w: 6, x: 0, y: 0 },
    {
      h: 5,
      id: 'sub-grid-2',
      noResize: true,
      sizeToContent: true,
      subGridOpts: {
        ...SUB_GRID_OPTIONS,
        children: [
          {
            h: 1,
            id: 'sub-grid-2-title',
            locked: true,
            noMove: true,
            noResize: true,
            w: 12,
            x: 0,
            y: 0,
          },
          { h: 2, id: 'item8', w: 4, x: 0, y: 0 },
          { h: 2, id: 'item9', w: 6, x: 0, y: 0 },
        ],
      },
      w: 12,
      x: 0,
      y: 0,
    },
  ],
  ...GRID_OPTIONS,
};

const WIDGETS_NODE_MAP = {
  item1: <div className="w-full h-full">Item 1</div>,
  item2: <div className="w-full h-full">Item 2</div>,
  'sub-grid-1': (
    <>
      <GridstackItem id="sub-grid-1-title">
        <div className="w-full h-full flex items-center justify-center">
          <span>Section Title Locked</span>
        </div>
      </GridstackItem>
      <GridstackItem id="item3">
        <div className="w-full h-full">Item 3</div>
      </GridstackItem>
      <GridstackItem id="item4">
        <div className="w-full h-full">Item 4</div>
      </GridstackItem>
    </>
  ),
  item6: <div className="w-full h-full">Item 6</div>,
  item7: <div className="w-full h-full">Item 7</div>,
  'sub-grid-2': (
    <>
      <GridstackItem id="sub-grid-2-title">
        <div className="w-full h-full flex items-center justify-center">
          <span>Section Title Locked</span>
        </div>
      </GridstackItem>
      <GridstackItem id="item8">
        <div className="w-full h-full">Item 8</div>
      </GridstackItem>
      <GridstackItem id="item9">
        <div className="w-full h-full">Item 9</div>
      </GridstackItem>
    </>
  ),
};

const GridStackDemo = () => {
  const [currentGridOptions, setCurrentGridOptions] = useState(gridOptions);
  const currentGridName = useRef('Grid A');


  return (
    <div>
        <Button
            variant="contained"
            component="button"
            role={undefined}
            color="primary"
            onClick={(e) => {
                if(currentGridName.current === 'Grid A') {
                    setCurrentGridOptions(gridOptions2);
                    currentGridName.current = 'Grid B';
                } else {
                    setCurrentGridOptions(gridOptions);
                    currentGridName.current = 'Grid A';
                }
            }}
        >Change Grid To New Grid</Button>
        <Button
            variant="contained"
            component="button"
            role={undefined}
            color="primary"
            onClick={() => {
                currentGridOptions.children = [
                    ...currentGridOptions.children,
                    {
                        id: `item-${currentGridOptions.children.length+2}`,
                        h: 2,
                        w: 4, x: 0, y: 0,
                    },
                ];
                setCurrentGridOptions({
                    ...currentGridOptions
                })
            }}
        >
            Add</Button>
        <span>{currentGridName.current}</span>
        <GridstackProvider options={currentGridOptions}>
            <GridDemo options={currentGridOptions} />
        </GridstackProvider>
    </div>
  );
};

const GridDemo = ({ options }) => {
  return (
    <>
      {options.children?.map((widget) => {
        if (!widget.id) {
          return null;
        }

        if (widget.subGridOpts) {
          return (
            <Fragment key={widget.id}>
              {WIDGETS_NODE_MAP[widget.id]}
            </Fragment>
          );
        }

        return (
          <GridstackItem key={widget.id} id={widget.id}>
            {WIDGETS_NODE_MAP[widget.id]}
          </GridstackItem>
        );
      })}
    </>
  );
};

export default GridStackDemo;