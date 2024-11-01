import { useState } from "react";
import SmallCard from "../components/accueil/SmallCard";
import InfoCard from "../components/accueil/InfoCard";
import {
  PhoneArrowDownLeftIcon,
  HeartIcon,
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid";
import SectionWithImage from "../components/accueil/SectionWithImage";
import Notification from "../components/Notification";

const Accueil = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-12">
      <div className="text-center px-4 lg:px-0">
        <h1 className="text-5xl font-bold mt-16">Bienvenue sur SearchVeto</h1>
        <h1 className="mt-3 text-2xl">
          Votre plateforme de recherche de cabinet vétérinaire
        </h1>
      </div>
      <SectionWithImage
        imageSrc="/quiSommesNous.png"
        title="Le bien-être et la santé de vos animaux en ligne"
        content={`
          <p>Nous avons à cœur de vous accompagner, quels que soient votre besoin ou vos doutes. Nous vous proposons un service vétérinaire complet en ligne afin que vous retrouviez toutes les réponses à vos questions.</p>
          <br/><p>Nous mettons à votre disposition des informations médicales et des conseils pratiques concernant la santé de vos animaux. Prochainement aussi, vous pourrez découvrir notre boutique en ligne pour acheter nourriture, médicaments et jouets pour votre animal.</p>
          <br/><p>Retrouvez un espace utilisateur complet avec une fiche pour votre animal comprenant le suivi de vos rendez-vous, un rappel des vaccins et des conseils adaptés.</p>
        `}
        buttonLink="/animals"
        buttonText="Commençons par ajouter nos animaux"
        buttonColor={"btn-secondary"}
        buttonIcon={
          <HandThumbUpIcon className="h-6 w-6 text-secondary group-hover:text-secondary-content" />
        }
        reverse={true}
      />
      <div className="w-full flex justify-center mt-12">
        <InfoCard
          title="Une équipe de vétérinaires à votre service"
          description="Si votre animal présente une plaie, des vomissements, des crises convulsives, de la fièvre, des difficultés respiratoires, ou autre problème qui vous semble inquiétant, contactez-nous. Les cliniques et cabinets vétérinaires du réseau SearchVeto restent disponibles 7j/7 pour traiter les urgences vétérinaires.
          Si votre animal ne présente pas ces symptômes, nous vous invitons à prendre contact avec la clinique vétérinaire SearchVeto la plus proche de chez vous pendant les horaires d’ouverture. Prenez rendez-vous en toute simplicité et rencontrez nos équipes vétérinaires dédiées au bien-être de votre animal !"
          linkText="Prendre rendez vous"
          linkUrl="/clinics#clinic-top"
          bgColor="primary"
          bgImage="/ImageInfoCard.png"
          btnLogo={<ArrowTopRightOnSquareIcon className="h-6 w-6" />}
        />
      </div>
      <SectionWithImage
        imageSrc="/reseau.png"
        title="Notre réseau"
        content={`
          <p>Découvrez nos cliniques vétérinaires SearchVeto, des professionnels à votre écoute pour garantir le bien-être et la santé de vos animaux. En tant que réseau français de cabinets et cliniques vétérinaires d’excellence, nous appliquons des soins de qualité dans des structures à taille humaine.</p>
          <br/><p>Nous sommes présents dans de nombreuses agglomérations françaises, au plus proche de votre animal de compagnie. Faites confiance à SearchVeto Vétérinaire, le meilleur ami de l&apos;animal !</p>
        `}
        reverse={true}
      />
      <SectionWithImage
        imageSrc="/home_chien.jpg"
        title="Nos services en ligne"
        content={`
          <p>Prochainement chez SearchVeto, nous offrirons une gamme complète de services en ligne pour répondre aux besoins de vos animaux de compagnie.</p>
          <br/><p>Nos services incluront :</p>
          <ul>
          <li>- Des consultations vétérinaires en ligne pour des conseils rapides et professionnels.</li>
          <li>- Des outils de suivi de la santé pour surveiller les vaccinations, les traitements et les rendez-vous de votre animal.</li>
          <li>- Un accès à des articles et des vidéos éducatives sur la santé et le bien-être des animaux.</li>
          </ul>
          <br/><p>Grâce à notre plateforme, vous pourrez gérer la santé de votre animal en toute simplicité, où que vous soyez. Profitez de nos futurs services pour assurer le bien-être de votre compagnon à quatre pattes.</p>`}
        buttonLink="#"
        buttonText="Découvrir nos services"
        buttonColor={"btn-primary"}
        buttonIcon={
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-primary group-hover:text-primary-content" />
        }
        reverse={false}
        onButtonClick={handleDiscoverClick}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
        <SmallCard
          logo={<PhoneArrowDownLeftIcon className="w-20 h-20 text-base-100" />}
          title="Une urgence vétérinaire ?"
          description="Si votre animal de compagnie présente un comportement ou des symptômes inhabituels, contactez-nous directement par téléphone."
          buttonText="Nous appeler"
          buttonLink="tel:+123456789"
          bgColor="bg-secondary"
          btnTextColor="text-secondary"
        />
        <SmallCard
          logo={<HeartIcon className="w-20 h-20 text-base-100" />}
          title="J'ai trouvé un animal"
          description="Vous avez trouvé un animal égaré ? Remplissez notre formulaire afin de relayer l'information directement à nos cliniques SearchVeto Vétérinaire."
          buttonText="Nous contacter"
          buttonLink="#"
          bgColor="bg-accent"
          btnTextColor="text-accent"
        />
      </div>
      {showNotification && (
        <Notification
          title="Information"
          message="Bientôt disponible dans une prochaine mise à jour."
          bgColor="bg-info"
          textColor="text-info-content"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Accueil;
