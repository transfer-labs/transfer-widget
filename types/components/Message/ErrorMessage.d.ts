import { type FunctionComponent } from 'react';
import { type ErrorType } from '../../models/const';
export interface ErrorMessageProps {
    errorType?: ErrorType;
}
export declare const ErrorMessage: FunctionComponent<ErrorMessageProps>;
