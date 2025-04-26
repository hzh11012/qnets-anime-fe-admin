import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface DataTableTooltipProps {
    items: string[];
    maxCount?: number;
}

const DataTableTooltip: React.FC<DataTableTooltipProps> = ({
    items,
    maxCount = 3
}) => {
    if (!items || !items.length) return '-';

    const remaining = items.length - maxCount;

    if (remaining <= 0) return items.join(' ');

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{items.slice(0, maxCount).join(' ')} ...</span>
                </TooltipTrigger>
                <TooltipContent
                    className={cn(
                        'max-w-64 max-h-64 overflow-auto scroll-hidden'
                    )}
                >
                    {items.join(' ')}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export { DataTableTooltip };
