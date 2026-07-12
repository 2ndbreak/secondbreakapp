import clapAsset from "@/assets/clap-game.jpg.asset.json";
import chessSuitsAsset from "@/assets/chess-suits.jpg.asset.json";
import chessTaxiAsset from "@/assets/chess-taxi.jpg.asset.json";
import cardAsset from "@/assets/card-game.jpg.asset.json";
import skipAsset from "@/assets/skipping-street.jpg.asset.json";
import diketoYardAsset from "@/assets/diketo-yard.jpg.asset.json";
import jumpRopeAsset from "@/assets/jump-rope-group.jpg.asset.json";
import diketoTopAsset from "@/assets/diketo-top.png.asset.json";
import heroJumpRopeAsset from "@/assets/jump-rope-hero.png.asset.json";

export const photos = {
  clap: { url: clapAsset.url, alt: "Two friends playing a hand-clapping game" },
  chessSuits: { url: chessSuitsAsset.url, alt: "Two men playing a board game" },
  chessTaxi: { url: chessTaxiAsset.url, alt: "A man deep in a board game at the taxi rank" },
  cards: { url: cardAsset.url, alt: "Friends playing cards on the floor" },
  skip: { url: skipAsset.url, alt: "Children playing skipping rope on a neighbourhood street" },
  diketoYard: { url: diketoYardAsset.url, alt: "Children playing Diketo with stones in a township yard" },
  jumpRope: { url: jumpRopeAsset.url, alt: "A group of youth playing long-rope skipping at an outdoor games day" },
  diketoTop: { url: diketoTopAsset.url, alt: "Overhead view of two girls playing Diketo, stones between their feet" },
  heroJumpRope: { url: heroJumpRopeAsset.url, alt: "Children playing skipping rope together on a sunny street" },
};

export type EntryType = "game" | "folktale";

export interface Entry {
  slug: string;
  type: EntryType;
  title_home: string;
  title_en: string;
  home_language: string;
  province: string;
  community_credit: string;
  contributor_name: string;
  story: string;
  how_to_play?: string;
  why_it_matters: string;
  today: string;
  video_url?: string;
  edition: string;
  category?: "strategy" | "outdoor" | "hand" | "cards";
  sample?: boolean;
}

export const entries: Entry[] = [
  {
    slug: "diketo",
    type: "game",
    title_home: "Diketo",
    title_en: "Stone-toss",
    home_language: "Sesotho",
    province: "Free State",
    community_credit: "Basotho",
    contributor_name: "SAMPLE — replace me",
    story:
      "Diketo is played on the ground, usually in a shady spot after chores. A shallow hole is dug, stones are gathered, and a small crowd forms — because Diketo is never quiet. Every toss is watched, every miss is teased, every good hand is celebrated.",
    how_to_play:
      "Dig a shallow hole. Place a pile of small stones inside, keeping one 'ketana' aside as the tossing stone. Toss the ketana in the air; while it is up, scoop stones out of the hole and catch the ketana before it lands. Different rounds require you to scoop 1, then 2, then 3 stones at a time. Drop the ketana or miscount and you pass to the next player.",
    why_it_matters:
      "Diketo trains rhythm, counting, and steady hands, but its real work is social — turn-taking, gentle rivalry, and the muscle of showing up for each other.",
    today:
      "Bring Diketo to a lunch break, a stoep, or a school ground. Ten stones and a patch of earth are enough.",
    edition: "Edition 01",
    category: "outdoor",
    sample: true,
  },
  {
    slug: "hare-and-the-baboons",
    type: "folktale",
    title_home: "Mmutla le Ditšhwene",
    title_en: "The Hare and the Baboons",
    home_language: "Setswana",
    province: "North West",
    community_credit: "Batswana",
    contributor_name: "SAMPLE — replace me",
    story:
      "In a season when the rains were shy and the veld was thin, the baboons on the koppie hoarded every last fruit. The hare, small and tired of being small, climbed up with a plan folded into his cheek. He did not fight the baboons. He asked them a question they could not stop answering — and by the time the moon rose, the hare had eaten, the baboons had argued themselves down the hill, and the veld had a new story to tell.",
    why_it_matters:
      "This tale is a lesson in cleverness over strength, but it is also a lesson in listening — the hare wins because he pays attention.",
    today:
      "Tell it at bedtime, at a braai, at a class. Ask the children what question the hare asked. Their answer is the story continuing.",
    edition: "Edition 01",
    sample: true,
  },
  {
    slug: "morabaraba",
    type: "game",
    title_home: "Morabaraba",
    title_en: "Twelve Men's Morris",
    home_language: "Sesotho",
    province: "Gauteng",
    community_credit: "Basotho, Batswana and Bapedi elders",
    contributor_name: "SAMPLE — replace me",
    story:
      "Long before Morabaraba was recognised by school sport federations, it was played on the ground with bottle tops and stones, on trains, at taxi ranks, on Sunday afternoons that stretched into evening. The board is scratched into dust or carved into wood — the game does not care.",
    how_to_play:
      "Each player has twelve 'cows'. Take turns placing them on the board's intersections, trying to line up three in a row — a 'mill'. Every mill lets you take one of your opponent's cows off the board. Once all cows are placed, slide them along lines to make new mills. The player left with two cows loses.",
    why_it_matters:
      "Morabaraba is quiet strategy. It teaches patience, reading intent, and the long view — how one small move now decides the shape of the whole board later.",
    today:
      "Get a board (or draw one). Play three games in a row. The second is the real one.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    edition: "Edition 01",
    category: "strategy",
    sample: true,
  },
];

export function fallbackPhoto(category?: Entry["category"]) {
  switch (category) {
    case "strategy":
      return photos.chessSuits;
    case "outdoor":
      return photos.skip;
    case "hand":
      return photos.clap;
    case "cards":
      return photos.cards;
    default:
      return photos.chessTaxi;
  }
}
