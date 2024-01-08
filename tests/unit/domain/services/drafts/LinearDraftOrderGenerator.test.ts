import LinearDraftOrderGenerator from "../../../../../src/domain/services/drafts/LinearDraftOrderGenerator";

describe("LinearDraftOrderGenerator", () => {
    it("generates a linear draft order given the number of teams and team size.", () => {
        const linearDraftOrderGenerator = new LinearDraftOrderGenerator();
        const result = linearDraftOrderGenerator.generate(4, 4);
        expect(result).toEqual([1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4]);
    });
});