import React from "react";

// Components
import MusicPlayerController from "./musicPlayer/MusicPlayerController";

interface IMusicPlayerProps {
    url: string;
    img: string;
    name: string;
    author: string;
}

const MusicPlayer = ({ url, img, name, author }: IMusicPlayerProps) => {
    return (
        <div className="iw_musicPlayer">
            <img src={img} alt={name} />

            <MusicPlayerController name={name} author={author} url={url} />
        </div>
    );
};

export default MusicPlayer;
