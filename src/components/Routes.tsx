import React, {FunctionComponent} from 'react';
import Route, {RouteProps} from './Route';

export interface RoutesProps {
    routeprops: RouteProps
    status?: 'default' | 'selected'
}

const Routes:FunctionComponent<RoutesProps> = ({
    routeprops,
    status
}) => {
        if (status === 'default') {
            return null;
        }
        else {
            return (
            <div className = "flex flex-col gap-3">
                <div className = 'flex flex-row w-full items-stretch'/>
                <p className={'text-white font-manrope text-lg font-medium'}>
                    Routes
                </p> 
                <a><p className={'text-accent-color font-manrope text-lg font-medium'}>
                    View Additional
                </p></a>
                <Route {...routeprops}/>
            </div>
            )
        }
}

export default Routes;