import CardGrid from "./components/CardGrid/CardGrid"
import Banner from "./components/HomeBanner/HomeBanner"
import HomeAbout from "./components/HomeAbout/HomeAbout"
import FormStep from "./components/FormStep/FormStep"
import FormLink from "./components/FormLink/FormLink"

function Home() {
    return (
        <main>
            <Banner />
            <HomeAbout />
            <CardGrid />
            <FormStep />
            <FormLink />
        </main>
    )
}

export default Home