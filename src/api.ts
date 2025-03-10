import { Champion } from './types';

// Create an interface for the champion data from the API
interface DDragonChampionData {
    id: string;
    name: string;
    key: string;
    title: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
    // other properties
  }
  

// Interface for the overall response structure
interface DDragonResponse {
  data: Record<string, DDragonChampionData>;
  // other top-level properties in the response
  version: string;
  type: string;
}

export class ChampionService {
  private static instance: ChampionService;
  private baseUrl: string = 'https://ddragon.leagueoflegends.com/cdn/15.4.1/data/en_US/champion.json';


  private constructor() {}

  public static getInstance(): ChampionService {
    if (!ChampionService.instance) {
      ChampionService.instance = new ChampionService();
    }
    return ChampionService.instance;
  }

  public async getChampions(): Promise<Champion[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json() as DDragonResponse;
      
      // Transform the data to match our Champion interface
      const champions: Champion[] = Object.values(data.data).map((champ, index: number) => ({
        id: index + 1,
        name: champ.name,
        // Use Community Dragon URL with champion key
        image: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.key}.png`
      }));
      
      return champions;
    } catch (error) {
      console.error('Error fetching champions:', error);
      return [];
    }
  }
}  

export default ChampionService.getInstance();
