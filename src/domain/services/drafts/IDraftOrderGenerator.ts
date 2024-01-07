export default interface DraftOrderGenerator {
    generate(numberOfTeams: number, teamSize: number): number[];
}