import { InMemory } from "../persistence/strategies/InMemory";

export const persistenceStrategy = new InMemory;
export const testingPersistenceStrategy = new InMemory;
