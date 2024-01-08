import SnakeDraftOrderGenerator from "../../../../../src/domain/services/drafts/SnakeDraftOrderGenerator";

describe('SnakeDraftOrderGenerator', () => {
    it('generates a snake draft order given the number of teams and team size.', () => {
        const snakeDraftOrderGenerator = new SnakeDraftOrderGenerator();
        const result = snakeDraftOrderGenerator.generate(4, 4);
        expect(result).toEqual([1,2,3,4,4,3,2,1,1,2,3,4,4,3,2,1]);
    });
});