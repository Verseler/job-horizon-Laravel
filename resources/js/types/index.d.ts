import { User } from "lucide-react";

export type LucideIconType = typeof User;
export type UserRole = "job_seeker" | "recruiter"

export interface User {
    id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    birth_date?: string;
    phone_number?: string;
    address?: string;
    role?: UserRole;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    },
    flash: {
        success?: string,
        error?: string
    }
};


