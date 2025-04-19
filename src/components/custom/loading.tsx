import RingLoader from 'react-spinners/RingLoader';

import { cn } from '@/lib/utils';

interface loadingProps {
    className?: string;
}

const Loading: React.FC<loadingProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'fixed top-0 left-0 w-full h-full flex items-center justify-center z-50',
                className
            )}
        >
            <RingLoader
                color="var(--theme)"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
Loading.displayName = 'Loading';

export default Loading;
