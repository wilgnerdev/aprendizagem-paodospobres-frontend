import CardGrid from "./components/CardGrid/CardGrid"
import Banner from "./components/HomeBanner/HomeBanner"
import HomeAbout from "./components/HomeAbout/HomeAbout"
import FormStep from "./components/FormStep/FormStep"
import FormLink from "./components/FormLink/FormLink"
import HomeFaq from "./components/HomeFaq/HomeFaq"

function Home() {
    return (
        <main>
            <Banner />
            <HomeAbout />
            <CardGrid />
            <FormStep />
            <FormLink />
            <HomeFaq />
        </main>
    )
}

export default Home