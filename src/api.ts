import { Champion } from './types';
interface DDragonChampionData {
    id: string;
    name: string;
    key: string;
    title: string;
  }
  
interface DDragonResponse {
  data: Record<string, DDragonChampionData>;
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
      const champions: Champion[] = Object.values(data.data).map((champ, index: number) => ({
        id: index + 1,
        name: champ.name,
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
