import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";
import styles from "./choix.module.css";

/**
 * Choix entre deux directions de logo, destiné à Véronique.
 * Page autonome : sans l'habillage du site (voir SiteChrome), non indexée.
 * Fond neutre et traitement identique pour les deux propositions.
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
  title: "Choisir votre logo",
  robots: { index: false, follow: false },
};

type Direction = {
  letter: "A" | "B";
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
  idea: "Vos initiales, traversées par un trait de lumière. Cette direction parle d'énergie sans montrer de symbole : elle mise sur la confiance, le sérieux et votre nom.",
  meanings: [
    {
      title: "Vos initiales en majuscules",
      text: "Un V et un K classiques, à fins empattements, comme une signature. On retient votre nom, pas un dessin.",
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
    "Prolonge l'or déjà présent sur votre site.",
    "Deux couleurs seulement : impression simple, dorure à chaud possible.",
    "Déjà décliné : carte de visite et fichiers du site sont prêts.",
  ],
  notes: [
    "Plus élégant que chaleureux : certaines personnes peuvent le trouver un peu « haut de gamme ».",
    "Il ne dit pas tout de suite « soin » : c'est votre nom et votre métier, écrits à côté, qui le complètent.",
  ],
};

const vegetal: Direction = {
  letter: "B",
  name: "Le Soin",
  tagline: "Un emblème végétal, chaleureux et lumineux",
  idea: "Deux mains qui entourent un soleil, au cœur d'une couronne de feuillage. Cette direction montre directement ce que vous faites : prendre soin, avec douceur et naturel.",
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
      text: "La nature, la croissance, le mieux-être qui revient. Vos initiales en lettres liées rendent l'ensemble proche et personnel.",
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
    "Ses couleurs vertes sont nouvelles par rapport à votre site actuel : il faudrait les y intégrer.",
  ],
};

const comparison = [
  {
    criterion: "Première impression",
    a: "Élégant, sérieux, confiant",
    b: "Chaleureux, doux, naturel",
  },
  {
    criterion: "Ce qu'on comprend",
    a: "Une personne, un nom, une énergie",
    b: "Le soin, les mains, la nature",
  },
  {
    criterion: "Se démarquer",
    a: "Très reconnaissable",
    b: "Proche d'autres logos du bien-être",
  },
  {
    criterion: "En tout petit",
    a: "Reste net",
    b: "Les détails disparaissent",
  },
  {
    criterion: "Impression",
    a: "Simple : or et noir",
    b: "À simplifier : dégradés, trois couleurs",
  },
  {
    criterion: "Avec votre site",
    a: "Dans la continuité de l'or existant",
    b: "Introduit le vert, à harmoniser",
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
        <span className="truncate text-xs">Véronique Kaba — Magnétiseuse</span>
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
        <h1 className={`${styles.h1} mt-4`}>Deux directions pour votre logo</h1>
        <p className={`${styles.lead} mx-auto`}>
          Deux façons différentes de raconter votre métier. Prenez le temps de les regarder, de
          lire ce que chacune exprime, puis dites-moi laquelle vous ressemble.
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

      {/* ── Face à face ── */}
      <section className={styles.chapter}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Face à face</p>
          <h2 className={styles.h2}>Les deux, côte à côte</h2>
          <p className={styles.lead}>
            Aucune n&apos;est meilleure dans l&apos;absolu : elles ne promettent pas la même chose.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Critère</span>
                </th>
                <th scope="col">A · {lumiere.name}</th>
                <th scope="col">B · {vegetal.name}</th>
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
          <h2 className={styles.h2}>Là où on vous découvre</h2>
          <p className={styles.lead}>
            Photo de profil sur Facebook, WhatsApp ou Google, petite icône dans l&apos;onglet du
            navigateur : c&apos;est souvent en tout petit que l&apos;on voit votre logo en
            premier. Voici les deux à leur taille réelle.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {[
              { d: lumiere, profile: "/choix-logo/lumiere-noir.webp", w: 720, bg: "bg-black", icon: "/choix-logo/lumiere-noir-32.png" },
              { d: vegetal, profile: "/choix-logo/vegetal.webp", w: 900, bg: "bg-white", icon: "/choix-logo/vegetal-32.png" },
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

      {/* ── Votre choix ── */}
      <section className={`${styles.chapter} ${styles.sage}`}>
        <div className={styles.inner}>
          <p className={styles.kicker}>Pour vous aider</p>
          <h2 className={styles.h2}>Laquelle vous ressemble ?</h2>
          <p className={styles.lead}>
            Imaginez une personne qui ne vous connaît pas encore et qui tombe sur votre carte.
            Que voulez-vous qu&apos;elle ressente en premier ?
          </p>

          <div className={styles.choice}>
            <div className={styles.choiceCard}>
              <p className={styles.letter}>Choisissez A si…</p>
              <p className="mt-2">
                vous voulez d&apos;abord inspirer confiance et sérieux, être reconnue par votre
                nom, et garder l&apos;univers noir et or de votre site.
              </p>
            </div>
            <div className={styles.choiceCard}>
              <p className={styles.letter}>Choisissez B si…</p>
              <p className="mt-2">
                vous voulez d&apos;abord montrer la douceur et le soin, que l&apos;on comprenne
                votre métier au premier regard, quitte à faire évoluer les couleurs du site.
              </p>
            </div>
          </div>

          <span className={`${styles.rule} mt-14`} aria-hidden />
          <h3 className={`${styles.serif} text-3xl`}>Et ensuite ?</h3>
          <p className="mt-3 max-w-2xl opacity-80">
            Répondez-moi simplement par <strong className="font-normal">A</strong> ou{" "}
            <strong className="font-normal">B</strong>. Une fois la direction choisie, nous
            affinerons ensemble les détails (couleurs, finesse du trait, lettres), puis je
            préparerai les fichiers pour votre site, vos cartes et vos réseaux.
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
