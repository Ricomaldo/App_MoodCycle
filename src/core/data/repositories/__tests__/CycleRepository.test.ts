import { CycleRepository } from '../CycleRepository';
import { Cycle, CyclePhase } from '../../../domain/entities/Cycle';
import {
  mockRealmInstance,
  mockRealmCollection,
  setupRealmMocks,
  createMockEntity,
  createMockCollection,
} from './realmTestConfig';

describe('CycleRepository', () => {
  let repository: CycleRepository;
  let mockCycle: Cycle;

  beforeEach(() => {
    setupRealmMocks();
    repository = new CycleRepository();
    mockCycle = createMockEntity<Cycle>({
      userId: 'user-1',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-28'),
      phase: [
        {
          type: 'menstruation',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-01-05'),
          symptoms: ['cramps', 'fatigue'],
          mood: 2,
        },
      ],
      symptoms: ['cramps', 'fatigue'],
      mood: 2,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentCycle', () => {
    it('should return current cycle', async () => {
      const mockCollection = createMockCollection([mockCycle]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      const result = await repository.getCurrentCycle();
      expect(result).toEqual(mockCycle);
    });

    it('should throw error if no current cycle', async () => {
      const mockCollection = createMockCollection([]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      await expect(repository.getCurrentCycle()).rejects.toThrow('Aucun cycle actif');
    });
  });

  describe('getCycleById', () => {
    it('should return cycle by id', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockCycle);
      const result = await repository.getCycleById('test-id');
      expect(result).toEqual(mockCycle);
    });

    it('should throw error if cycle not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.getCycleById('test-id')).rejects.toThrow('Cycle not found');
    });
  });

  describe('createCycle', () => {
    it('should create a new cycle', async () => {
      const cycleData: Omit<Cycle, 'id'> = {
        userId: 'user-1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-28'),
        phase: [
          {
            type: 'menstruation',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-05'),
            symptoms: ['cramps', 'fatigue'],
            mood: 2,
          },
        ],
        symptoms: ['cramps', 'fatigue'],
        mood: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRealmInstance.create.mockReturnValue({
        ...cycleData,
        id: expect.any(String),
      });

      const result = await repository.createCycle(cycleData);

      expect(result).toMatchObject({
        ...cycleData,
        id: expect.any(String),
      });
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.create).toHaveBeenCalledWith('Cycle', expect.any(Object));
    });
  });

  describe('updateCycle', () => {
    it('should update cycle', async () => {
      const updatedCycle = { ...mockCycle, mood: 3 };
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockCycle);

      await repository.updateCycle(updatedCycle);

      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.objectForPrimaryKey).toHaveBeenCalledWith('Cycle', mockCycle.id);
    });

    it('should throw error if cycle not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.updateCycle(mockCycle)).rejects.toThrow('Cycle not found');
    });
  });

  describe('deleteCycle', () => {
    it('should delete cycle', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockCycle);
      await repository.deleteCycle('test-id');
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.delete).toHaveBeenCalledWith(mockCycle);
    });

    it('should throw error if cycle not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.deleteCycle('test-id')).rejects.toThrow('Cycle not found');
    });
  });

  describe('addPhase', () => {
    it('should add phase to cycle', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockCycle);
      const phase: Omit<CyclePhase, 'id'> = {
        type: 'ovulation',
        startDate: new Date('2024-01-14'),
        endDate: new Date('2024-01-16'),
        symptoms: ['energy'],
        mood: 4,
      };

      await repository.addPhase('test-id', phase);

      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockCycle.phase.push).toHaveBeenCalled();
    });

    it('should throw error if cycle not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      const phase: Omit<CyclePhase, 'id'> = {
        type: 'ovulation',
        startDate: new Date('2024-01-14'),
        endDate: new Date('2024-01-16'),
        symptoms: ['energy'],
        mood: 4,
      };

      await expect(repository.addPhase('test-id', phase)).rejects.toThrow('Cycle not found');
    });
  });
});
