import React, { useEffect, useRef } from "react";

interface IMusicPlayerBarProps {
    className: string;
    percentage: number;
    onChange: any;
    onClickUp?: any;
    onClickDown?: any;
}

const MusicPlayerBar = ({
    className,
    percentage,
    onChange,
    onClickDown,
    onClickUp,
}: IMusicPlayerBarProps) => {
    const barRef: any = useRef();

    useEffect(() => {
        const theClassName = `iw_${className}`;

        const thePercentage = (e: any) => {
            const clientX = e.clientX;
            const barWidth = barRef.current.offsetWidth;
            const barLeft = barRef.current.offsetLeft;
            const barRight =
                window.innerWidth - barRef.current.getBoundingClientRect().left;

            if (clientX >= barLeft && clientX <= barRight) {
                const mousePosition = clientX - barLeft;
                const getPercentage = (mousePosition * 100) / barWidth;

                return getPercentage;
            } else if (clientX > barRight) return 100;
            else if (clientX < barLeft) return 0;
        };

        const handleMouseMove = (e: any) => onChange(thePercentage(e));

        const handleProgressBarUp = (e: any) => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleProgressBarUp);
            const perc = thePercentage(e);
            onClickUp(perc);
        };

        const handleProgressBarDown = (e: any) => {
            if (
                e.target.classList.contains(theClassName) ||
                e.target.parentElement.classList.contains(theClassName) ||
                e.target.parentElement.parentElement.classList.contains(
                    theClassName
                )
            ) {
                e.preventDefault();

                onClickDown(thePercentage(e));

                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleProgressBarUp);
            }
        };

        window.addEventListener("mousedown", handleProgressBarDown);

        return () => {
            window.removeEventListener("mousedown", handleProgressBarDown);
            window.removeEventListener("mouseup", handleProgressBarUp);
        };
    }, []);

    return (
        <div className={`iw_bar iw_${className}`} ref={barRef}>
            <div className="iw_progress" style={{ width: `${percentage}%` }}>
                <div className="iw_circle"></div>
            </div>
        </div>
    );
};

export default MusicPlayerBar;
