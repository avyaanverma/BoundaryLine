import MatchForm from "../component/MatchForm";
import MatchHeroSection from "../component/MatchHeroSection";


function CreateMatch() {
    return (
        <div className="grid gap-6 xl:grid-cols-[320px_1fr] p-10">
            <MatchHeroSection />
            <MatchForm />
        </div>
    );
}

export default CreateMatch;