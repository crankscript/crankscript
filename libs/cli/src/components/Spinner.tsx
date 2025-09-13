import {
    defaultTheme,
    extendTheme,
    Spinner as InkUiSpinner,
    type SpinnerProps,
    ThemeProvider,
} from '@inkjs/ui';
import type { TextProps } from 'ink';
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
