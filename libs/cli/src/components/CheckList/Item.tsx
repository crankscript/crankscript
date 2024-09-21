import {
    StatusMessage,
    StatusMessageProps,
    Spinner,
    extendTheme,
    defaultTheme,
    ThemeProvider,
} from '@inkjs/ui';
import { Text, TextProps } from 'ink';
import React, { useEffect, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';

export interface ItemProps {
    item: CheckListItem;
    start: boolean;
}

// todo: possibly extract this
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

export const Item = ({
    item: {
        runningDescription,
        waitingDescription,
        errorDescription,
        finishedDescription,
        runner,
        onFinish,
    },
    start,
}: ItemProps) => {
    const [resultPresent, setResultPresent] = useState(false);
    const [failedReason, setfailedReason] = useState<string | null>(null);
    const hasResult = !failedReason && resultPresent;
    const isRunning = !failedReason && !hasResult && start;
    const isWaiting = !failedReason && !hasResult && !start;

    useEffect(() => {
        if (failedReason) {
            process.exit();
        }
    }, [failedReason]);

    useEffect(() => {
        if (!start) {
            return;
        }

        runner()
            .then((result) => {
                if (result === false) {
                    setfailedReason(errorDescription);

                    return;
                }

                setResultPresent(true);
                onFinish();
            })
            .catch((reason) => {
                setfailedReason(reason.message);
            });
    }, [errorDescription, onFinish, runner, start]);

    let message = waitingDescription();
    let variant: StatusMessageProps['variant'] = 'info';

    if (failedReason) {
        message = failedReason;
        variant = 'error';
    } else if (isRunning) {
        message = runningDescription();
        variant = 'warning';
    } else if (hasResult) {
        message = finishedDescription();
        variant = 'success';
    }

    if (isRunning) {
        return (
            <ThemeProvider theme={SpinnerTheme}>
                <Spinner label={` ${message}`} />
            </ThemeProvider>
        );
    }

    return (
        <StatusMessage variant={variant}>
            <Text
                bold={!isWaiting}
                color={
                    isRunning
                        ? 'yellow'
                        : isWaiting
                        ? 'gray'
                        : failedReason
                        ? 'red'
                        : 'green'
                }
            >
                {message}
            </Text>
        </StatusMessage>
    );
};
