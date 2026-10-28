import CardGrid from "./components/CardGrid/CardGrid";
import Banner from "./components/HomeBanner/HomeBanner";
import HomeAbout from "./components/HomeAbout/HomeAbout";
import FormStep from "./components/FormStep/FormStep";

function Home() {
    return (
        <main>
            <Banner />
            <HomeAbout />
            <CardGrid />
            <FormStep />
        </main>
    )
}

export default Home;