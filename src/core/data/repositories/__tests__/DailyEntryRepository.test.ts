import { DailyEntryRepository } from '../DailyEntryRepository';
import { getRealmInstance } from '../../models';
import { DailyEntry, Symptom } from '../../../domain/entities/Cycle';

describe('DailyEntryRepository', () => {
  let repository: DailyEntryRepository;
  let realm: any;

  beforeEach(() => {
    realm = getRealmInstance();
    repository = new DailyEntryRepository();
  });

  afterEach(() => {
    realm.deleteAll();
  });

  describe('createEntry', () => {
    it('should create a new entry', async () => {
      const entryData: Omit<DailyEntry, 'id'> = {
        cycleId: 'cycle-1',
        date: new Date(),
        mood: 'happy',
        symptoms: [
          {
            type: 'cramps',
            intensity: 3,
            notes: 'Mild cramps',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        notes: 'Feeling good today',
        flow: 2,
        temperature: 36.5,
        cervicalMucus: 'creamy',
        intercourse: false,
        contraception: true,
      };

      await repository.createEntry(entryData);

      const entries = realm.objects('DailyEntry');
      expect(entries.length).toBe(1);
      expect(entries[0].cycleId).toBe(entryData.cycleId);
      expect(entries[0].mood).toBe(entryData.mood);
      expect(entries[0].id).toBeTruthy();
    });
  });

  describe('getEntryById', () => {
    it('should return entry by id', async () => {
      const entryData: Omit<DailyEntry, 'id'> = {
        cycleId: 'cycle-1',
        date: new Date(),
        mood: 'happy',
        symptoms: [],
        notes: 'Test entry',
        flow: 2,
        temperature: 36.5,
        cervicalMucus: 'creamy',
        intercourse: false,
        contraception: true,
      };

      await repository.createEntry(entryData);
      const savedEntry = realm.objects('DailyEntry')[0];
      const retrievedEntry = await repository.getEntryById(savedEntry.id);

      expect(retrievedEntry).toBeDefined();
      expect(retrievedEntry.id).toBe(savedEntry.id);
      expect(retrievedEntry.cycleId).toBe(entryData.cycleId);
    });

    it('should throw error if entry not found', async () => {
      await expect(repository.getEntryById('non-existent-id')).rejects.toThrow('Entry not found');
    });
  });

  describe('getEntriesByDateRange', () => {
    it('should return entries within date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      const entryData: Omit<DailyEntry, 'id'> = {
        cycleId: 'cycle-1',
        date: new Date('2024-01-15'),
        mood: 'happy',
        symptoms: [],
        notes: 'Test entry',
        flow: 2,
        temperature: 36.5,
        cervicalMucus: 'creamy',
        intercourse: false,
        contraception: true,
      };

      await repository.createEntry(entryData);
      const entries = await repository.getEntriesByDateRange('cycle-1', startDate, endDate);

      expect(entries.length).toBe(1);
      expect(entries[0].date).toEqual(new Date('2024-01-15'));
    });
  });

  describe('updateEntry', () => {
    it('should update entry data', async () => {
      const entryData: Omit<DailyEntry, 'id'> = {
        cycleId: 'cycle-1',
        date: new Date(),
        mood: 'happy',
        symptoms: [],
        notes: 'Test entry',
        flow: 2,
        temperature: 36.5,
        cervicalMucus: 'creamy',
        intercourse: false,
        contraception: true,
      };

      await repository.createEntry(entryData);
      const savedEntry = realm.objects('DailyEntry')[0];

      const updatedData = {
        ...savedEntry,
        mood: 'sad',
        notes: 'Updated entry',
      };

      await repository.updateEntry(updatedData);

      const updatedEntry = await repository.getEntryById(savedEntry.id);
      expect(updatedEntry.mood).toBe('sad');
      expect(updatedEntry.notes).toBe('Updated entry');
    });
  });

  describe('deleteEntry', () => {
    it('should delete entry', async () => {
      const entryData: Omit<DailyEntry, 'id'> = {
        cycleId: 'cycle-1',
        date: new Date(),
        mood: 'happy',
        symptoms: [],
        notes: 'Test entry',
        flow: 2,
        temperature: 36.5,
        cervicalMucus: 'creamy',
        intercourse: false,
        contraception: true,
      };

      await repository.createEntry(entryData);
      const savedEntry = realm.objects('DailyEntry')[0];
      await repository.deleteEntry(savedEntry.id);

      await expect(repository.getEntryById(savedEntry.id)).rejects.toThrow('Entry not found');
    });
  });
});
