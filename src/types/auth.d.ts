export type LoggedInResponse = {
    user: User;
    message: string;
    token: string;
}

export type RegisteredUserResponse = {
    success: boolean;
    user: User;
    message: string;
    access_token: string;
    token_type: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
    status: "active" | "inactive";
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type UserWithAuthToken = User & { access_token: string };
