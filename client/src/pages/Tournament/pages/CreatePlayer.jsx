import PlayerForm from "../component/PlayerForm";
import PlayerHeroSection from "../component/PlayerHeroSection";


function CreatePlayer() {
    return (
        <div className="grid gap-6 xl:grid-cols-[300px_1fr] p-10">
            <PlayerHeroSection />
            <PlayerForm />
        </div>
    );
}

export default CreatePlayer;