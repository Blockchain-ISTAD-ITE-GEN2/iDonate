import React, { createElement, ReactNode } from 'react';
import IdonateLoadingIndicator from './IdonateLoadingIndicator';
import IDONATEErrorHandling from './IDONATEErrorHandling';
import { useSelector } from 'react-redux';
import { selectLoading } from "@/redux/features/auth/authSlice";

interface IdonateHandleContentProps {
    children: ReactNode;
    isLoading: boolean;
    error: { status: number } | null;
    disabledErrorCode?: number;
    loadingComponent?: React.ComponentType<any>;
    customLoadingContent?: ReactNode;
    [key: string]: any; // for additional props
}

const IdonateHandleContent: React.FC<IdonateHandleContentProps> = ({
                                                                       children,
                                                                       isLoading,
                                                                       error,
                                                                       disabledErrorCode,
                                                                       loadingComponent = IdonateLoadingIndicator,
                                                                       customLoadingContent,
                                                                       ...props
                                                                   }) => {
    const loading = useSelector(selectLoading);

    if (isLoading && loading) {
        if (customLoadingContent) {
            return <>{customLoadingContent}</>;
        } else {
            return createElement(loadingComponent, props);
        }
    }

    if (error && !loading) {
        if (disabledErrorCode !== error.status) {
            switch (error.status) {
                case 400:
                    return <IDONATEErrorHandling message="Bad request" code={error.status} />;
                case 401:
                    return <IDONATEErrorHandling message="Unauthorized" code={error.status} />;
                case 404:
                    return <IDONATEErrorHandling message="Not Found" code={error.status} />;
                case 403:
                    return <IDONATEErrorHandling message="Forbidden" code={error.status} />;
                case 500:
                    return <IDONATEErrorHandling message="Internal server error" code={error.status} />;
                default:
                    return <IDONATEErrorHandling message="Something went wrong!!!" code={error.status} />;
            }
        }
    }

    return <>{children}</>;
};

export default IdonateHandleContent;
