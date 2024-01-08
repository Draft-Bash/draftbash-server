import CreateDraftSettingsRequest from "../../../presentation/data-transfer-objects/drafts/CreateDraftSettingsRequest";
import BadRequestError from "../../exceptions/BadRequestError";
import IntegerInterval from "../common/IntegerInterval";

export default class DraftSettings {
    private readonly orderType: string;

    private readonly scoringType: string;

    private readonly pickTimeSeconds: IntegerInterval | null;

    private readonly teamCount: IntegerInterval;

    private readonly pointguardSlots: IntegerInterval;

    private readonly shootingguardSlots: IntegerInterval;

    private readonly guardSlots: IntegerInterval;

    private readonly smallforwardSlots: IntegerInterval;

    private readonly powerforwardSlots: IntegerInterval;

    private readonly forwardSlots: IntegerInterval;

    private readonly centerSlots: IntegerInterval;

    private readonly utilitySlots: IntegerInterval;

    private readonly benchSlots: IntegerInterval;

    constructor(settings: CreateDraftSettingsRequest) {
        const orderTypes = ['snake', 'linear'];
        const scoringTypes = ['points', 'category'];
        if (!orderTypes.includes(settings.orderType)) {
            throw new BadRequestError('Invalid order type.');
        }
        if (!scoringTypes.includes(settings.scoringType)) {
            throw new BadRequestError('Invalid scoring type.');
        }

        if (settings.pickTimeSeconds == null) {
            this.pickTimeSeconds = null;
        } else {
            this.pickTimeSeconds = new IntegerInterval(settings.pickTimeSeconds, 30, 120);
        }
        this.orderType = settings.orderType;
        this.scoringType = settings.scoringType;
        this.teamCount = new IntegerInterval(settings.teamCount, 2, 12);
        this.pointguardSlots = new IntegerInterval(settings.pointguardSlots, 0, 1);
        this.shootingguardSlots = new IntegerInterval(settings.shootingguardSlots, 0, 1);
        this.guardSlots = new IntegerInterval(settings.guardSlots, 0, 1);
        this.smallforwardSlots = new IntegerInterval(settings.smallforwardSlots, 0, 1);
        this.powerforwardSlots = new IntegerInterval(settings.powerforwardSlots, 0, 1);
        this.forwardSlots = new IntegerInterval(settings.forwardSlots, 0, 1);
        this.centerSlots = new IntegerInterval(settings.centerSlots, 0, 1);
        this.utilitySlots = new IntegerInterval(settings.utilitySlots, 0, 4);
        this.benchSlots = new IntegerInterval(settings.benchSlots, 0, 4);
    }

    getOrderType(): string {
        return this.orderType;
    }

    getScoringType(): string {
        return this.scoringType;
    }

    getPickTimeSeconds(): number | null {
        return this.pickTimeSeconds ? this.pickTimeSeconds.getValue() : null;
    }

    getTeamCount(): number {
        return this.teamCount.getValue();
    }

    getPointguardSlots(): number {
        return this.pointguardSlots.getValue();
    }

    getShootingguardSlots(): number {
        return this.shootingguardSlots.getValue();
    }

    getGuardSlots(): number {
        return this.guardSlots.getValue();
    }

    getSmallforwardSlots(): number {
        return this.smallforwardSlots.getValue();
    }

    getPowerforwardSlots(): number {
        return this.powerforwardSlots.getValue();
    }

    getForwardSlots(): number {
        return this.forwardSlots.getValue();
    }

    getCenterSlots(): number {
        return this.centerSlots.getValue();
    }

    getUtilitySlots(): number {
        return this.utilitySlots.getValue();
    }

    getBenchSlots(): number {
        return this.benchSlots.getValue();
    }
}