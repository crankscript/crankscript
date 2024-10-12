import {
    Spinner as InkUiSpinner,
    SpinnerProps,
    extendTheme,
    defaultTheme,
    ThemeProvider,
} from '@inkjs/ui';
import { TextProps } from 'ink';
import React from 'react';

const SpinnerTheme = extendTheme(defaultTheme, {
    components: {
        Spinner: {
            styles: {
                frame: (): TextProps => ({
                    color: 'yellowBright',
                }),
                label: (): TextProps => ({
                    color: 'yellowBright',
                }),
            },
        },
    },
});

export const Spinner = (props: SpinnerProps) => {
    return (
        <ThemeProvider theme={SpinnerTheme}>
            <InkUiSpinner {...props} label={` ${props.label}`} />
        </ThemeProvider>
    );
};
