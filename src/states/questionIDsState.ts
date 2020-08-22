export const questionIDsState = (state: number[] = [], action: any) => {
    switch (action.type) {
        case "questionIDsSet":
            return action.id;
        case "questionIDsReset":
            return [];
        default:
            return state;
    }
};
