export class Issue {
    private _id: number;
    private _crosswords: Array<string>;

    constructor(id: number) {
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }

    public get crosswords(): Array<string> {
        return this._crosswords;
    }

    public addCrossword(id: string): void {
        this._crosswords.push(id);
    }
}