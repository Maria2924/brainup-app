export type ValidationError = {
    message: string;
    errors: Record<string, string[]>;
}
