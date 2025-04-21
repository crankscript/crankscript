import { StatusMessage, StatusMessageProps } from '@inkjs/ui';
import { Text } from 'ink';
import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '@/cli/components/Spinner.js';
import { CheckListItem } from '@/cli/types.js';

export interface ItemProps<TResult> {
    item: CheckListItem<TResult>;
    start: boolean;
}

export const Item = <TResult,>({
    item: {
        runningDescription,
        waitingDescription,
        errorDescription,
        finishedDescription,
        skipDescription,
        runner,
        onFinish,
        ready,
        quitOnError = true,
        skip,
    },
    start,
}: ItemProps<TResult>) => {
    const executed = useRef(false);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const [dotCount, setDotCount] = useState(0);
    const [result, setResult] = useState<TResult | null | false>(null);
    const [failedReason, setfailedReason] = useState<string | null>(null);
    const [isSkipped, setIsSkipped] = useState(false);

    // Determine if the task should be skipped
    const shouldSkip = typeof skip === 'function' ? skip() : skip === true;

    const hasResult = !failedReason && result !== null;
    const isRunning =
        !failedReason && !hasResult && start && ready !== false && !shouldSkip;
    const isWaiting = !failedReason && !hasResult && (!start || !ready);
    const couldStartButNotReady =
        !failedReason && !hasResult && start && ready === false;

    useEffect(() => {
        if (failedReason && quitOnError) {
            process.exit();
        }
    }, [failedReason, quitOnError]);

    useEffect(() => {
        if (couldStartButNotReady) {
            interval.current = setInterval(() => {
                setDotCount(count => (count + 1) % 4);
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

        // If the task should be skipped, mark it as executed with a success result
        if (shouldSkip) {
            executed.current = true;
            setIsSkipped(true);
            setResult(true as TResult);
            onFinish?.(true as TResult);
            return;
        }

        runner()
            .then(result => {
                executed.current = true;

                if (result === false) {
                    setfailedReason(errorDescription);

                    return;
                }

                setResult(result);
                onFinish?.(result);
            })
            .catch(reason => {
                setfailedReason(reason.message);
                setResult(false);
                onFinish?.(false);
            });
    }, [errorDescription, onFinish, runner, start, shouldSkip]);

    let message = waitingDescription;
    let variant: StatusMessageProps['variant'] = 'info';

    if (failedReason) {
        message = ` ${failedReason}`;
        variant = 'error';
    } else if (isSkipped) {
        message = skipDescription || 'Task skipped';
        variant = 'info';
    } else if (isRunning) {
        message = runningDescription;
        variant = 'warning';
    } else if (hasResult) {
        message = finishedDescription(result);
        variant = 'success';
    }

    if (isRunning) {
        return <Spinner label={message} />;
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
                        : isSkipped
                        ? 'gray'
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
