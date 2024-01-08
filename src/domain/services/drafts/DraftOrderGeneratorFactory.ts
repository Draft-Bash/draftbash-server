import DraftOrderGenerator from './IDraftOrderGenerator';
import LinearDraftOrderGenerator from './LinearDraftOrderGenerator';
import SnakeDraftOrderGenerator from './SnakeDraftOrderGenerator';

export default class DraftOrderGeneratorFactory {
    public getDraftOrderGenerator(draftOrderType: string): DraftOrderGenerator {
        switch (draftOrderType) {
            case 'snake':
                return new SnakeDraftOrderGenerator();
            case 'linear':
                return new LinearDraftOrderGenerator();
            default:
                return new SnakeDraftOrderGenerator();
        }
    }
}
