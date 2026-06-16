import SeriesForm from "../component/SeriesForm";
import SeriesHeroSection from "../component/SeriesHeroSection";



function CreateSeries() {
    return (
        <div className="grid gap-6 xl:grid-cols-[320px_1fr] p-10">
            <SeriesHeroSection />
            <SeriesForm />
        </div>
    );
}

export default CreateSeries;