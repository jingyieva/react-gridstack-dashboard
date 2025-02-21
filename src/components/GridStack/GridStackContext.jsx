
import PropTypes from 'prop-types';
import { GridStack } from 'gridstack';
import {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
} from 'react';

import { GRID_OPTIONS } from 'constants/gridStack';

export const GridstackContext = createContext(null);

export const GridstackProvider = ({ children, items = [], onPositionChange }) => {
    const widgetContentRef = useRef({});
    const containerRef = useRef(null);
    const optionsRef = useRef({
        children: items,
        ...GRID_OPTIONS,
    });
    const gridRef = useRef(null);

    const getWidgetContent = useCallback((id) => {
        if (widgetContentRef.current[id]) {
            return widgetContentRef.current[id];
        } else {
            const grid = gridRef.current;
            const existingNode = grid.engine.nodes.find((node) => node.id === id);

            if (existingNode) {
                widgetContentRef.current[id] = existingNode.el;
                return existingNode.el;
            }

            // 建立新的 DOM 容器並新增至 GridStack
            const el = document.createElement('div');
            el.className = 'grid-stack-item';
            grid.makeWidget(el, {
                id: id,
                w: 4,
                h: 4,
            });

            widgetContentRef.current[id] = el;
            return el;
        }
    }, []);
    const renderCBFn = useCallback((element, widget) => {
        console.log('[GridStackProvider] Render Callback Triggered:', { element, widget });

        if (widget.id) {
            widgetContentRef.current[widget.id] = element;
        }
    }, []);

    const initGrid = useCallback(() => {
        console.log(`[GridStackProvider] Initialize`)

        if (containerRef.current) {
            GridStack.renderCB = renderCBFn;
            const grid = GridStack.init(optionsRef.current, containerRef.current);
            // 移除舊的事件監聽
            grid.off('added removed change');

            grid.on('added change removed', (event) => {
                console.log(`[GridStackProvider] Grid "${event.type}" event triggered`);
                const currentGrid = gridRef.current;
                const allGrids = currentGrid.engine.nodes?.map(node => ({
                    id: node.id,
                    x: node.x,
                    y: node.y,
                    w: node.w,
                    h: node.h
                })) || [];

                if (onPositionChange) {
                    Promise.resolve().then(() => {
                        onPositionChange(allGrids);
                    });
                }
            });

            gridRef.current = grid;
        }
    }, [renderCBFn, onPositionChange]);

    // 同步 children 到 Gridstack
    const updateGridItems = useCallback(() => {
        const grid = gridRef.current;
        if (grid && items) {
            const existingItems = grid.engine.nodes.map((n) => n.id);
            const notExistingItems = grid.engine.nodes.filter((n) => !(items.map((i) => i.id)).includes(n.id)) || [];
            grid.batchUpdate();
            // add
            items.forEach((child) => {
                if (!existingItems.includes(child.id)) {
                    grid.addWidget({
                        id: child.id,
                        x: child.x,
                        y: child.y,
                        w: child.w,
                        h: child.h,
                        content:( widgetContentRef.current[child.id] ),
                    });

                } else {
                    grid.makeWidget(`#${child.id}`);
                    grid.update(`#${child.id}`, {
                        x: child.x,
                        y: child.y,
                        w: child.w,
                        h: child.h
                    });
                }
            });
            // delete
            if (notExistingItems.length > 0) {
                notExistingItems.forEach((e) => {
                    grid.removeWidget(e.el)
                })
            }

            grid.batchUpdate(false);
        }
    }, [items]);

    useEffect(() => {
        if (!gridRef.current) {
            initGrid();
        }
    }, []);

    // 當 children 更新時同步到 Gridstack
    useLayoutEffect(() => {
        updateGridItems();
    }, [updateGridItems]);

    const value = useMemo(
        () => ({
            getWidgetContent,
            getGrid: () => gridRef.current,
        }),
        [getWidgetContent],
    );

    return (
        <GridstackContext.Provider value={value}>
            <div ref={containerRef} className="bg-gray-200 m-0 h-[400px]">{children}</div>
        </GridstackContext.Provider>
    );
};

GridstackProvider.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    onPositionChange: PropTypes.func,
};