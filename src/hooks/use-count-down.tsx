import { useEffect, useRef, useState } from 'react';

const useCountDown = (initCount: number = 60) => {
    //初始化定时器id
    const timeId = useRef<{ id: number }>({ id: 0 });
    //初始化倒计时
    const [count, setCount] = useState(initCount);
    //初始化是否禁用
    const [isDisable, setIsDisable] = useState(false);

    const start = () => {
        setCount(initCount);
        setIsDisable(true);
        timeId.current.id = window.setInterval(() => {
            setCount(count => count - 1);
        }, 1000);
    };

    //   首先清除定时器
    useEffect(() => window.clearInterval(timeId.current.id), []);

    //   判断是否需要清除
    useEffect(() => {
        if (count === 0) {
            clearInterval(timeId.current.id);
            setCount(initCount);
            setIsDisable(false);
        }
    }, [count, initCount, isDisable]);

    return { start, count, isDisable };
};

export default useCountDown;
