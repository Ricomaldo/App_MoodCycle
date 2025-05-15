import { Injectable } from '@core/di/Injectable';
import { WisdomItem } from '@core/domain/entities/wisdom/WisdomItem';

export interface SaveWisdomItemInput {
  content: string;
  type: 'CONVERSATION' | 'INSIGHT' | 'RITUAL';
  phase: string;
  date: Date;
}

@Injectable()
export class SaveWisdomItemUseCase {
  // Dans une implémentation réelle, nous injecterions un repository
  // constructor(private wisdomRepository: WisdomRepository) {}

  execute(input: SaveWisdomItemInput): Promise<WisdomItem> {
    // Mock implementation
    console.log('Saving wisdom item:', input);

    // Simuler un délai et retourner un objet WisdomItem
    return new Promise(resolve => {
      setTimeout(() => {
        const wisdomItem: WisdomItem = {
          id: `wisdom_${Date.now()}`,
          content: input.content,
          type: input.type,
          phase: input.phase,
          createdAt: input.date.toISOString(),
          isFavorite: false,
        };

        resolve(wisdomItem);
      }, 300);
    });
  }
}
