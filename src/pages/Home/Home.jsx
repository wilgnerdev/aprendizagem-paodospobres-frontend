import CardGrid from "./components/CardGrid/CardGrid";
import Banner from "./components/HomeBanner/HomeBanner";
import HomeAbout from "./components/HomeAbout/HomeAbout";
import StepForms from "./components/StepForms/StepForms";

function Home() {
    return (
        <main>
            <Banner />
            <HomeAbout />
            <CardGrid />
            <StepForms />
        </main>
    )
}

export default Home;