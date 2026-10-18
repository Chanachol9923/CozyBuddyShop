import designImage from "../assets/img/about/design.jpg"
import workshopImage from "../assets/img/about/workshop.jpg"
import AboutSection from "../components/about/AboutSection"
import ApiAttribution from "../components/about/ApiAttribution"
import TeamSection from "../components/about/TeamSection"

export default function About() {
  return (
    <div className="pt-6 lg:pt-10">
      <h1 className="sr-only">About Us</h1>

      <AboutSection title="Our Workshop" imageSrc={workshopImage} imageAlt="Shelves of handmade dolls in our workshop">
        Nestled in the heart of Bangkok, our workshop is almost as magical as the animals' home. Here you can get a
        glimpse of how we design collections, support local artisans who lovingly make all the dolls, provide customer
        service, and keep this small business running. It is also where you can browse and shop our handmade dolls in
        person. When you can, we hope you'll visit us!
      </AboutSection>

      <AboutSection
        title="Thoughtful Design"
        imageSrc={designImage}
        imageAlt="Four woodland dolls sitting in a wicker basket"
        reverse
      >
        Cozy Buddy products are thoughtfully designed with the greatest of care, and always with imaginative play in
        mind. We release many limited-edition dress-up collections throughout the year, and are proud to bring you the
        very finest in woodland fashions!
      </AboutSection>

      <ApiAttribution />

      <TeamSection />
    </div>
  )
}
