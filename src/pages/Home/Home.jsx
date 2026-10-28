import CardGrid from "./components/CardGrid/CardGrid";
import Banner from "./components/HomeBanner/HomeBanner";
import HomeAbout from "./components/HomeAbout/HomeAbout";

function Home() {
    return (
        <main>
            <Banner />
            <HomeAbout />
            <CardGrid />
        </main>
    )
}

export default Home;