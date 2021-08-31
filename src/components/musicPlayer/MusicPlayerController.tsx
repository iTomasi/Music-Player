import React, { useEffect, useState, useRef } from "react";
import { faPlay, faPause, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

// Components
import MusicPlayerBar from "./MusicPlayerBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMusicPlayerController {
    name: string;
    author: string;
    url: string;
}

const MusicPlayerController = ({
    name,
    author,
    url,
}: IMusicPlayerController) => {
    const audio: any = useRef();

    const [canPlay, setCanPlay] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [changingSongTime, setChangingSongTime] = useState<boolean>(false);
    const [currentPercentage, setCurrentPercentage] = useState<number>(0);
    const [volumenPercentage, setVolumentPercentage] = useState<number>(100);

    useEffect(() => {
        const theAudio = new Audio(url);

        theAudio.onerror = () => setCanPlay(1);
        theAudio.oncanplay = () => setCanPlay(2);

        audio.current = theAudio;
    }, [url]);

    useEffect(() => {
        const eventTimeUpdate = () => {
            const duration = audio.current.duration;
            const current = audio.current.currentTime;
            const thePercentage = (current * 100) / duration;

            setCurrentPercentage(thePercentage);
        };

        !changingSongTime
            ? audio.current.addEventListener("timeupdate", eventTimeUpdate)
            : audio.current.removeEventListener("timeupdate", eventTimeUpdate);

        return () =>
            audio.current.removeEventListener("timeupdate", eventTimeUpdate);
    }, [changingSongTime]);

    useEffect(() => {
        if (canPlay !== 2) return;

        const theVolumen = volumenPercentage * 0.01;

        audio.current.volume = theVolumen;
    }, [volumenPercentage]);

    const handlePlayBtn = () => {
        const theWindow: any = window;
        theWindow.plausible("PlayMusic");
        if (audio.current.paused) {
            audio.current.play();
        } else audio.current.pause();

        setIsPlaying(!audio.current.paused);
    };

    const handleOnChangeBarDuration = (getPercentage: number) =>
        setCurrentPercentage(getPercentage);

    const handleOnClickDownBar = (getPercentage: number) => {
        setChangingSongTime(true);
        setCurrentPercentage(getPercentage);
    };

    const handleOnClickUpBar = (getPercentage: number) => {
        const getSongTime = (audio.current.duration / 100) * getPercentage;

        audio.current.currentTime = getSongTime;
        setChangingSongTime(false);
    };

    if (canPlay === 0) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    } else if (canPlay === 1) {
        return (
            <div>
                <h1>Error with this song</h1>
            </div>
        );
    }

    return (
        <div className="iw_musicPlayerController">
            <div className="iw_title">
                <h2>{name}</h2>
                <h3>{author}</h3>
            </div>

            <div className="iw_controller">
                <MusicPlayerBar
                    className="theBar"
                    percentage={currentPercentage}
                    onChange={handleOnChangeBarDuration}
                    onClickDown={handleOnClickDownBar}
                    onClickUp={handleOnClickUpBar}
                />

                <div className="iw_buttons">
                    <button
                        className="iw_play"
                        type="button"
                        onClick={handlePlayBtn}
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                </div>

                <div className="iw_volume">
                    <div className="iw_icon">
                        <FontAwesomeIcon icon={faVolumeUp} />
                    </div>

                    <div className="iw_volumeBar">
                        <MusicPlayerBar
                            className="volume"
                            percentage={volumenPercentage}
                            onChange={(getPercentage: number) =>
                                setVolumentPercentage(getPercentage)
                            }
                            onClickDown={(getPercentage: number) =>
                                setVolumentPercentage(getPercentage)
                            }
                            onClickUp={() => console.log("?")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayerController;
