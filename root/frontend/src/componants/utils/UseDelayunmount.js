import { useState, useEffect } from "react";

export default function useDelayUnmount(isMounted, delayTime) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isMounted) {
            setShouldRender(true);
        } else {
            timeoutId = setTimeout(() => setShouldRender(false), delayTime);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMounted, delayTime, shouldRender]);

    return shouldRender;
}
