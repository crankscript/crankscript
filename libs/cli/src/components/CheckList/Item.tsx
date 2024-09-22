import {
    StatusMessage,
    StatusMessageProps,
    Spinner,
    extendTheme,
    defaultTheme,
    ThemeProvider,
} from '@inkjs/ui';
import { Text, TextProps } from 'ink';
import React, { useEffect, useRef, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';

export interface ItemProps<TResult> {
    item: CheckListItem<TResult>;
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

export const Item = <TResult,>({
    item: {
        runningDescription,
        waitingDescription,
        errorDescription,
        finishedDescription,
        runner,
        onFinish,
        ready,
    },
    start,
}: ItemProps<TResult>) => {
    const executed = useRef(false);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const [dotCount, setDotCount] = useState(0);
    const [result, setResult] = useState<TResult | null>(null);
    const [failedReason, setfailedReason] = useState<string | null>(null);
    const hasResult = !failedReason && result !== null;
    const isRunning = !failedReason && !hasResult && start && ready !== false;
    const isWaiting = !failedReason && !hasResult && (!start || !ready);
    const couldStartButNotReady =
        !failedReason && !hasResult && start && ready === false;

    useEffect(() => {
        if (failedReason) {
            process.exit();
        }
    }, [failedReason]);

    useEffect(() => {
        if (couldStartButNotReady) {
            interval.current = setInterval(() => {
                setDotCount((count) => (count + 1) % 4);
            }, 250);
        } else {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [couldStartButNotReady]);

    useEffect(() => {
        if (!start || executed.current || ready === false) {
            return;
        }

        runner()
            .then((result) => {
                executed.current = true;

                if (result === false) {
                    setfailedReason(errorDescription);

                    return;
                }

                setResult(result);
                onFinish?.(result);
            })
            .catch((reason) => {
                setfailedReason(reason.message);
            });
    }, [errorDescription, onFinish, runner, start]);

    let message = waitingDescription;
    let variant: StatusMessageProps['variant'] = 'info';

    if (failedReason) {
        message = ` ${failedReason}`;
        variant = 'error';
    } else if (isRunning) {
        message = runningDescription;
        variant = 'warning';
    } else if (hasResult) {
        message = finishedDescription(result);
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
                {message}{' '}
                {couldStartButNotReady &&
                    `— not ready yet${'.'.repeat(dotCount)}`}
            </Text>
        </StatusMessage>
    );
};
