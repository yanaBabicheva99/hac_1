export interface UserDto {
    role: string;
    email: string;
    id: string;
    isActivated: boolean
}

export interface InfoRefresh<T> {
    accessToken: string;
    refreshToken: string;
    user: T
}
