import MeetTeam from '../../components/Template/Aboutus/MeetTeam/MeetTeam'
import WhyChooseUs from '../../components/Template/Aboutus/WhyChooseUs/WhyChooseUs'
import './About.css'
import PagesHeader from '../../components/Module/PagesHeader/PagesHeader'

function About() {
  return (
    <>
    <PagesHeader currentRoute={'درباره ما'} />
    <WhyChooseUs />
    <MeetTeam />
    </>
  )
}

export default About
