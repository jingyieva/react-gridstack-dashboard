import { useContext } from "react";

import { GridstackContext } from "components/GridStack/GridStackContext";

export const useGridstackContext = () => {
    const gridstackContext = useContext(GridstackContext);
    if (!gridstackContext) {
      throw new Error('useGridstack must be used within a GridstackProvider');
    }
    return gridstackContext;
};