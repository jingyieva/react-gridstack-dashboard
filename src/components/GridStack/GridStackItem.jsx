import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useGridstackContext } from 'utils/useGridstackContext';

export const GridstackItem = ({ id, children }) => {
    const { getWidgetContent } = useGridstackContext();
    let widgetContent = getWidgetContent(id);
    if (!widgetContent) {
        return null;
    }

    const element =  createPortal((
        <div className="grid-stack-item-content">
            {children}
        </div>
    ), widgetContent);

    return element;
};

GridstackItem.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
};