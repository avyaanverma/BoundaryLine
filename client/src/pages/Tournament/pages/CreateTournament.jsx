import HeroSection from "../component/Herosection";
import TournamentForm from "../component/TournamentForm";

function CreateTournament() {
    return (
        <div className="w-full">
            <div
                className="
          grid
          grid-cols-1
          xl:grid-cols-[380px_1fr]
          gap-4
          items-start p-10
        "
            >
                <HeroSection />
                <TournamentForm />
            </div>
        </div>
    );
}

export default CreateTournament;