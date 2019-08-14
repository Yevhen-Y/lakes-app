export interface ILakeModel {
    id?: string,
    name: string,
    type: string,
    salmon: number,
    tuna: number,
    salmonArray?: Array<{ type: string }>,
    tunaArray?: Array<{ type: string }>,
}