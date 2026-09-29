export interface SaveRevokedTokenRepository {
    /**
     * Revoga o token de forma atômica.
     * Retorna `false` se o token já estava revogado.
     */
    save(
        params: SaveRevokedTokenRepository.Params
    ): Promise<boolean>
}

export namespace SaveRevokedTokenRepository {
    export type Params = {
        jti: string
        userId: number,
        ttl: number
    }
}
