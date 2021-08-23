// Components
import MusicPlayer from "components/MusicPlayer";

const Index = () => {
    return (
        <div className="iw_index">
            <MusicPlayer
                url="/song.mp3"
                name="Take Me Home"
                author="Delta Heavy"
                img="/2.jpg"
            />
        </div>
    );
};

export default Index;
