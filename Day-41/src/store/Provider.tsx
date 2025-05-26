import Context from './Context.ts';
import {type ReactNode, useReducer} from 'react';

import reducer, { initState } from './reducer.ts';

function Provider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        // @ts-expect-error the type is not perfectly matched
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;
