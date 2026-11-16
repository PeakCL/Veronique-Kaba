import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";
import styles from "./choix.module.css";

/**
 * Choix entre trois directions de logo, destiné à Véronique :
 * A et B, puis C, une version hybride qui fusionne les deux.
 * Page autonome : sans l'habillage du site (voir SiteChrome), non indexée.
 * Fond neutre et traitement identique pour les propositions.
 */

const serif = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-choix-serif",
});

const sans = Jost({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-choix-sans",
});

export const metadata: Metadata = {
  title: "Choisir ton logo",
  robots: { index: false, follow: false },
};

type Direction = {
  letter: "A" | "B" | "C";
  name: string;
  tagline: string;
  idea: string;
  meanings: { title: string; text: string }[];
  strengths: string[];
  notes: string[];
};

const lumiere: Direction = {
  letter: "A",
  name: "La Lumière",
  tagline: "Un monogramme doré, sobre et élégant",
  idea: "Tes initiales, traversées par un trait de lumière. Cette direction parle d'énergie sans montrer de symbole : elle mise sur la confiance, le sérieux et ton nom.",
  meanings: [
    {
      title: "Tes initiales en majuscules",
      text: "Un V et un K classiques, à fins empattements, comme une signature. On retient ton nom, pas un dessin.",
    },
    {
      title: "Le trait de lumière",
      text: "La diagonale dorée traverse les lettres comme l'énergie traverse le corps pendant un soin. Pour la coupe de feu, elle évoque aussi le geste net qui coupe la brûlure.",
    },
    {
      title: "Le cercle ouvert et les pointillés",
      text: "Un cadre qui protège sans enfermer, et une énergie qui circule par petites touches, jusqu'aux soins à distance.",
    },
  ],
  strengths: [
    "Se distingue des logos habituels du bien-être : on ne le confond avec personne.",
    "Inspire le sérieux, rassure les personnes qui doutent du magnétisme.",
    "Prolonge l'or déjà présent sur ton site.",
    "Deux couleurs seulement : impression simple, dorure à chaud possible.",
    "Déjà décliné : carte de visite et fichiers du site sont prêts.",
  ],
  notes: [
    "Plus élégant que chaleureux : certaines personnes peuvent le trouver un peu « haut de gamme ».",
    "Il ne dit pas tout de suite « soin » : c'est ton nom et ton métier, écrits à côté, qui le complètent.",
  ],
};

const vegetal: Direction = {
  letter: "B",
  name: "Le Soin",
  tagline: "Un emblème végétal, chaleureux et lumineux",
  idea: "Deux mains qui entourent un soleil, au cœur d'une couronne de feuillage. Cette direction montre directement ce que tu fais : prendre soin, avec douceur et naturel.",
  meanings: [
    {
      title: "Les mains",
      text: "Elles accueillent et protègent : c'est le geste du magnétisme, compris par tous au premier regard.",
    },
    {
      title: "Le soleil",
      text: "La chaleur, l'énergie, le retour à la lumière après un moment difficile.",
    },
    {
      title: "Les feuilles et l'écriture manuscrite",
      text: "La nature, la croissance, le mieux-être qui revient. Tes initiales en lettres liées rendent l'ensemble proche et personnel.",
    },
  ],
  strengths: [
    "Compris immédiatement : on sait que l'on parle de soin et de bien-être.",
    "Chaleureux et doux, très accessible au premier contact.",
    "Les mains et le soleil parlent à un large public, y compris les plus jeunes.",
  ],
  notes: [
    "Mains et feuillages sont très fréquents chez les praticiens : il se démarque moins.",
    "Trois couleurs et des dégradés : il faut une version simplifiée pour l'impression, le tampon ou la broderie.",
    "Riche en détails : en tout petit (photo de profil, onglet), les mains et les feuilles se perdent.",
    "Ses couleurs vertes sont nouvelles par rapport à ton site actuel : il faudrait les y intégrer.",
  ],
};

const hybride: Direction = {
  letter: "C",
  name: "La Rencontre",
  tagline: "La fusion des deux : le monogramme doré, réchauffé par le soleil",
  idea: "Le meilleur de A et de B réunis. Tes initiales dorées gardent l'élégance et le sérieux de la Lumière ; le soleil, les courbes qui enveloppent et ton nom écrit à la main apportent la chaleur du Soin.",
  meanings: [
    {
      title: "Tes initiales en majuscules",
      text: "Le V et le K à fins empattements de la direction A : ta signature, sobre et reconnaissable.",
    },
    {
      title: "Le soleil",
      text: "Repris de la direction B : la chaleur, l'énergie, le retour à la lumière. Il se pose au creux du K comme une source d'énergie.",
    },
    {
      title: "Les courbes qui enveloppent",
      text: "Les deux grands traits qui partent des lettres entourent l'ensemble comme des bras ou des mains qui accueillent : le geste du soin, sans le dessiner.",
    },
    {
      title: "Ton nom écrit à la main",
      text: "Une écriture manuscrite et ornée, comme dans la direction B : proche, personnelle, chaleureuse.",
    },
  ],
  strengths: [
    "Réunit le sérieux de A et la douceur de B : rassurant et accueillant à la fois.",
    "Une seule couleur, l'or : impression simple, dorure à chaud possible.",
    "Reste dans l'univers or de ton site, sans introduire de nouvelle couleur.",
    "Plus original que les mains et feuillages habituels du bien-être.",
    "L'emblème seul (VK et soleil) reste lisible en petit, pour les icônes et photos de profil.",
  ],
  notes: [
    "L'écriture manuscrite est très ornée : en petit, on utilise l'emblème seul, sans le nom.",
    "Deux styles d'écriture (lettres classiques et manuscrite) : un équilibre à soigner sur chaque support.",
    "Proposition toute récente : carte de visite et fichiers du site restent à décliner.",
  ],
};

const comparison = [
  {
    criterion: "Première impression",
    a: "Élégant, sérieux, confiant",
    b: "Chaleureux, doux, naturel",
    c: "Élégant et chaleureux à la fois",
  },
  {
    criterion: "Ce qu'on comprend",
    a: "Une personne, un nom, une énergie",
    b: "Le soin, les mains, la nature",
    c: "Ton nom, la lumière et l'accueil",
  },
  {
    criterion: "Se démarquer",
    a: "Très reconnaissable",
    b: "Proche d'autres logos du bien-être",
    c: "Très reconnaissable",
  },
  {
    criterion: "En tout petit",
    a: "Reste net",
    b: "Les détails disparaissent",
    c: "Net avec l'emblème seul",
  },
  {
    criterion: "Impression",
    a: "Simple : or et noir",
    b: "À simplifier : dégradés, trois couleurs",
    c: "Simple : or seul",
  },
  {
    criterion: "Avec ton site",
    a: "Dans la continuité de l'or existant",
    b: "Introduit le vert, à harmoniser",
    c: "Dans la continuité de l'or existant",
  },
];

function DirectionSection({
  d,
  tone,
  children,
}: {
  d: Direction;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${styles.chapter} ${tone}`}>
      <div className={`${styles.inner} grid gap-14 lg:grid-cols-[1fr_1.1fr]`}>
        <div className="lg:sticky lg:top-[12vh] lg:self-start">{children}</div>
        <div>
          <p className={styles.kicker}>Direction {d.letter}</p>
          <h2 className={styles.h2}>{d.name}</h2>
          <p className="mt-2 opacity-70">{d.tagline}</p>
          <p className={styles.lead}>{d.idea}</p>

          <h3 className={`${styles.serif} mt-12 text-2xl`}>Ce qu&apos;il raconte</h3>
          <div className="mt-4">
            {d.meanings.map((m) => (
              <div key={m.title} className={styles.meaning}>
                <p className={styles.meaningTitle}>{m.title}</p>
                <p className="mt-1 opacity-75">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <span className={styles.rule} aria-hidden />
              <h3 className={`${styles.serif} text-2xl`}>Ses forces</h3>
              <ul className={`${styles.points} mt-3 opacity-80`}>
                {d.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className={styles.rule} aria-hidden />
              <h3 className={`${styles.serif} text-2xl`}>À savoir</h3>
              <ul className={`${styles.points} mt-3 opacity-80`}>
                {d.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Onglet de navigateur avec l'icône en taille réelle. */
function BrowserTab({ icon, size }: { icon: string; size: 16 | 32 }) {
  return (
    <div className="w-60 rounded-t-xl bg-[#e9e6e1] px-3 pb-2 pt-2.5 text-[#2b2724]">
      <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-sm">
        <Image src={icon} alt="" width={size} height={size} style={{ width: size, height: size }} />
        <span className="truncate text-xs">Véronique Kaba, magnétiseuse</span>
      </div>
    </div>
  );
}

export default function ChoixLogoPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${styles.page}`}>
      {/* ── Ouverture ── */}
      <header className={styles.hero}>
        <p className="text-sm uppercase tracking-[0.3em] opacity-60">Véronique Kaba</p>
        <h1 className={`${styles.h1} mt-4`}>Trois directions pour ton logo</h1>
        <p className={`${styles.lead} mx-auto`}>
          Deux façons différentes de raconter ton métier, et une troisième qui les réunit.
          Prends le temps de les regarder, de lire ce que chacune exprime, puis dis-moi
          laquelle te ressemble.
        </p>

        <div className={styles.duo}>
          <a href="#direction-a" className={`${styles.duoItem} bg-black text-[#f3ece1]`}>
            <Image
              src="/choix-logo/lumiere-noir.webp"
              alt="Direction A : monogramme VK doré"
              width={720}
              height={720}
              priority
              className="h-auto w-full max-w-[17rem]"
            />
            <span className={`${styles.letter} mt-4`}>Direction A</span>
            <span className={`${styles.serif} text-2xl`}>{lumiere.name}</span>
          </a>
          <a href="#direction-b" className={`${styles.duoItem} bg-white`}>
            <Image
              src="/choix-logo/vegetal.webp"
              alt="Direction B : emblème végétal VK avec mains et soleil"
              width={900}
              height={900}
              priority
              className="h-auto w-full max-w-[17rem]"
            />
            <span className={`${styles.letter} mt-4`}>Direction B</span>
            <span className={`${styles.serif} text-2xl`}>{vegetal.name}</span>
          </a>
          <a href="#direction-c" className={`${styles.duoItem} bg-white`}>
            <Image
              src="/choix-logo/hybride.webp"
              alt="Direction C : monogramme VK doré avec soleil et nom manuscrit, fusion des deux"
              width={1275}
              height={1019}
              priority
              className="my-auto h-auto w-full max-w-[17rem]"
            />
            <span className={`${styles.letter} mt-4`}>Direction C · la fusion</span>
            <span className={`${styles.serif} text-2xl`}>{hybride.name}</span>
          </a>
        </div>
      </header>

      {/* ── Direction A ── */}
      <div id="direction-a">
        <DirectionSection d={lumiere} tone={styles.dark}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Image
              src="/choix-logo/lumiere-noir.webp"
              alt="Version or sur fond noir"
              width={720}
              height={720}
              className="h-auto w-full"
            />
            <Image
              src="/choix-logo/lumiere-clair.webp"
              alt="Version noir et or sur fond clair"
              width={720}
              height={720}
              className="h-auto w-full"
            />
          </div>
        </DirectionSection>
      </div>

      {/* ── Direction B ── */}
      <div id="direction-b">
        <DirectionSection d={vegetal} tone={styles.sage}>
          <div className="bg-white p-6 shadow-[0_18px_40px_-24px_rgba(35,31,27,0.45)]">
            <Image
              src="/choix-logo/vegetal.webp"
              alt="Emblème végétal : mains, soleil et feuillage autour des initiales vk"
              width={900}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </DirectionSection>
      </div>

      {/* ── Direction C : hybride ── */}
      <div id="direction-c">
        <DirectionSection d={hybride} tone={styles.white}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="bg-[#f6f2ec] p-8 shadow-[0_18px_40px_-24px_rgba(35,31,27,0.45)]">
              <Image
                src="/choix-logo/hybride.webp"
                alt="Logo complet : monogramme VK, soleil et nom Véronique Kaba en écriture manuscrite, or sur fond clair"
                width={1275}
                height={1019}
                className="h-auto w-full"
              />
            </div>
            <div className="bg-black p-8">
              <Image
                src="/choix-logo/hybride-embleme.webp"
                alt="Emblème seul : VK et soleil, or sur fond noir"
                width={900}
                height={900}
                className="mx-auto h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </DirectionSection>
      </div>

      {/* ── Face à face ── */}
      <section className={styles.chapter}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Face à face</p>
          <h2 className={styles.h2}>Les trois, côte à côte</h2>
          <p className={styles.lead}>
            Aucune n&apos;est meilleure dans l&apos;absolu : elles ne promettent pas la même chose.
            La C cherche l&apos;équilibre entre les deux autres.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Critère</span>
                </th>
                <th scope="col">A · {lumiere.name}</th>
                <th scope="col">B · {vegetal.name}</th>
                <th scope="col">C · {hybride.name}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.criterion}>
                  <th scope="row" className={styles.serif}>
                    <span className="text-xl">{row.criterion}</span>
                  </th>
                  <td data-label="A">{row.a}</td>
                  <td data-label="B">{row.b}</td>
                  <td data-label="C">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── En situation ── */}
      <section className={`${styles.chapter} ${styles.white}`}>
        <div className={styles.inner}>
          <p className={styles.kicker}>En situation</p>
          <h2 className={styles.h2}>Là où on te découvre</h2>
          <p className={styles.lead}>
            Photo de profil sur Facebook, WhatsApp ou Google, petite icône dans l&apos;onglet du
            navigateur : c&apos;est souvent en tout petit que l&apos;on voit ton logo en
            premier. Voici les trois à leur taille réelle.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { d: lumiere, profile: "/choix-logo/lumiere-noir.webp", w: 720, bg: "bg-black", icon: "/choix-logo/lumiere-noir-32.png" },
              { d: vegetal, profile: "/choix-logo/vegetal.webp", w: 900, bg: "bg-white", icon: "/choix-logo/vegetal-32.png" },
              { d: hybride, profile: "/choix-logo/hybride-embleme.webp", w: 900, bg: "bg-black", icon: "/choix-logo/hybride-32.png" },
            ].map(({ d, profile, w, bg, icon }) => (
              <figure key={d.letter}>
                <figcaption className={`${styles.serif} text-2xl`}>
                  {d.letter} · {d.name}
                </figcaption>
                <div className="mt-6 flex flex-wrap items-end gap-6">
                  {[96, 48].map((px) => (
                    <div
                      key={px}
                      className={`${bg} overflow-hidden rounded-full ring-1 ring-black/10`}
                      style={{ width: px, height: px }}
                    >
                      <Image src={profile} alt="" width={w} height={w} className="h-full w-full object-contain" />
                    </div>
                  ))}
                  <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={32}
                    className="ring-1 ring-black/10"
                    style={{ width: 56, height: 56, borderRadius: 13 }}
                  />
                </div>
                <div className="mt-6">
                  <BrowserTab icon={icon} size={16} />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ton choix ── */}
      <section className={`${styles.chapter} ${styles.sage}`}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Pour t&apos;aider</p>
          <h2 className={styles.h2}>Laquelle te ressemble ?</h2>
          <p className={styles.lead}>
            Imagine une personne qui ne te connaît pas encore et qui tombe sur ta carte.
            Que veux-tu qu&apos;elle ressente en premier ?
          </p>

          <div className={styles.choice}>
            <div className={styles.choiceCard}>
              <p className={styles.letter}>Choisis A si…</p>
              <p className="mt-2">
                tu veux d&apos;abord inspirer confiance et sérieux, être reconnue par ton
                nom, et garder l&apos;univers noir et or de ton site.
              </p>
            </div>
            <div className={styles.choiceCard}>
              <p className={styles.letter}>Choisis B si…</p>
              <p className="mt-2">
                tu veux d&apos;abord montrer la douceur et le soin, que l&apos;on comprenne
                ton métier au premier regard, quitte à faire évoluer les couleurs du site.
              </p>
            </div>
            <div className={styles.choiceCard}>
              <p className={styles.letter}>Choisis C si…</p>
              <p className="mt-2">
                tu hésites entre les deux : tu veux le sérieux et l&apos;or de A, avec la
                chaleur du soleil et de l&apos;écriture manuscrite de B.
              </p>
            </div>
          </div>

          <span className={`${styles.rule} mt-14`} aria-hidden />
          <h3 className={`${styles.serif} text-3xl`}>Et ensuite ?</h3>
          <p className="mt-3 max-w-2xl opacity-80">
            Réponds-moi simplement par <strong className="font-normal">A</strong>,{" "}
            <strong className="font-normal">B</strong> ou <strong className="font-normal">C</strong>. Une fois la direction choisie, on
            affinera ensemble les détails (couleurs, finesse du trait, lettres), puis je
            préparerai les fichiers pour ton site, tes cartes et tes réseaux.
          </p>
        </div>
      </section>

      <footer className="px-5 pb-16 pt-10 text-center">
        <p className={`${styles.serif} text-2xl tracking-[0.18em]`}>VÉRONIQUE KABA</p>
        <p className="mt-2 text-sm uppercase tracking-[0.32em] opacity-60">
          Équilibre · Énergie · Harmonie
        </p>
      </footer>
    </div>
  );
}
