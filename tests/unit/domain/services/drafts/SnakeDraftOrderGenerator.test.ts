class SnakeDraftOrderGenerator {
    generate(numberOfTeams: number, teamSize: number): number[] {
        const draftOrder: number[] = [];

        let teamNumber = 1; // Initial team number. Pick 1 goes to team 1
        let direction = 1; // Initial direction for the team numbers

        // Creates the draft order in snake style. 
        // Starts at team 1, goes up to team n, then decrease back to team 1, up to team n, until each team has drafted teamSize players.
        for (let i = 0; i < numberOfTeams * teamSize; i++) {
            draftOrder.push(teamNumber);
            if (teamNumber === numberOfTeams) {
                direction = -1;
            } else if (teamNumber === 1) {
                direction = 1;
            }
            teamNumber += direction;
        }
        return draftOrder;
    }
}

describe('SnakeDraftOrderGenerator', () => {
    it('generates a snake draft order given the number of teams and team size.', () => {
        const snakeDraftOrderGenerator = new SnakeDraftOrderGenerator();
        const result = snakeDraftOrderGenerator.generate(4, 4);
        expect(result).toEqual([1, 2, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 2, 1]);
    });
});